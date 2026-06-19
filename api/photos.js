/**
 * GET  /api/photos
 * 获取所有照片 · 返回画册使用的照片列表
 *
 * 查询参数：
 *   ?group_by=date   按日期分组（默认不分
 *   ?limit=20         限制返回数量
 *   ?offset=0         分页偏移
 */

const { getCollection } = require("../lib/mongodb");

// 允许跨域（开发用，生产部署在同一个域下不需要
const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  return await fn(req, res);
};

async function handler(req, res) {
  try {
    const photos = await getCollection("photos");

    const { group_by, limit, offset } = req.query;
    const limitNum = parseInt(limit) || 0;
    const offsetNum = parseInt(offset) || 0;

    const cursor = photos
      .find({})
      .sort({ date: -1, _id: -1 });

    if (offsetNum > 0) cursor.skip(offsetNum);
    if (limitNum > 0) cursor.limit(limitNum);

    const results = await cursor.toArray();

    // 去掉 _id 等 MongoDB 内部字段，返回干净的数据
    const clean = results.map((p) => ({
      src: p.src,
      title: p.title,
      location: p.location,
      date: p.date,
      caption: p.caption,
    }));

    if (group_by === "date") {
      const groups = {};
      clean.forEach((p) => {
        const key = p.date || "unknown";
        if (!groups[key]) groups[key] = [];
        groups[key].push(p);
      });
      return res.status(200).json({
        total: clean.length,
        groups: Object.keys(groups)
          .sort((a, b) => {
            if (a === "unknown") return 1;
            if (b === "unknown") return -1;
            return new Date(b).getTime() - new Date(a).getTime();
          })
          .map((key) => ({
            date: key,
            title: groups[key][0].title || key,
            count: groups[key].length,
            photos: groups[key],
          })),
      });
    }

    res.status(200).json({ total: clean.length, photos: clean });
  } catch (err) {
    console.error("API /api/photos 错误：", err);
    res.status(500).json({ error: "数据库查询失败", message: err.message });
  }
}

module.exports = allowCors(handler);
