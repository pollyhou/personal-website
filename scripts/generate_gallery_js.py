# -*- coding: utf-8 -*-
"""
scripts/generate_gallery_js.py

读取 photos/ 目录，生成 gallery.js 中按日期分组的 PHOTOS 数组。
"""
import os
import re
from collections import OrderedDict

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHOTOS_DIR = os.path.join(BASE_DIR, "photos")
GALLERY_JS = os.path.join(BASE_DIR, "gallery.js")

TIMELINE_TITLES = {
    "2018-03-18": "初春 · 2018 年 3 月 18 日",
    "2018-07-19": "盛夏 · 2018 年 7 月 19 日",
    "2018-07-20": "盛夏 · 2018 年 7 月 20 日",
    "2018-07-21": "盛夏 · 2018 年 7 月 21 日",
    "2018-07-22": "盛夏 · 2018 年 7 月 22 日",
    "2018-07-24": "盛夏 · 2018 年 7 月 24 日",
    "2018-07-28": "盛夏 · 2018 年 7 月 28 日",
    "2018-07-29": "盛夏 · 2018 年 7 月 29 日",
    "2018-08-01": "夏日午后 · 2018 年 8 月 1 日",
    "2018-08-07": "夏日午后 · 2018 年 8 月 7 日",
    "2018-08-08": "夏日午后 · 2018 年 8 月 8 日",
    "2018-08-09": "夏日午后 · 2018 年 8 月 9 日",
    "2018-08-10": "夏日午后 · 2018 年 8 月 10 日",
    "2018-08-11": "夏日午后 · 2018 年 8 月 11 日",
    "2018-08-12": "夏日午后 · 2018 年 8 月 12 日",
    "2018-08-21": "夏末 · 2018 年 8 月 21 日",
    "2018-08-22": "夏末 · 2018 年 8 月 22 日",
    "2019-11-15": "深秋 · 2019 年 11 月 15 日",
    "2019-11-16": "深秋 · 2019 年 11 月 16 日",
    "2023-12-04": "近期 · 2023 年 12 月 4 日",
}


def main():
    photo_files = sorted([
        f for f in os.listdir(PHOTOS_DIR)
        if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))
    ])
    print(f"📷 发现 {len(photo_files)} 张照片")

    # 按日期分组
    groups = OrderedDict()
    for f in photo_files:
        match = re.match(r"(\d{4}-\d{2}-\d{2})", f)
        date = match.group(1) if match else "unknown"
        if date not in groups:
            groups[date] = []
        groups[date].append(f)

    # 按日期排序（unknown 放最后）
    sorted_dates = sorted([d for d in groups.keys() if d != "unknown"])
    if "unknown" in groups:
        sorted_dates.append("unknown")

    # 生成 PHOTOS 数组字符串
    entries_lines = []
    for date in sorted_dates:
        title = TIMELINE_TITLES.get(date, date)
        count = len(groups[date])
        for filename in groups[date]:
            date_val = date if date != "unknown" else ""
            lines = []
            lines.append("  {")
            lines.append('    src: "' + filename + '",')
            lines.append('    title: "' + title + '",')
            lines.append('    location: "时间线",')
            lines.append('    date: "' + date_val + '",')
            lines.append('    caption: "' + title + " · " + str(count) + ' 张"')
            lines.append("  }")
            entries_lines.append("\n".join(lines))

    photos_text = "const PHOTOS = [\n" + ",\n".join(entries_lines) + "\n];\n"

    # 读取并替换 gallery.js
    with open(GALLERY_JS, "r", encoding="utf-8") as f:
        js_content = f.read()

    pattern = re.compile(r"const PHOTOS = \[.*?\];\n", re.DOTALL)
    new_js_content = pattern.sub(photos_text, js_content, count=1)

    with open(GALLERY_JS, "w", encoding="utf-8") as f:
        f.write(new_js_content)

    print("✅ gallery.js 已更新，共 {} 张照片，{} 个时间线分组".format(
        len(photo_files), len(sorted_dates)))
    for date in sorted_dates:
        title = TIMELINE_TITLES.get(date, date)
        print("    {} ({} 张)".format(date, len(groups[date])))


if __name__ == "__main__":
    main()
