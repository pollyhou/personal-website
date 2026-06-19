# -*- coding: utf-8 -*-
"""
第 2 步：
1. 读取 photos_metadata.json
2. 按日期（YYYY-MM-DD）把照片分组（相邻日期合并为一个"时间线"）
3. 把照片从 E:\卖图 复制到 website\photos\ 并按时间线重命名
4. 输出 gallery.js 的 PHOTOS 数组内容
"""
import os
import json
import shutil
from collections import OrderedDict

SRC_DIR = r"E:\卖图"
META_FILE = r"E:\agents\personal-website\photos_metadata.json"
DEST_DIR = r"E:\agents\personal-website\photos"
GALLERY_JS = r"E:\agents\personal-website\gallery.js"


def _nice_caption(date_str):
    """根据日期返回一个更友好的中文描述。"""
    y, m, d = date_str.split("-")
    return f"{y} 年 {int(m)} 月 {int(d)} 日"


def main():
    # 1. 读取 metadata
    with open(META_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    photos = data["photos"]

    # 2. 分组：有日期 vs 没日期
    dated = []
    undated = []
    for p in photos:
        if p.get("datetime"):
            dated.append(p)
        else:
            undated.append(p)

    # 按日期排序
    dated.sort(key=lambda x: x["datetime"])

    # 按天分组
    groups = OrderedDict()
    for p in dated:
        day = p["datetime"][:10]  # YYYY-MM-DD
        if day not in groups:
            groups[day] = []
        groups[day].append(p)

    # 合并相邻日期为"时间线"（连续的日子合并成一段，比如 2018-08-10 ~ 2018-08-12）
    # 这里简单按日期分组即可，相邻日期展示时会自然挨在一起
    print("=" * 60)
    print(f"共 {len(photos)} 张照片，{len(dated)} 张有日期，{len(undated)} 张没日期")
    print(f"共分成 {len(groups)} 个日期组")
    print("=" * 60)

    # 3. 准备 photos 目录
    os.makedirs(DEST_DIR, exist_ok=True)

    # 4. 复制 & 重命名，生成 PHOTOS 数组
    photos_js = []
    global_idx = 0

    for day, day_photos in groups.items():
        day_photos.sort(key=lambda x: x["datetime"])
        caption = _nice_caption(day)
        for i, p in enumerate(day_photos):
            global_idx += 1
            ext = os.path.splitext(p["filename"])[1].lower()
            new_name = f"{day}_{global_idx:03d}{ext}"

            src_path = os.path.join(SRC_DIR, p["filename"])
            dest_path = os.path.join(DEST_DIR, new_name)

            shutil.copy2(src_path, dest_path)

            photos_js.append({
                "src": new_name,
                "title": caption,
                "location": "时间线",
                "date": day,
                "caption": f"{caption} · 第 {i + 1}/{len(day_photos)} 张",
            })
        print(f"  {day}  ({len(day_photos)} 张)  →  {caption}")

    # 没日期的放最后，统一归到"未标注时间"
    if undated:
        for i, p in enumerate(sorted(undated, key=lambda x: x["filename"])):
            global_idx += 1
            ext = os.path.splitext(p["filename"])[1].lower()
            new_name = f"unknown_{global_idx:03d}{ext}"

            src_path = os.path.join(SRC_DIR, p["filename"])
            dest_path = os.path.join(DEST_DIR, new_name)

            shutil.copy2(src_path, dest_path)

            photos_js.append({
                "src": new_name,
                "title": "未标注时间",
                "location": "未标注",
                "date": "",
                "caption": f"未标注时间 · 第 {i + 1}/{len(undated)} 张",
            })
        print(f"  未标注时间  ({len(undated)} 张)")

    # 5. 写入 gallery.js（只替换 PHOTOS 数组部分）
    with open(GALLERY_JS, "r", encoding="utf-8") as f:
        js_content = f.read()

    # 找到 PHOTOS = [ ... ] 这一整块替换掉
    import re
    photos_array_text = "const PHOTOS = [\n"
    for p in photos_js:
        photos_array_text += (
            "  {\n"
            f'    src: "{p["src"]}",\n'
            f'    title: "{p["title"]}",\n'
            f'    location: "{p["location"]}",\n'
            f'    date: "{p["date"]}",\n'
            f'    caption: "{p["caption"]}"\n'
            "  },\n"
        )
    photos_array_text += "];\n"

    # 用正则替换 "const PHOTOS = [ 到第一个匹配的 ];\n"
    pattern = re.compile(r"const PHOTOS = \[.*?\];\n", re.DOTALL)
    new_js_content = pattern.sub(photos_array_text, js_content, count=1)

    with open(GALLERY_JS, "w", encoding="utf-8") as f:
        f.write(new_js_content)

    print(f"\n✅ 共 {len(photos_js)} 张照片已复制到 {DEST_DIR}")
    print(f"✅ gallery.js 中的 PHOTOS 数组已更新")


if __name__ == "__main__":
    main()
