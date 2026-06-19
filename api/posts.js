/**
 * GET    /api/posts              —— 获取文章列表（按日期倒序）
 * GET    /api/posts?slug=xxx     —— 获取单篇文章（按 slug）
 * GET    /api/posts?tag=xxx      —— 按标签过滤
 *
 * POST   /api/posts              —— 新增文章（需要登录）
 *   body: { title, slug, excerpt, content, date, tags:[], cover, readTime }
 *
 * PUT    /api/posts              —— 编辑文章（需要登录）
 *   body: { _id, title, slug, excerpt, content, date, tags:[], cover, readTime }
 *
 * DELETE /api/posts              —— 删除文章（需要登录）
 *   body: { _id }
 *
 * 所有写操作都需要 Authorization: Bearer <token> 请求头。
 */

const { getCollection } = require("../lib/mongodb");
const { requireAuth } = require("./login");

async function handler(req, res) {
  // ========== 写操作：先验证登录 ==========
  if (req.method === "POST" || req.method === "PUT" || req.method === "DELETE") {
    const auth = await requireAuth(req);
    if (!auth.ok) {
      res.status(auth.statusCode || 401).json({ error: auth.error });
      return;
    }
  }

  // 解析 body（Vercel 自动解析 JSON，但保险起见兼容 string 形式）
  let body = req.body || {};
  if (typeof body === "string" && body) {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }

  try {
    // ========== 写操作：POST 新增 ==========
    if (req.method === "POST") {
      const title = (body.title || "").trim();
      const content = (body.content || "").trim();
      if (!title) return res.status(400).json({ error: "标题不能为空" });
      if (!content) return res.status(400).json({ error: "内容不能为空" });

      // slug 自动生成或从请求中取
      let slug = (body.slug || "").trim();
      if (!slug) {
        // 用标题的前 10 个字符 + 日期做一个 slug
        const now = new Date();
        const safeTitle = title.slice(0, 20).replace(/[\s\/\\?%#:]+/g, "-");
        slug = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}-${safeTitle}`;
      }

      const posts = await getCollection("posts");

      // 检查 slug 是否重复
      const existing = await posts.findOne({ slug });
      if (existing) {
        return res.status(400).json({ error: "slug 已存在，请换一个标题或 slug" });
      }

      const date = body.date
        ? new Date(body.date).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10);

      const tagsRaw = body.tags || [];
      const tags = Array.isArray(tagsRaw) ? tagsRaw.map(String) : String(tagsRaw).split(",").map((s) => s.trim()).filter(Boolean);

      const newPost = {
        title,
        slug,
        excerpt: (body.excerpt || "").trim() || content.slice(0, 80) + "…",
        content,
        date,
        tags,
        cover: (body.cover || "📝").trim(),
        readTime: (body.readTime || "").trim() || `${Math.max(1, Math.ceil(content.length / 300))} 分钟`,
        createdAt: new Date(),
      };

      const result = await posts.insertOne(newPost);
      res.status(201).json({
        message: "新增成功",
        insertedId: result.insertedId,
        post: { _id: result.insertedId, ...newPost },
      });
      return;
    }

    // ========== 写操作：PUT 编辑 ==========
    if (req.method === "PUT") {
      const _id = body._id;
      if (!_id) return res.status(400).json({ error: "缺少文章 ID（_id）" });

      const posts = await getCollection("posts");

      const existing = await posts.findOne({ _id: new (require("mongodb").ObjectId)(_id) }).catch(() => null);
      if (!existing) {
        return res.status(404).json({ error: "找不到这篇文章" });
      }

      const updateFields = {};
      if (body.title !== undefined && body.title.trim() !== "") updateFields.title = body.title.trim();
      if (body.excerpt !== undefined) updateFields.excerpt = body.excerpt;
      if (body.content !== undefined && body.content.trim() !== "") updateFields.content = body.content;
      if (body.date !== undefined) {
        updateFields.date = new Date(body.date).toISOString().slice(0, 10);
      }
      if (body.tags !== undefined) {
        const tagsRaw = body.tags || [];
        updateFields.tags = Array.isArray(tagsRaw) ? tagsRaw.map(String) : String(tagsRaw).split(",").map((s) => s.trim()).filter(Boolean);
      }
      if (body.cover !== undefined) updateFields.cover = body.cover;
      if (body.readTime !== undefined) updateFields.readTime = body.readTime;
      if (body.slug !== undefined && body.slug.trim() !== "") updateFields.slug = body.slug.trim();

      updateFields.updatedAt = new Date();

      const { ObjectId } = require("mongodb");
      const result = await posts.updateOne({ _id: new ObjectId(_id) }, { $set: updateFields });

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "找不到这篇文章" });
      }

      res.status(200).json({ message: "更新成功", updatedCount: result.modifiedCount });
      return;
    }

    // ========== 写操作：DELETE 删除 ==========
    if (req.method === "DELETE") {
      const _id = body._id;
      if (!_id) return res.status(400).json({ error: "缺少文章 ID（_id）" });

      const { ObjectId } = require("mongodb");
      const posts = await getCollection("posts");
      const result = await posts.deleteOne({ _id: new ObjectId(_id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "找不到这篇文章" });
      }

      res.status(200).json({ message: "删除成功" });
      return;
    }

    // ========== 读操作：GET 文章列表 ==========
    const posts = await getCollection("posts");
    const { slug, tag, limit } = req.query || {};

    if (slug) {
      const post = await posts.findOne({ slug });
      if (!post) return res.status(404).json({ error: "文章不存在" });

      return res.status(200).json({
        _id: post._id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        date: post.date,
        tags: post.tags,
        cover: post.cover,
        readTime: post.readTime,
      });
    }

    const query = tag ? { tags: { $in: [tag] } } : {};
    const cursor = posts.find(query).sort({ date: -1, createdAt: -1 });

    const limitNum = parseInt(limit) || 0;
    if (limitNum > 0) cursor.limit(limitNum);

    const results = await cursor.toArray();
    const clean = results.map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      date: p.date,
      tags: p.tags,
      cover: p.cover,
      readTime: p.readTime,
    }));

    res.status(200).json({ total: clean.length, posts: clean });
  } catch (err) {
    console.error("posts API 错误：", err);
    res.status(500).json({ error: "查询失败", message: err.message });
  }
}

module.exports = handler;
