# -*- coding: utf-8 -*-
"""
scripts/compress_photos.py

把 E:\卖图 里的 160 张原始照片
压缩成 Web 友好尺寸
输出到 E:\agents\personal-website\photos

使用方法：
  cd E:\agents\personal-website
  python scripts\compress_photos.py
"""

import os
import sys
from pathlib import Path
from datetime import datetime

try:
    from PIL import Image, ImageOps
except ImportError:
    print("❌ 需要安装 Pillow：\n   pip install Pillow")
    sys.exit(1)

# ==================== 配置 ====================
SOURCE_DIR = r"E:\卖图"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "photos")

MAX_WIDTH = 1920        # 最大宽度（像素
JPG_QUALITY = 85        # JPG 质量（1-95，85 是视觉无损
VALID_EXT = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".JPG", ".JPEG", ".PNG"}

REPORT_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "photos_report.txt")
# ============================================

os.makedirs(OUTPUT_DIR, exist_ok=True)


def get_capture_time(img, filepath):
    """尝试从 EXIF 读取拍摄时间，失败则用文件修改时间。"""
    try:
        exif = img._getexif()
        if exif:
            for tag_id in (36867, 36868, 306):
                if tag_id in exif and exif[tag_id]:
                    try:
                        dt = datetime.strptime(str(exif[tag_id]).strip(), "%Y:%m:%d %H:%M:%S")
                        return dt
                    except Exception:
                        continue
    except Exception:
        pass
    return datetime.fromtimestamp(os.path.getmtime(filepath))


def human_size(num_bytes):
    for unit in ["B", "KB", "MB", "GB"]:
        if num_bytes < 1024:
            return f"{num_bytes:.1f} {unit}"
        num_bytes /= 1024
    return f"{num_bytes:.1f} TB"


def main():
    print("=" * 60)
    print("🖼  照片压缩脚本 · 侯小雯 Wonderland")
    print("=" * 60)
    print(f"📂 来源文件夹：{SOURCE_DIR}")
    print(f"📂 输出文件夹：{OUTPUT_DIR}")
    print(f"🎛  最大宽度：{MAX_WIDTH} px")
    print(f"🎛  JPG 质量：{JPG_QUALITY}")
    print("-" * 60)

    if not os.path.isdir(SOURCE_DIR):
        print(f"❌ 找不到源文件夹：{SOURCE_DIR}")
        sys.exit(1)

    # 收集并排序
    all_files = []
    for name in os.listdir(SOURCE_DIR):
        ext = os.path.splitext(name)[1].lower()
        if ext in {e.lower() for e in VALID_EXT}:
            all_files.append(os.path.join(SOURCE_DIR, name))
    all_files.sort(key=lambda x: os.path.getmtime(x))  # 按时间排序

    if not all_files:
        print("❌ 源文件夹里没找到任何照片")
        sys.exit(1)

    total_raw = 0
    total_new = 0
    ok_count = 0
    fail_count = 0
    report_lines = []

    for idx, src in enumerate(all_files, 1):
        name = os.path.basename(src)
        try:
            with Image.open(src) as img:
                capture_dt = get_capture_time(img, src)

                # 自动方向（修复 iPhone 竖拍横显
                try:
                    img = ImageOps.exif_transpose(img)
                except Exception:
                    pass

                # RGBA → RGB（JPG 不支持透明通道
                if img.mode in ("RGBA", "LA", "P", "CMYK"):
                    img = img.convert("RGB")

                # 等比缩放到最大宽度
                if img.width > MAX_WIDTH:
                    ratio = MAX_WIDTH / float(img.width)
                    new_h = int(img.height * ratio)
                    img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)

                # 文件名：日期_序号.jpg（保证时间线顺序）
                date_prefix = capture_dt.strftime("%Y-%m-%d")
                new_name = f"{date_prefix}_{idx:03d}.jpg"
                dst = os.path.join(OUTPUT_DIR, new_name)

                # 保存
                img.save(
                    dst,
                    format="JPEG",
                    quality=JPG_QUALITY,
                    optimize=True,
                    progressive=True,
                )

            raw_size = os.path.getsize(src)
            new_size = os.path.getsize(dst)
            saved_pct = (1 - new_size / raw_size) * 100 if raw_size > 0 else 0
            total_raw += raw_size
            total_new += new_size
            ok_count += 1

            line = (
                f"[{idx:3d}/{len(all_files):3d}] "
                f"{name:40s} → {new_name:22s} "
                f"{human_size(raw_size):>8s} → {human_size(new_size):>8s} "
                f"(节省 {saved_pct:.0f}%)"
            )
            print(line)
            report_lines.append(line)

        except Exception as e:
            fail_count += 1
            line = f"❌ [{idx:3d}] {name} → 失败: {e}"
            print(line)
            report_lines.append(line)

    # 统计
    print("\n" + "=" * 60)
    print(f"✅ 完成！成功 {ok_count} 张，失败 {fail_count} 张")
    print(f"   原始：{human_size(total_raw)}")
    print(f"   压缩：{human_size(total_new)}")
    total_pct = (1 - total_new / total_raw) * 100 if total_raw > 0 else 0
    print(f"   节省：{human_size(total_raw - total_new)}（{int(total_pct)}%）")
    print(f"   输出：{OUTPUT_DIR}")
    print("=" * 60)

    # 写报告文件（方便上传前检查
    summary = (
        f"侯小雯个人网站 · 照片压缩报告\n"
        f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        f"总张数: {ok_count + fail_count}\n"
        f"成功: {ok_count}\n"
        f"失败: {fail_count}\n"
        f"原始大小: {human_size(total_raw)}\n"
        f"压缩大小: {human_size(total_new)}\n"
        f"节省: {human_size(total_raw - total_new)} ({total_pct:.0f}%)\n"
        f"\n----- 详细清单 -----\n" + "\n".join(report_lines)
    )
    with open(REPORT_FILE, "w", encoding="utf-8") as f:
        f.write(summary)
    print(f"\n📄 详细报告已保存: {REPORT_FILE}")


if __name__ == "__main__":
    main()
