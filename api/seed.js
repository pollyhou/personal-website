/**
 * GET / POST  /api/seed
 * 初始化数据库 · 把示例数据写入 MongoDB（首次部署时调用一次即可）
 *
 * 安全说明：生产环境下建议调用一次后删除本文件，或添加密码保护。
 * 快速使用：部署后在浏览器访问  https://your-domain.vercel.app/api/seed
 */

const { getCollection, connectToDatabase } = require("../lib/mongodb");

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  return await fn(req, res);
};

async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    // 检查是否已经有数据
    const existingPhotos = await db.collection("photos").countDocuments();
    const existingProjects = await db.collection("projects").countDocuments();
    const existingPosts = await db.collection("posts").countDocuments();

    // -------- 照片数据（示例，按日期分组 · 160 张）--------
    const photoGroups = [
      { date: "2018-03-18", title: "初春 · 2018 年 3 月", count: 4 },
      { date: "2018-07-19", title: "盛夏 · 2018 年 7 月 19 日", count: 8 },
      { date: "2018-07-20", title: "盛夏 · 2018 年 7 月 20 日", count: 5 },
      { date: "2018-07-21", title: "盛夏 · 2018 年 7 月 21 日", count: 5 },
      { date: "2018-07-22", title: "盛夏 · 2018 年 7 月 22 日", count: 3 },
      { date: "2018-07-24", title: "盛夏 · 2018 年 7 月 24 日", count: 2 },
      { date: "2018-07-28", title: "盛夏 · 2018 年 7 月 28 日", count: 5 },
      { date: "2018-07-29", title: "盛夏 · 2018 年 7 月 29 日", count: 6 },
      { date: "2018-08-01", title: "夏日午后 · 2018 年 8 月 1 日", count: 24 },
      { date: "2018-08-07", title: "夏日午后 · 2018 年 8 月 7 日", count: 9 },
      { date: "2018-08-08", title: "夏日午后 · 2018 年 8 月 8 日", count: 6 },
      { date: "2018-08-09", title: "夏日午后 · 2018 年 8 月 9 日", count: 6 },
      { date: "2018-08-10", title: "夏日午后 · 2018 年 8 月 10 日", count: 26 },
      { date: "2018-08-11", title: "夏日午后 · 2018 年 8 月 11 日", count: 4 },
      { date: "2018-08-12", title: "夏日午后 · 2018 年 8 月 12 日", count: 11 },
      { date: "2018-08-21", title: "夏末 · 2018 年 8 月 21 日", count: 9 },
      { date: "2018-08-22", title: "夏末 · 2018 年 8 月 22 日", count: 5 },
      { date: "2019-11-15", title: "深秋 · 2019 年 11 月 15 日", count: 2 },
      { date: "2019-11-16", title: "深秋 · 2019 年 11 月 16 日", count: 3 },
      { date: "", title: "未标注时间", count: 17 },
    ];

    // 生成照片数据（文件名格式和本地一致：2018-03-18_001.jpg）
    const photos = [];
    let globalIdx = 0;
    for (const group of photoGroups) {
      const prefix = group.date || "unknown";
      for (let i = 1; i <= group.count; i++) {
        globalIdx++;
        photos.push({
          src: `${prefix}_${String(globalIdx).padStart(3, "0")}.jpg`,
          title: group.title,
          location: "时间线",
          date: group.date || null,
          caption: `${group.title} · 第 ${i}/${group.count} 张`,
        });
      }
    }

    // -------- 作品集 --------
    const projects = [
      {
        emoji: "🌱",
        title: "人生陪伴教练",
        tag: "AI Companion · 情感支持",
        description:
          "通过深度对话帮助用户探索自我、理清人生方向、提供情感支持和成长建议的 AI 陪伴者。",
        url: "https://chatglm.cn/share/0F1pvZvU",
        type: "main",
        order: 1,
      },
      {
        emoji: "📊",
        title: "商业模式教练",
        tag: "Business Strategy · AI 顾问",
        description:
          "帮助创业者和企业管理者梳理商业模式、分析市场机会、优化商业策略的专业 AI 顾问。",
        url: "https://chatglm.cn/share/HF1hWEr1",
        type: "main",
        order: 2,
      },
      // 灵感实验室
      {
        emoji: "📄",
        title: "AI 简历网站",
        tag: "Career · AI Agent",
        description:
          "帮助应届生和职业转型者梳理过往经历，AI 挖掘可迁移能力与潜力匹配合适的岗位方向，一站式生成优化后的简历。",
        type: "idea",
        order: 3,
      },
      {
        emoji: "💰",
        title: "AI 记账 App",
        tag: "Finance · Habit Tracking",
        description:
          "语音记账，AI 自动将消费归类为「必要开支」或「情绪消费」，支持月度复盘、家庭共账与基金操作记录。",
        type: "idea",
        order: 4,
      },
      {
        emoji: "🌿",
        title: "情绪疗愈小程序",
        tag: "Mental Health",
        description:
          "通过 AI 陪伴记录情绪波动，识别情绪触发因素并提供科学的自我调节方式。",
        type: "idea",
        order: 5,
      },
      {
        emoji: "📓",
        title: "斯坦福人生设计日志",
        tag: "Life Design · Wellness",
        description:
          "将斯坦福大学人生设计课中的美好时光日志做成 App，追踪每日能量状态与活动，生成月度能量图谱。",
        type: "idea",
        order: 6,
      },
      {
        emoji: "📷",
        title: "照片整理 App",
        tag: "AI Vision · Media",
        description:
          "AI 图像识别按地点、旅行、截图等维度自动整理相册，一键生成回忆视频。",
        type: "idea",
        order: 7,
      },
      {
        emoji: "🎓",
        title: "学雅思的 AI 网站",
        tag: "EdTech · Language Learning",
        description:
          "AI 辅助雅思备考，根据用户水平定制学习计划，智能批改写作、口语对练、词汇记忆追踪。",
        type: "idea",
        order: 8,
      },
    ];

    // -------- 博客文章（示例 · 你可以在 MongoDB 里继续加）--------
    const posts = [
      {
        title: "欢迎来到我的数字花园 🌳",
        slug: "welcome",
        excerpt: "这里记录我探索世界、与 AI 共同成长的点滴。",
        content:
          "你好！这里是我的个人博客。我会在这里分享学习笔记、灵感随笔，以及和 AI 一起探索世界的过程。希望你也能在这里找到属于自己的小森林。",
        date: "2025-06-20",
        tags: ["随笔", "about"],
        readTime: "2 min",
        cover: "🌲",
      },
      {
        title: "在不确定的时代，让自己变得更灵活",
        slug: "stay-flexible",
        excerpt: "关于终身学习、自我迭代和 AI 进化的一些思考。",
        content:
          "产品和商业模式更新迭代速度飞起，无不让我这个世界探索爱好者感到兴奋。在这个不断变化的时代，保持灵活和开放的心态，或许比掌握任何一项具体技能都更重要。",
        date: "2025-06-10",
        tags: ["随笔", "思考", "AI"],
        readTime: "3 min",
        cover: "🌿",
      },
    ];

    // -------- 写入数据库（去重操作）--------
    let photoInserted = 0;
    let projectInserted = 0;
    let postInserted = 0;

    if (existingPhotos === 0) {
      await db.collection("photos").insertMany(photos);
      photoInserted = photos.length;
    }

    if (existingProjects === 0) {
      await db.collection("projects").insertMany(projects);
      projectInserted = projects.length;
    }

    if (existingPosts === 0) {
      await db.collection("posts").insertMany(posts);
      postInserted = posts.length;
    }

    // 创建索引（加快查询）
    try {
      await db.collection("photos").createIndex({ date: -1 });
      await db.collection("projects").createIndex({ order: 1 });
      await db.collection("posts").createIndex({ date: -1, slug: 1 });
    } catch (e) {
      console.log("索引已存在或创建失败：", e.message);
    }

    res.status(200).json({
      message: "✅ 数据库初始化完成！",
      result: {
        photos: photoInserted
          ? `新增 ${photoInserted} 张照片元数据`
          : `已存在 ${existingPhotos} 条，未覆盖`,
        projects: projectInserted
          ? `新增 ${projectInserted} 个作品集项目`
          : `已存在 ${existingProjects} 条，未覆盖`,
        posts: postInserted
          ? `新增 ${postInserted} 篇博客`
          : `已存在 ${existingPosts} 条，未覆盖`,
      },
      next: [
        "👉 在 Vercel 项目 → Settings → Environment Variables 中配置 MONGODB_URI",
        "👉 用 Python 脚本压缩照片后，把 photos/ 文件夹上传到仓库",
        "👉 在浏览器访问 /gallery.html 查看画册效果",
      ],
    });
  } catch (err) {
    console.error("API /api/seed 错误：", err);
    res.status(500).json({
      error: "数据库初始化失败",
      message: err.message,
      hint: "检查 MONGODB_URI 环境变量是否正确配置。",
    });
  }
}

module.exports = allowCors(handler);
