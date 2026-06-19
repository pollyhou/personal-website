
/**
 * POST /api/login
 * 简易登录验证 —— 返回一个 token，后续受保护 API 携带它即可。
 *
 * 请求体：
 *   { "password": "你设置的管理员密码" }
 *
 * 环境变量：
 *   ADMIN_PASSWORD  —— 管理员密码（必须在 Vercel 项目设置里配置）
 *   ADMIN_TOKEN     —— 可选：如果你想手动指定 token 内容
 *
 * 响应：
 *   { "token": "xxx" }
 *
 * 安全说明：
 *   这里没有用高复杂度的 session/签名库，只做了一个简易的 sha256 哈希 token。
 *   你个人网站的访问量下，这个级别足够；如果担心安全，可以：
 *   1. 把数据库用户的写权限收窄（MongoDB Atlas 里配置角色）
 *   2. 把 ADMIN_PASSWORD 设置得复杂一点
 */

const crypto = require("crypto");

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

/**
 * 校验请求头里的 Authorization 是否有效
 *   用法：const { ok, error, statusCode } = await requireAuth(req);
 */
async function requireAuth(req) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return { ok: false, statusCode: 500, error: "ADMIN_PASSWORD 环境变量未设置" };
  }

  const expectedToken = process.env.ADMIN_TOKEN || sha256(adminPassword);

  const header = (req.headers.authorization || req.headers.Authorization || "").toString();
  const candidate = header.startsWith("Bearer ") ? header.slice(7).trim() : "";

  if (!candidate) {
    return { ok: false, statusCode: 401, error: "缺少登录凭证（Authorization: Bearer xxx）" };
  }

  if (candidate !== expectedToken) {
    return { ok: false, statusCode: 403, error: "密码不正确" };
  }

  return { ok: true };
}

async function handler(req, res) {
  // 只接受 POST
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed", hint: "使用 POST 调用" });
    return;
  }

  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      res.status(500).json({ error: "ADMIN_PASSWORD 环境变量未设置" });
      return;
    }

    // 解析请求体（Vercel 的 serverless function 会自动解析 JSON）
    let body = req.body;
    if (!body || typeof body === "string") {
      try { body = body ? JSON.parse(body) : {}; }
      catch (e) { body = {}; }
    }

    const password = (body.password || "").toString();

    if (!password) {
      res.status(400).json({ error: "请填写密码" });
      return;
    }

    // 用时间恒定的比较（避免时序攻击，虽然这里风险极低）
    const a = Buffer.from(password);
    const b = Buffer.from(adminPassword);
    let diff = a.length ^ b.length;
    const minLen = Math.min(a.length, b.length);
    for (let i = 0; i < minLen; i++) diff |= a[i] ^ b[i];

    if (diff !== 0) {
      res.status(403).json({ error: "密码不正确" });
      return;
    }

    // 返回 token（= sha256(adminPassword)，或环境变量里指定的 ADMIN_TOKEN）
    const token = process.env.ADMIN_TOKEN || sha256(adminPassword);
    res.status(200).json({ token });
  } catch (err) {
    console.error("login 错误：", err);
    res.status(500).json({ error: "服务器内部错误", message: err.message });
  }
}

module.exports = handler;
module.exports.requireAuth = requireAuth;
