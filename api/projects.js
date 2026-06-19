/**
 * GET  /api/projects
 * 获取作品集项目列表
 */

const { getCollection } = require("../lib/mongodb");

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  return await fn(req, res);
};

async function handler(req, res) {
  try {
    const projects = await getCollection("projects");
    const { type } = req.query;

    const query = type ? { type } : {};
    const results = await projects.find(query).sort({ order: 1, _id: -1 }).toArray();

    const clean = results.map((p) => ({
      title: p.title,
      tag: p.tag,
      description: p.description,
      url: p.url,
      emoji: p.emoji,
      type: p.type,
    }));

    res.status(200).json({ total: clean.length, projects: clean });
  } catch (err) {
    console.error("API /api/projects 错误：", err);
    res.status(500).json({ error: "数据库查询失败", message: err.message });
  }
}

module.exports = allowCors(handler);
