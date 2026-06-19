/**
 * GET    /api/photos                     —— 获取所有照片（扁平列表）
 * GET    /api/photos?group_by=date       —— 获取按日期分组的照片（用于画册）
 *
 * POST   /api/photos                     —— 新增一条（需要登录）
 *   body: { title, src, date, location, caption, tags:[] }
 *
 * PUT    /api/photos                     —— 编辑一条（需要登录）
 *   body: { _id, title, src, date, location, caption, tags:[] }
 *
 * DELETE /api/photos                     —— 删除一条（需要登录）
 *   body: { _id }
 *
 * 说明：
 *   - src = 文件名（放在项目根的 photos/ 目录中），例如 "2018-03-18_001.jpg"
 *   - 本 API 只管理元数据；真实图片文件请通过 Git / FTP / 其他方式上传
 */

const { ObjectId } = require("mongodb");
const { getCollection } = require("../lib/mongodb");
const { requireAuth } = require("./login");

function parseBody(raw) {
  if (raw == null) return {};
  if (typeof raw === "object") return raw;
  try { return JSON.parse(raw); } catch (e) { return {}; }
}

/** 统一对外输出：从数据库文档 -> 前端可读字段 */
function toPhotoView(p) {
  return {
    _id: p._id ? p._id.toString() : p._id,
    title: p.title || "",
    src: p.src || p.path || "",
    date: p.date || "",
    location: p.location || "",
    caption: p.caption || p.description || "",
    tags: p.tags || [],
    group: p.group || "",
    createdAt: p.createdAt || null,
  };
}

/** 规范化请求体字段（POST/PUT） */
function normalizeFields(b) {
  const tags = Array.isArray(b.tags)
    ? b.tags.filter((t) => typeof t === "string" && t.trim() !== "")
    : typeof b.tags === "string" && b.tags.trim()
    ? b.tags.split(/[,，]/).map((s) => s.trim()).filter(Boolean)
    : [];

  return {
    title: typeof b.title === "string" && b.title.trim() ? b.title.trim() : "未命名照片",
    src: typeof b.src === "string" ? b.src.trim() : "",
    date: typeof b.date === "string" ? b.date.trim() : "",
    location: typeof b.location === "string" ? b.location.trim() : "",
    caption: typeof b.caption === "string" ? b.caption.trim() : "",
    tags,
    group: typeof b.group === "string" ? b.group.trim() : "",
  };
}

/** 把扁平照片数组按日期分组（用于画册页面） */
function groupByDate(photos) {
  const buckets = {};
  for (const p of photos) {
    const key = p.date || "unknown";
    if (!buckets[key]) buckets[key] = [];
    buckets[key].push(p);
  }

  const sortedKeys = Object.keys(buckets).sort((a, b) => {
    if (a === "unknown") return 1;
    if (b === "unknown") return -1;
    const ta = new Date(a).getTime();
    const tb = new Date(b).getTime();
    if (!isNaN(ta) && !isNaN(tb)) return tb - ta; // 新 → 旧
    return a.localeCompare(b);
  });

  return sortedKeys.map((key) => {
    const list = buckets[key];
    return {
      date: key,
      title: (list[0].title && list[0].title !== key) ? list[0].title : key,
      count: list.length,
      photos: list,
    };
  });
}

async function handler(req, res) {
  try {
    // ========== GET: 读取（公开） ==========
    if (req.method === "GET") {
      const photos = await getCollection("photos");
      const docs = await photos
        .find({})
        .sort({ date: -1, createdAt: -1, title: 1 })
        .limit(1000)
        .toArray();

      const list = docs.map(toPhotoView);

      // 按日期分组（画册页）
      if (req.query && req.query.group_by === "date") {
        return res.status(200).json({
          count: list.length,
          groups: groupByDate(list),
        });
      }

      // 默认：扁平列表
      return res.status(200).json({
        count: list.length,
        photos: list,
      });
    }

    // ========== POST / PUT / DELETE: 需要登录 ==========
    const body = parseBody(req.body);
    const auth = await requireAuth(req);
    if (!auth.ok) {
      return res.status(auth.statusCode || 401).json({ error: auth.error });
    }

    const photos = await getCollection("photos");

    // ---------- POST: 新增 ----------
    if (req.method === "POST") {
      const doc = {
        ...normalizeFields(body),
        createdAt: new Date(),
      };
      if (!doc.src) {
        return res.status(400).json({ error: "至少提供 src（文件名，例如 2025-01-01_001.jpg）" });
      }

      const result = await photos.insertOne(doc);
      return res.status(201).json({
        message: "添加成功",
        insertedId: result.insertedId ? result.insertedId.toString() : null,
        photo: toPhotoView({ ...doc, _id: result.insertedId }),
      });
    }

    // ---------- PUT: 更新 ----------
    if (req.method === "PUT") {
      const { _id } = body;
      if (!_id) return res.status(400).json({ error: "缺少 _id" });

      let oid;
      try { oid = new ObjectId(String(_id)); }
      catch (e) { return res.status(400).json({ error: "_id 格式错误" }); }

      const patch = {};
      const n = normalizeFields(body);
      const updatable = ["title", "src", "date", "location", "caption", "tags", "group"];
      for (const k of updatable) {
        if (k in body) patch[k] = n[k];
      }
      if (Object.keys(patch).length === 0) {
        return res.status(400).json({ error: "没有要更新的字段" });
      }
      patch.updatedAt = new Date();

      const result = await photos.updateOne({ _id: oid }, { $set: patch });
      return res.status(200).json({
        message: "更新成功",
        matched: result.matchedCount,
        modified: result.modifiedCount,
      });
    }

    // ---------- DELETE: 删除 ----------
    if (req.method === "DELETE") {
      const { _id } = body;
      if (!_id) return res.status(400).json({ error: "缺少 _id" });

      let oid;
      try { oid = new ObjectId(String(_id)); }
      catch (e) { return res.status(400).json({ error: "_id 格式错误" }); }

      const result = await photos.deleteOne({ _id: oid });
      return res.status(200).json({
        message: "删除成功（不会删除照片文件，文件请在仓库/服务器手动管理）",
        deleted: result.deletedCount,
      });
    }

    res.setHeader("Allow", "GET, POST, PUT, DELETE");
    res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("[api/photos] 错误：", error);
    res.status(500).json({ error: error.message || "未知错误" });
  }
}

module.exports = handler;
