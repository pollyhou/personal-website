/**
 * GET  /api/posts
 * 获取博客文章列表（用于 Blog 页面）
 *
 * 查询参数：
 *   ?slug=xxx   获取单篇文章详情
 *   ?tag=ai     按标签筛选
 *   ?limit=10   限制数量
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
    const posts = await getCollection("posts");
    const { slug, tag, limit } = req.query;
    const limitNum = parseInt(limit) || 0;

    if (slug) {
      // 单篇文章详情
      const post = await posts.findOne({ slug });
      if (!post) return res.status(404).json({ error: "文章不存在" });

      return res.status(200).json({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        date: post.date,
        tags: post.tags,
        cover: post.cover,
      });
    }

    // 文章列表
    const query = tag ? { tags: { $in: [tag] } } : {};
    const cursor = posts
      .find(query)
      .sort({ date: -1, _id: -1 });

    if (limitNum > 0) cursor.limit(limitNum);

    const results = await cursor.toArray();

    const clean = results.map((p) => ({
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
    console.error("API /api/posts 错误：", err);
    res.status(500).json({ error: "数据库查询失败", message: err.message });
  }
}

module.exports = allowCors(handler);
