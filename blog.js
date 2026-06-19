/* ============================================================
 *  侯小雯 · Blog
 *  从 GitHub 仓库动态拉取 Obsidian 中的 Markdown 文章
 *  Obsidian → GitHub → 个人网站
 * ============================================================ */

// ===== ⚙️ 配置区：改成你自己的即可 =====
const GITHUB_CONFIG = {
  owner: "pollyhou",               // 你的 GitHub 用户名
  repo: "notes",                   // 存放 Obsidian 笔记的仓库名
  branch: "main",                  // 分支名（一般是 main 或 master）
  contentPath: "blog",             // 仓库中存放博客文章的文件夹名
  // contentPath: ""  // 如果文章直接放在根目录，就设为空字符串
};

// 文章文件名格式示例：2025-06-15-我的第一篇文章.md
// 日期会从文件名中自动解析，也支持 YYYY-MM-DD 开头的文件名

// ===== 🚀 启动 =====
document.addEventListener("DOMContentLoaded", () => {
  // 读取 URL 参数，决定是显示「文章列表」还是「单篇文章」
  const urlParams = new URLSearchParams(window.location.search);
  const articleFile = urlParams.get("article");

  if (articleFile) {
    loadAndRenderArticle(articleFile);
  } else {
    loadAndRenderArticleList();
  }
});

/* ============================================================
 *  1. 获取文章列表
 * ============================================================ */
async function loadAndRenderArticleList() {
  const listEl = document.getElementById("article-list");
  const loadingEl = document.getElementById("loading-state");
  const emptyEl = document.getElementById("empty-state");
  const errorEl = document.getElementById("error-state");

  // 检查是否还是默认配置
  if (GITHUB_CONFIG.owner.startsWith("YOUR-")) {
    hideAllStates();
    if (emptyEl) emptyEl.style.display = "block";
    return;
  }

  if (loadingEl) loadingEl.style.display = "block";

  try {
    const files = await fetchMarkdownFilesFromGitHub();
    hideAllStates();

    if (!files || files.length === 0) {
      if (emptyEl) emptyEl.style.display = "block";
      return;
    }

    // 按日期排序（最新在前）
    files.sort((a, b) => {
      const dateA = parseDateFromFilename(a.name) || a.name;
      const dateB = parseDateFromFilename(b.name) || b.name;
      return new Date(dateB) - new Date(dateA);
    });

    // 渲染文章卡片
    listEl.innerHTML = "";
    for (const file of files) {
      const card = await createArticleCard(file);
      if (card) listEl.appendChild(card);
    }
  } catch (err) {
    console.error("❌ 拉取文章失败：", err);
    hideAllStates();
    if (errorEl) {
      errorEl.style.display = "block";
      const detail = errorEl.querySelector(".error-detail");
      if (detail) detail.textContent = err.message || String(err);
    }
  }

  function hideAllStates() {
    [loadingEl, emptyEl, errorEl].forEach((el) => {
      if (el) el.style.display = "none";
    });
  }
}

/* ============================================================
 *  2. 获取并渲染单篇文章
 * ============================================================ */
async function loadAndRenderArticle(filename) {
  const container = document.getElementById("article-view");
  const listView = document.getElementById("list-view");
  const loadingEl = document.getElementById("article-loading");
  const contentEl = document.getElementById("article-content");
  const titleEl = document.getElementById("article-title");
  const dateEl = document.getElementById("article-date");
  const backLink = document.getElementById("back-to-list");

  // 隐藏列表，显示文章视图
  if (listView) listView.style.display = "none";
  if (container) container.style.display = "block";
  if (loadingEl) loadingEl.style.display = "block";

  // 返回链接
  if (backLink) {
    backLink.href = window.location.pathname;
  }

  try {
    const rawContent = await fetchMarkdownContent(filename);
    const { title, date, body } = parseFrontmatter(rawContent, filename);

    if (titleEl) titleEl.textContent = title;
    if (dateEl) dateEl.textContent = formatDate(date);

    if (contentEl) {
      contentEl.innerHTML = renderMarkdown(body);
      // 代码高亮（如果配置了 hljs）
      if (window.hljs) {
        contentEl.querySelectorAll("pre code").forEach((block) => {
          window.hljs.highlightElement(block);
        });
      }
    }

    // 显示文章末尾的公众号卡片
    const endCard = document.getElementById("article-end-card");
    if (endCard) endCard.style.display = "block";

    // 更新页面标题
    document.title = `${title} · 侯小雯`;

    if (loadingEl) loadingEl.style.display = "none";
  } catch (err) {
    console.error("❌ 加载文章失败：", err);
    if (loadingEl) loadingEl.innerHTML = `<p style="color:#c0392b">加载失败：${err.message}</p>`;
  }
}

/* ============================================================
 *  3. GitHub API 调用
 * ============================================================ */
async function fetchMarkdownFilesFromGitHub() {
  const { owner, repo, branch, contentPath } = GITHUB_CONFIG;
  const path = contentPath ? encodeURIComponent(contentPath) : "";

  // 使用 GitHub Contents API 获取目录下的文件列表
  // 注意：这只适用于 public 仓库（无需 token）
  const apiUrl = path
    ? `https://api.github.com/repos/${owner}/${repo}/contents/${contentPath}?ref=${branch}`
    : `https://api.github.com/repos/${owner}/${repo}/contents/?ref=${branch}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("GitHub API 请求次数达到上限（60 次/小时），请稍后再试。");
    }
    if (response.status === 404) {
      throw new Error(
        `找不到仓库或目录：${owner}/${repo}/${contentPath || "(根目录)"}。请检查 GITHUB_CONFIG 配置。`
      );
    }
    throw new Error(`GitHub API 错误：HTTP ${response.status}`);
  }

  const data = await response.json();

  // 筛选出 .md 文件
  return data.filter((item) => {
    return item.type === "file" && item.name.toLowerCase().endsWith(".md");
  });
}

async function fetchMarkdownContent(filename) {
  const { owner, repo, branch, contentPath } = GITHUB_CONFIG;

  // 使用 raw.githubusercontent.com 获取原始 Markdown 内容
  // 这样不会消耗 API 请求次数，而且速度更快
  const rawPath = contentPath ? `${contentPath}/${filename}` : filename;
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${rawPath}`;

  const response = await fetch(rawUrl);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`找不到文件：${filename}`);
    }
    throw new Error(`获取文章内容失败：HTTP ${response.status}`);
  }

  return await response.text();
}

/* ============================================================
 *  4. 渲染 Markdown
 *  使用 marked.js（通过 CDN 加载）
 * ============================================================ */
function renderMarkdown(markdownText) {
  if (!window.marked) {
    // fallback：简单的文本渲染
    return `<pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(
      markdownText
    )}</pre>`;
  }

  // 配置 marked
  window.marked.setOptions({
    breaks: true,       // 让单个 \n 也会变成换行（GFM 风格）
    gfm: true,          // 启用 GitHub 风格 Markdown
    headerIds: true,    // 标题自动加 ID
    mangle: false,      // 不混淆 email
  });

  return window.marked.parse(markdownText);
}

/* ============================================================
 *  5. 工具函数
 * ============================================================ */

// 从文件名解析日期
function parseDateFromFilename(filename) {
  // 支持：2025-06-15-文章名.md 或 2025_06_15-文章名.md 或 20250615-文章名.md
  const match = filename.match(/(\d{4})[-_]?(\d{2})[-_]?(\d{2})/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return null;
}

// 从文件名解析标题
function parseTitleFromFilename(filename) {
  // 去掉 .md 后缀
  let title = filename.replace(/\.md$/i, "");
  // 去掉开头的日期部分 2025-06-15- → 只剩 "我的第一篇文章"
  title = title.replace(/^\d{4}[-_]?\d{2}[-_]?\d{2}[-_\s]*/, "");
  // 去掉下划线/多重空格
  title = title.replace(/[_]+/g, " ").replace(/\s+/g, " ").trim();
  // 如果结果为空，用原始文件名
  return title || filename;
}

// 解析 Markdown 文件的 frontmatter（YAML 头部）
// 支持：
// ---
// title: 我的文章
// date: 2025-06-15
// ---
function parseFrontmatter(content, filename) {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);

  let title = parseTitleFromFilename(filename);
  let date = parseDateFromFilename(filename);
  let body = content;

  if (frontmatterMatch) {
    const frontmatterText = frontmatterMatch[1];
    body = content.slice(frontmatterMatch[0].length);

    // 简单解析 YAML（只处理 key: value 的单行格式）
    const lines = frontmatterText.split("\n");
    for (const line of lines) {
      const colonIdx = line.indexOf(":");
      if (colonIdx > 0) {
        const key = line.slice(0, colonIdx).trim().toLowerCase();
        const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
        if (key === "title" && value) title = value;
        if ((key === "date" || key === "created") && value) date = value;
      }
    }
  } else {
    // 如果没有 frontmatter，尝试从正文的第一个 H1 标题提取 title
    const h1Match = body.match(/^#\s+(.+)$/m);
    if (h1Match) {
      title = h1Match[1].trim();
    }
  }

  return { title, date, body };
}

// 格式化日期显示
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y} · ${m} · ${day}`;
}

// 创建文章卡片 DOM
async function createArticleCard(file) {
  try {
    // 先尝试只拉取前 300 字作为摘要（使用 raw CDN + 切片）
    const rawContent = await fetchMarkdownContent(file.name);
    const { title, date, body } = parseFrontmatter(rawContent, file.name);

    const excerpt = getExcerpt(body, 120);

    const card = document.createElement("article");
    card.className = "blog-item";

    const dateHtml = date
      ? `<div class="blog-date">${formatDate(date)}</div>`
      : `<div class="blog-date">${file.name}</div>`;

    card.innerHTML = `
      ${dateHtml}
      <h3><a href="?article=${encodeURIComponent(file.name)}" style="color: var(--ink)">${escapeHtml(
      title
    )}</a></h3>
      <p>${escapeHtml(excerpt)}${body.length > excerpt.length ? "…" : ""}</p>
    `;

    return card;
  } catch (err) {
    console.warn(`跳过文章 ${file.name}:`, err);
    return null;
  }
}

// 生成文章摘要
function getExcerpt(markdownBody, maxChars) {
  // 去掉 frontmatter 已在 parseFrontmatter 中处理
  // 去掉代码块
  let text = markdownBody.replace(/```[\s\S]*?```/g, " ");
  // 去掉 Markdown 标记符号
  text = text
    .replace(/^#{1,6}\s+/gm, "")            // 标题 #
    .replace(/\*\*(.+?)\*\*/g, "$1")         // 粗体
    .replace(/\*(.+?)\*/g, "$1")             // 斜体
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")      // 链接 → 只保留文字
    .replace(/!\[.+?\]\(.+?\)/g, "")         // 图片 → 移除
    .replace(/`([^`]+)`/g, "$1")             // 行内代码
    .replace(/^>\s+/gm, "")                   // 引用
    .replace(/^[-*+]\s+/gm, "")               // 列表
    .replace(/^\d+\.\s+/gm, "")               // 有序列表
    .replace(/---+/g, "")                     // 分隔线
    .replace(/<[^>]+>/g, "");                 // HTML tag

  text = text.replace(/\s+/g, " ").trim();
  return text.slice(0, maxChars);
}

// HTML 转义（防止 XSS）
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
