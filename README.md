# 侯小雯的个人网站 · Wonderland 🌳

一个童话故事风格的个人作品集网站，使用 **纯静态 HTML + CSS + JS**，部署在 **Vercel**，数据存储在 **MongoDB Atlas**，代码托管在 **GitHub**。

---

## 🎯 技术架构一览

```
┌──────────────┐
│   前端页面   │   index.html / gallery.html / blog.html / portfolio.html / me.html
│   (HTML/CSS) │   styles.css
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────┐
│        Vercel (静态托管 + Serverless API)
│                                         │
│   api/photos.js    → 从 MongoDB 读照片  │
│   api/projects.js  → 从 MongoDB 读作品  │
│   api/posts.js     → 从 MongoDB 读博客  │
│   api/seed.js      → 初始化示例数据     │
└──────┬──────────────────────────────────┘
       │     (通过 mongodb npm 包连接)
       ▼
┌─────────────────────┐
│   MongoDB Atlas     │   云数据库（免费版够用
│   3 个 collection:  │
│   • photos          │   照片元数据
│   • projects        │   作品集项目
│   • posts           │   博客文章
└─────────────────────┘

┌─────────────────────┐
│   GitHub (代码托管) │   private-website 仓库
│   /photos/*.jpg     │   照片文件（已压缩）
└─────────────────────┘
```

---

## 🚀 一步一步部署指南

### 第 0 步 · 准备账号（免费）
在做任何事情之前，先注册这三个账号（都免费）：

| 服务 | 地址 | 用途 |
|------|------|------|
| GitHub | https://github.com | 代码托管 |
| Vercel | https://vercel.com | 网站托管（可以用 GitHub 账号直接登录） |
| MongoDB Atlas | https://www.mongodb.com/atlas | 数据库 |

---

### 第 1 步 · 压缩照片（本地操作）
你电脑上的照片有 **160 张，1.04 GB**，直接上传 GitHub 会超出仓库大小软限制。

在本项目根目录执行：

```bash
# 进入项目目录
cd E:\agents\personal-website

# 运行压缩脚本（需要安装 Pillow，一般电脑已经装了
python scripts\compress_photos.py
```

压缩完成后，**`photos/` 文件夹里就是压缩好的照片（约 30-60 MB）

> 💡 压缩参数可以在 `scripts/compress_photos.py` 顶部修改（默认 1920px 宽、85% 质量

---

### 第 2 步 · 上传代码到 GitHub

**方法 A · 用 Git 命令行（推荐）**

```bash
cd E:\agents\personal-website

# 初始化 Git 仓库（如果还没有
git init
git add .
git commit -m "init: 侯小雯个人网站"

# 在 GitHub 创建一个空仓库，然后推送
# （把下面的 YOUR_NAME 改成你自己的 GitHub 用户名
git remote add origin https://github.com/YOUR_NAME/personal-website.git
git branch -M main
git push -u origin main
```

**方法 B · 用 GitHub Desktop**（图形界面，也很简单）

下载 https://desktop.github.com → 选择 "Add Local Repository" → 选 `E:\agents\personal-website` → 发布即可。

---

### 第 3 步 · 创建 MongoDB Atlas 数据库

1. 访问 https://cloud.mongodb.com 注册/登录
2. 点击 **Build a Database** → 选 **M0 FREE**（免费，512MB 够用）
3. 集群名称随便取，比如 `Cluster0`
4. 创建完成后，点击 **Connect** → 选 **Connect your application**
5. 复制这个 **Connection String**，格式类似：
   ```
   mongodb+srv://pollyhou:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. 把 `<password>` 替换成你设置的数据库密码 → **完整保存这段字符串**，后面要用

> ⚠️ 第一次创建 MongoDB 时，还需要：
> - 在 **Network Access** 里添加 `0.0.0.0/0`（允许任何地方连接）
> - 在 **Database Access** 里创建数据库用户（用户名 + 密码

---

### 第 4 步 · 在 Vercel 部署

1. 访问 https://vercel.com → 用 GitHub 账号登录
2. 点击 **Add New Project** → 选择你刚上传的 `personal-website` 仓库
3. 部署设置里：
   - **Framework Preset**：选择 **Other**（因为是纯静态 + API，不需要框架
   - **Root Directory**：留空（就是项目根目录
4. 点击 **Environment Variables** → 加一条：
   ```
   Name:   MONGODB_URI
   Value:  mongodb+srv://pollyhou:<password>@cluster0.xxxxx.mongodb.net/hou-xiaowen?retryWrites=true&w=majority
   ```
   （注意把 `<password>` 和 `cluster0.xxxxx` 替换成你自己的）
5. 点击 **Deploy**，等 1-2 分钟就好了！

✅ 部署完成后，会获得一个网址，类似 `https://your-site.vercel.app`

---

### 第 5 步 · 初始化数据库

网站上线后，**需要写入一些示例数据**（照片元数据、作品集等）。

在浏览器打开：

```
https://你的域名.vercel.app/api/seed
```

（把 `你的域名` 替换成上一步 Vercel 分配给你的真实域名

看到以下 JSON，就说明数据库初始化成功：

```json
{
  "message": "✅ 数据库初始化完成！",
  "result": {
    "photos": "新增 160 张照片元数据",
    "projects": "新增 8 个作品集项目",
    "posts": "新增 2 篇博客"
  }
}
```

🎉 **现在访问 `https://你的域名.vercel.app/gallery.html` 就能看到画册了！**

---

## 📖 常见问题 FAQ

**Q1: 部署后页面空白怎么办？**
> 检查 Vercel 后台的 **Logs**（日志），如果看到 `MONGODB_URI` 相关的错误，就是环境变量没配对。
> 去 Vercel → Settings → Environment Variables 重新配置一次，然后点击 **Redeploy** 重新部署。

**Q2: 上传了新照片，网站怎么更新？**
> 1. 把新照片放进 `E:\agents\personal-website\photos\`
> 2. 在 `gallery.js` 的 `PHOTOS` 数组里加上这条照片的信息（或直接到 MongoDB Atlas 控制台添加）
> 3. `git add . && git commit -m "add photos" && git push` —— Vercel 会自动重新部署

**Q3: 本地开发预览网站？**
```bash
# 需要先安装 Node.js 和 Vercel CLI
npm i -g vercel
cd E:\agents\personal-website
vercel dev
# 浏览器打开 http://localhost:3000
```

**Q4: 想给相册取更有故事感的名字？**
> MongoDB Atlas → 选择你的数据库 → `photos` collection → 直接编辑文档的 `title` 和 `caption` 字段。例如把 `2018-07-19` 改成 `盛夏的某个午后 · 2018`。

**Q5: 想加自己的域名（比如 houxiaowen.com）？**
> Vercel → Settings → Domains → 输入域名 → 按提示在域名服务商（阿里云/腾讯云/Cloudflare）添加 DNS 记录。Vercel 会免费帮你配 HTTPS。

---

## 📁 项目文件结构

```
personal-website/
│
├── index.html           首页
├── me.html              关于我
├── gallery.html         画册
├── portfolio.html       作品集
├── blog.html            博客
├── styles.css           全站样式
│
├── gallery.js           画册逻辑（PHOTOS 数组 + 灯箱）
├── blog.js              博客渲染
│
├── api/                 🔌 Vercel Serverless API
│   ├── photos.js        GET /api/photos
│   ├── projects.js      GET /api/projects
│   ├── posts.js         GET /api/posts
│   └── seed.js          GET /api/seed（初始化数据库）
│
├── lib/
│   └── mongodb.js       MongoDB 连接工具
│
├── photos/              📷 压缩后的照片（提交到 Git）
│
├── scripts/
│   ├── compress_photos.py   照片压缩脚本
│   └── extract_gps.py      读取 EXIF 信息
│
├── package.json         依赖声明
├── vercel.json          Vercel 配置
├── .gitignore           Git 忽略规则
├── .env.example         环境变量示例
│
└── README.md            就是你现在在读的这份文档 📖
```

---

## 🎨 后续扩展建议（有兴趣时再做）

- ✅ **公众号文章同步**：写一个 Python 脚本，定期把公众号文章同步到 MongoDB 的 `posts` 集合（需要先拿到文章的 HTML/Markdown
- ✅ **访客计数**：加一个 `/api/counter` 接口，记录每个页面的访问量
- ✅ **中英双语自动切换**：根据用户浏览器语言自动显示中文或英文页面
- ✅ **照片标签筛选**：给照片加上标签（「城市」「风景」「人物」），可以点击标签筛选

---

## 📜 License

个人使用，保留所有权利。© Hou Xiaowen
