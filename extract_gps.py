# -*- coding: utf-8 -*-
"""提取 E:\卖图 文件夹中所有照片的 EXIF 元数据（GPS + 拍摄时间）。"""
import os
import json
from datetime import datetime

from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS

SRC_DIR = r"E:\卖图"
OUTPUT_FILE = r"E:\agents\personal-website\photos_metadata.json"


def _rational_to_float(rational):
    """把 EXIF 的 (numerator, denominator) 元组转成 float。"""
    try:
        if isinstance(rational, tuple) and len(rational) == 2:
            return float(rational[0]) / float(rational[1]) if rational[1] else 0.0
        return float(rational)
    except Exception:
        return 0.0


def _dms_to_decimal(dms, ref):
    """把 (度, 分, 秒) 转为十进制经纬度。"""
    try:
        degrees = _rational_to_float(dms[0])
        minutes = _rational_to_float(dms[1])
        seconds = _rational_to_float(dms[2])
        decimal = degrees + (minutes / 60.0) + (seconds / 3600.0)
        if ref in ("S", "W"):
            decimal = -decimal
        return round(decimal, 6)
    except Exception:
        return None


def _parse_datetime(value):
    """EXIF 时间格式一般是 'YYYY:MM:DD HH:MM:SS'。"""
    if not value:
        return None
    try:
        dt = datetime.strptime(value, "%Y:%m:%d %H:%M:%S")
        return dt.strftime("%Y-%m-%d %H:%M:%S")
    except Exception:
        return str(value)


def get_exif(path):
    """读取一张照片的 EXIF。返回 (lat, lon, datetime_str)。"""
    try:
        with Image.open(path) as img:
            exif = img._getexif() or {}
    except Exception:
        return None, None, None

    gps_info = None
    datetime_str = None

    for tag_id, value in exif.items():
        tag_name = TAGS.get(tag_id, tag_id)
        if tag_name == "GPSInfo":
            gps_info = value
        elif tag_name in ("DateTimeOriginal", "DateTime") and datetime_str is None:
            datetime_str = _parse_datetime(value)

    lat = None
    lon = None
    if gps_info:
        gps = {}
        for gps_tag_id, gps_value in gps_info.items():
            gps_tag_name = GPSTAGS.get(gps_tag_id, gps_tag_id)
            gps[gps_tag_name] = gps_value

        if "GPSLatitude" in gps and "GPSLatitudeRef" in gps:
            lat = _dms_to_decimal(gps["GPSLatitude"], gps.get("GPSLatitudeRef", "N"))
        if "GPSLongitude" in gps and "GPSLongitudeRef" in gps:
            lon = _dms_to_decimal(gps["GPSLongitude"], gps.get("GPSLongitudeRef", "E"))

    return lat, lon, datetime_str


def main():
    photos = []
    filenames = sorted(os.listdir(SRC_DIR))

    for name in filenames:
        ext = os.path.splitext(name)[1].lower()
        if ext not in (".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"):
            continue

        full_path = os.path.join(SRC_DIR, name)
        lat, lon, dt = get_exif(full_path)
        photos.append({
            "filename": name,
            "lat": lat,
            "lon": lon,
            "datetime": dt,
            "size": round(os.path.getsize(full_path) / 1024, 1),  # KB
        })

    with_gps = [p for p in photos if p["lat"] is not None and p["lon"] is not None]
    without_gps = [p for p in photos if p["lat"] is None or p["lon"] is None]

    report = {
        "total": len(photos),
        "with_gps": len(with_gps),
        "without_gps": len(without_gps),
        "photos": photos,
    }

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    print("=" * 60)
    print(f"扫描目录: {SRC_DIR}")
    print(f"总照片数: {len(photos)}")
    print(f"含 GPS:    {len(with_gps)}")
    print(f"不含 GPS:  {len(without_gps)}")
    print("=" * 60)
    print(f"\n✅ 已保存到: {OUTPUT_FILE}\n")

    if with_gps:
        print("📍 含 GPS 的照片：")
        for p in with_gps:
            print(f"  - {p['filename']}  ({p['datetime'] or '? time'})")
            print(f"     {p['lat']}, {p['lon']}")

    if without_gps:
        print(f"\n⚠️  没有 GPS 信息的照片（{len(without_gps)} 张）：")
        for p in without_gps:
            print(f"  - {p['filename']}  ({p['datetime'] or '? time'})")


if __name__ == "__main__":
    main()
