/* ================================================================
 * 🐻 home-bear.js —— 首页大绿熊的交互逻辑
 *
 * 交互:
 *  1. 👀 瞳孔跟随鼠标移动 (鼠标在哪, 熊就看向哪
 *  2. 👆 点击熊 -> 熊跳一下 + 爆出爱心粒子
 *  3. 🌸 周围随机冒出的叶子/花瓣装饰
 *  4. 💬 点击时眨眼
 * ================================================================ */

(function () {
  "use strict";

  const bearWrap = document.getElementById("bear-wrap");
  const bear = document.getElementById("bear");
  const pupilLeft = document.getElementById("pupil-left");
  const pupilRight = document.getElementById("pupil-right");
  const hint = document.getElementById("bear-hint");

  if (!bear || !bearWrap) return;

  // ============================================================
  //  1. 👀 瞳孔跟随鼠标
  // ============================================================
  const maxMove = 10; // 瞳孔最大移动距离

  function movePupils(e) {
    if (!pupilLeft || !pupilRight) return;

    // 获取眼睛中心点的位置
    const rectLeft = pupilLeft.parentElement.getBoundingClientRect();
    const rectRight = pupilRight.parentElement.getBoundingClientRect();

    const eyeCenterX = rectLeft.left + rectLeft.width / 2;
    const eyeCenterY = rectLeft.top + rectLeft.height / 2;

    const eyeCenterXR = rectRight.left + rectRight.width / 2;
    const eyeCenterYR = rectRight.top + rectRight.height / 2;

    // 计算鼠标相对于左眼的偏移
    let dxLeft = e.clientX - eyeCenterX;
    let dyLeft = e.clientY - eyeCenterY;

    let dxRight = e.clientX - eyeCenterXR;
    let dyRight = e.clientY - eyeCenterYR;

    // 计算方向与距离, 限制最大移动
    const distL = Math.min(Math.sqrt(dxLeft * dxLeft + dyLeft * dyLeft), 200);
    const distR = Math.min(Math.sqrt(dxRight * dxRight + dyRight * dyRight), 200;

    // 归一化方向, 乘以 maxMove
    if (distL > 0) {
      const nx = dxLeft / Math.max(distL, 1);
      const ny = dyLeft / Math.max(distL, 1);
      pupilLeft.style.transform = `translate(${Math.min(distL / 20, 1) * maxMove * nx}px, ${Math.min(distL / 20, 1) * maxMove * ny}px)`;
    }

    if (distR > 0) {
      const nx = dxRight / Math.max(distR, 1);
      const ny = dyRight / Math.max(distR, 1);
      pupilRight.style.transform = `translate(${Math.min(distR / 20, 1) * maxMove * nx}px, ${Math.min(distR / 20, 1) * maxMove * ny}px)`;
    }
  }

  document.addEventListener("mousemove", function (e) {
    // 仅当熊在视口内时更新, 减少计算
    const bearRect = bear.getBoundingClientRect();
    if (bearRect.top > window.innerHeight || bearRect.bottom < 0) return;
    movePupils(e);
  });

  // 触摸设备支持
  document.addEventListener("touchmove", function (e) {
    if (e.touches.length > 0) {
      movePupils({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
    }
  });

  // ============================================================
  //  2. 👆 点击熊 -> 跳 + 爱心粒子
  // ============================================================
  function bearJump() {
    if (!bear) return;

    // 先移除再重新添加, 重置动画
    bear.classList.remove("bear-jump");
    void bear.offsetWidth;
    bear.classList.add("bear-jump");

    bear.classList.add("bear-blink");

    // 动画结束后清理
    setTimeout(() => {
      bear.classList.remove("bear-jump");
      bear.classList.remove("bear-blink");
    }, 600);

    // 隐藏提示
    if (hint) {
      bearWrap.classList.add("bear-interacted");
    }

    // 爆出爱心粒子
    burstHearts();
  }

  bear.addEventListener("click", bearJump);

  // ============================================================
  //  3. 🌸 点击时爱心/花瓣粒子
  // ============================================================
  function burstHearts() {
    const rect = bear.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const emojis = ["💖", "💕", "💗", "🌸", "🌿", "✨", "💚"];
    const count = 12;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement("div");
      heart.textContent = emojis[i % emojis.length];
      heart.style.position = "fixed";
      heart.style.left = centerX + "px";
      heart.style.top = centerY + "px";
      heart.style.fontSize = (18 + Math.random() * 12) + "px";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "1000";
      heart.style.transform = "translate(-50%, -50%)";
      heart.style.opacity = "1";
      heart.style.transition = "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)";

      document.body.appendChild(heart);

      // 下一帧开始动画
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      const distance = 80 + Math.random() * 60;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 30;

      requestAnimationFrame(() => {
        heart.style.transform =
          `translate(calc(-50% + ${dx}px, calc(-50% + ${dy}px)) rotate(${Math.random() * 360 - 180}deg)`;
        heart.style.opacity = "0";
      });

      // 动画完成后清理
      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, 1300);
    }
  }

  // ============================================================
  //  4. 🌸 鼠标悬停熊时 - 轻微微动
  // ============================================================
  bear.addEventListener("mouseenter", function () {
    if (pupilLeft && pupilRight) {
      pupilLeft.style.transition = "transform 0.2s ease-out";
      pupilRight.style.transition = "transform 0.2s ease-out";
    }
  });

  // ============================================================
  //  5. 👁 偶尔眨眼 (独立于点击的)
  // ============================================================
  function blink() {
    if (!bear) return;
    bear.classList.add("bear-blink");
    setTimeout(() => {
      bear.classList.remove("bear-blink");
    }, 250);
    // 3 ~ 8 秒后再随机眨眼
    setTimeout(blink, 3000 + Math.random() * 5000);
  }

  // 5 秒后开始偶尔眨眼
  setTimeout(blink, 5000);

  // ============================================================
  //  6. 🌸 鼠标移开后, 瞳孔慢慢回到中心
  // ============================================================
  // (由 CSS transition 处理, 通过上面的瞳孔transform
  // ============================================================
  // 当鼠标离开页面时, 瞳孔回到中心
  document.addEventListener("mouseleave", function () {
    if (pupilLeft) pupilLeft.style.transform = "translate(0,0)";
    if (pupilRight) pupilRight.style.transform = "translate(0,0)";
  });

})();
