/**
 * lib/mongodb.js
 * MongoDB 数据库连接池 · 用于 Vercel Serverless Functions
 *
 * 在 serverless 环境中，每次请求会创建新的连接。
 * 用全局缓存可以复用上一个连接，避免「连接数爆炸」。
 */

const { MongoClient } = require("mongodb");

if (!process.env.MONGODB_URI) {
  throw new Error(
    "❌ 缺少 MONGODB_URI 环境变量！请在 Vercel 项目设置 → Environment Variables 中添加。"
  );
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  minPoolSize: 1,
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  // 已经有缓存的连接，直接返回
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // 创建新连接
  const client = await MongoClient.connect(uri, options);

  // 数据库名从 URI 中提取（默认 hou-xiaowen）
  const dbName = uri.split("/")[3].split("?")[0] || "hou-xiaowen";
  const db = client.db(dbName);

  // 缓存连接（全局作用域，适用于 serverless 冷启动后的复用）
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

/** 快捷方式 · 获取指定集合 */
async function getCollection(name) {
  const { db } = await connectToDatabase();
  return db.collection(name);
}

module.exports = { connectToDatabase, getCollection };
