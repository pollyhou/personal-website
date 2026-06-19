/* ================================================================
 * 🌸 home-particles.js — Canvas 花瓣 + 光点粒子动画
 *
 * 特性:
 *  - DPR (设备像素比) 自适应, 画面永远清晰
 *  - 自动根据屏幕尺寸调整粒子数量
 *  - 页面隐藏时自动暂停 (requestAnimationFrame pause)
 *  - 两种粒子: 白色樱花花瓣 / 金色光点
 *  - 全部运动使用正弦偏移, 动作温柔自然
 * ================================================================ */

(function () {
  "use strict";

  const canvas = document.getElementById("petals-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let W = 0;
  let H = 0;
  let DPR = Math.min(window.devicePixelRatio || 1, 2); // 限制最大 DPR 以降低负载

  // ---- 根据屏幕尺寸调整粒子数量 ----
  function particleCount() {
    const area = window.innerWidth * window.innerHeight;
    // 密度: 每 12000 px² 产生 1 片花瓣, 每 20000 px² 产生 1 个光点
    const petals = Math.min(200, Math.max(100, Math.round(area / 11000)));
    const specks = Math.min(120, Math.max(60, Math.round(area / 18000)));
    return { petals, specks };
  }

  // ---- 随机工具 ----
  function rand(min, max) { return min + Math.random() * (max - min); }
  function randInt(min, max) { return Math.floor(rand(min, max + 1)); }

  // ================================================================
  //   花瓣粒子 - 白色樱花
  // ================================================================
  class Petal {
    constructor() { this.reset(true); }

    reset(initial) {
      this.x = rand(-20, W + 20);
      this.y = initial ? rand(-H * 0.1, H + 20) : rand(-60, -10);
      this.size = rand(4, 12);
      // 主下落速度 (px/frame)
      this.vy = rand(0.3, 0.9);
      // 水平漂移基线
      this.vxBase = rand(-0.2, 0.2);
      // 正弦摇摆幅度 & 频率 & 相位
      this.swayAmp = rand(30, 90);
      this.swayFreq = rand(0.008, 0.018);
      this.swayPhase = rand(0, Math.PI * 2);
      // 旋转
      this.rot = rand(0, Math.PI * 2);
      this.rotSpeed = rand(-0.008, 0.008);
      // 花瓣形状系数
      this.shapeStretch = rand(1.6, 2.8); // 椭圆拉伸度
      // 颜色 —— 米白/淡黄/淡粉, 带变化
      const tone = Math.random();
      if (tone < 0.55) {
        // 米白
        this.r = 255; this.g = 252; this.b = 245;
      } else if (tone < 0.85) {
        // 浅粉
        this.r = 255; this.g = 220 + randInt(-10, 10); // pinker
      } else {
        // 淡金黄
        this.r = 255; this.g = 245; this.b = 220;
      }
      // 透明度淡入淡出参数
      this.lifePhase = Math.random() * Math.PI * 2; // 独立的透明度波动频率
      this.lifeFreq = rand(0.0015, 0.004);
      this.opacity = 0;
      this.targetOpacity = rand(0.4, 0.85);
      // 淡入淡出控制
      this.fadeSpeed = 0.012;
      // 淡入/淡出状态: 1=fading in, 2=visible, 3=fading out
      this.state = 2;
    }

    update(t) {
      // 位置
      this.y += this.vy;
      this.x += this.vxBase + Math.sin(t * this.swayFreq + this.swayPhase) * this.swayAmp * 0.015;
      this.rot += this.rotSpeed;

      // 超出底部 → 重置
      if (this.y > H + 30 || this.x < -50 || this.x > W + 50) {
        this.reset(false);
      }
    }

    draw(ctx, t) {
      // 计算透明度呼吸
      const alpha = 0.45 + 0.35 * Math.sin(t * this.lifeFreq + this.lifePhase);

      // 画一片椭圆的花瓣 (带柔和模糊)
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = alpha * 0.7;

      // 柔和模糊花瓣
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 1.2);
      grad.addColorStop(0, `rgba(255, 255, 255, 0.9)`);
      grad.addColorStop(0.5, `rgba(255, 248, 230, 0.55)`);
      grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * this.shapeStretch, this.size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // ================================================================
  //   光点粒子 - 金色柔光散景
  // ================================================================
  class Speck {
    constructor() { this.reset(true); }

    reset(initial) {
      this.x = rand(0, W);
      this.y = initial ? rand(0, H) : rand(-40, -10);
      this.size = rand(2, 8);
      this.baseSize = this.size;
      this.vy = rand(-0.15, 0.25); // 轻微漂浮, 可上可下
      this.vx = rand(-0.15, 0.15);
      this.baseOpacity = rand(0.3, 0.7);
      this.opacity = this.baseOpacity;
      // 呼吸缩放参数
      this.breathPhase = Math.random() * Math.PI * 2;
      this.breathFreq = rand(0.001, 0.003);
      // 颜色: 暖金 / 暖色白
      this.color = Math.random() < 0.7
        ? { r: 255, g: 236, b: 170 } // 金色
        : { r: 255, g: 250, b: 230 }; // 暖白
      // 偶尔带极淡粉
      if (Math.random() < 0.25) this.color.g = 235;
    }

    update() {
      this.y += this.vy;
      this.x += this.vx;

      // 环绕屏幕
      if (this.y > H + 30) this.reset(false);
      else if (this.y < -30) this.y = H + 20;
      if (this.x > W + 30) this.x = -20;
      else if (this.x < -30) this.x = W + 20;
    }

    draw(ctx, t) {
      // 呼吸缩放
      const sizeScale = 0.7 + 0.5 * Math.sin(t * this.breathFreq + this.breathPhase);
      const finalSize = this.baseSize * sizeScale;
      const alpha = this.baseOpacity * (0.6 + 0.6 * Math.sin(t * this.breathFreq * 1.5 + this.breathPhase));

      // 径向渐变 —— 柔光圆斑
      ctx.save();
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, finalSize * 2.5);
      grad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`);
      grad.addColorStop(0.4, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.4})`);
      grad.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, finalSize * 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // ================================================================
  //   粒子数组管理
  // ================================================================
  let petals = [];
  let specks = [];

  function createParticles() {
    const { petals: pCount, specks: sCount } = particleCount();
    petals = [];
    specks = [];
    for (let i = 0; i < pCount; i++) petals.push(new Petal());
    for (let i = 0; i < sCount; i++) specks.push(new Speck());
  }

  // ================================================================
  //   画布尺寸调整
  // ================================================================
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    createParticles();
  }

  // ================================================================
  //   主循环
  // ================================================================
  let running = true;
  let lastTime = performance.now();

  function animate(now) {
    if (!running) return;

    // 使用稳定的时间步 (t)
    const t = now;

    // 清空但不完全透明 (保留微模糊, 感觉更柔和)
    ctx.clearRect(0, 0, W, H);

    // 1. 先画光点 (作为背景层的柔光)
    for (let i = 0; i < specks.length; i++) {
      specks[i].update();
      specks[i].draw(ctx, t);
    }

    // 2. 再画花瓣 (前景层)
    for (let i = 0; i < petals.length; i++) {
      petals[i].update(t);
      petals[i].draw(ctx, t);
    }

    requestAnimationFrame(animate);
  }

  // ================================================================
  //   页面可见性 —— 隐藏时暂停动画以节省电量
  // ================================================================
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      running = false;
    } else {
      if (!running) {
        running = true;
        requestAnimationFrame(animate);
      }
    }
  });

  // ================================================================
  //   启动
  // ================================================================
  resize();
  window.addEventListener("resize", () => {
    // 防抖
    let timer;
    clearTimeout(window.__petalResizeTimer);
    window.__petalResizeTimer = setTimeout(resize, 200);
  });

  requestAnimationFrame(animate);
})();
