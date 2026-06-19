/* ============================================================
 * 📷 画册 · 照片数据文件
 * ============================================================
 *  用法：把你的照片放到 `photos/` 文件夹里，
 *  然后在下面的 PHOTOS 数组里添加它们的信息。
 *
 *  每张照片支持字段：
 *    - src:     文件名（必填，放在 photos/ 文件夹里）
 *    - title:   标题（必填）
 *    - location:地点（可选）
 *    - date:    日期，格式 YYYY-MM-DD（可选）
 *    - caption: 一句话描述（可选）
 *
 *  例：
 *    {
 *      src: "my-photo.jpg",
 *      title: "清晨的小路",
 *      location: "杭州",
 *      date: "2025-06-15",
 *      caption: "那天的阳光刚刚好"
 *    }
 * ============================================================ */

const PHOTOS = [
  {
    src: "2018-03-18_025.jpg",
    title: "初春 · 2018 年 3 月 18 日",
    location: "时间线",
    date: "2018-03-18",
    caption: "初春 · 2018 年 3 月 18 日 · 4 张"
  },
  {
    src: "2018-03-18_026.jpg",
    title: "初春 · 2018 年 3 月 18 日",
    location: "时间线",
    date: "2018-03-18",
    caption: "初春 · 2018 年 3 月 18 日 · 4 张"
  },
  {
    src: "2018-03-18_027.jpg",
    title: "初春 · 2018 年 3 月 18 日",
    location: "时间线",
    date: "2018-03-18",
    caption: "初春 · 2018 年 3 月 18 日 · 4 张"
  },
  {
    src: "2018-03-18_028.jpg",
    title: "初春 · 2018 年 3 月 18 日",
    location: "时间线",
    date: "2018-03-18",
    caption: "初春 · 2018 年 3 月 18 日 · 4 张"
  },
  {
    src: "2018-07-19_035.jpg",
    title: "盛夏 · 2018 年 7 月 19 日",
    location: "时间线",
    date: "2018-07-19",
    caption: "盛夏 · 2018 年 7 月 19 日 · 8 张"
  },
  {
    src: "2018-07-19_049.jpg",
    title: "盛夏 · 2018 年 7 月 19 日",
    location: "时间线",
    date: "2018-07-19",
    caption: "盛夏 · 2018 年 7 月 19 日 · 8 张"
  },
  {
    src: "2018-07-19_065.jpg",
    title: "盛夏 · 2018 年 7 月 19 日",
    location: "时间线",
    date: "2018-07-19",
    caption: "盛夏 · 2018 年 7 月 19 日 · 8 张"
  },
  {
    src: "2018-07-19_094.jpg",
    title: "盛夏 · 2018 年 7 月 19 日",
    location: "时间线",
    date: "2018-07-19",
    caption: "盛夏 · 2018 年 7 月 19 日 · 8 张"
  },
  {
    src: "2018-07-19_119.jpg",
    title: "盛夏 · 2018 年 7 月 19 日",
    location: "时间线",
    date: "2018-07-19",
    caption: "盛夏 · 2018 年 7 月 19 日 · 8 张"
  },
  {
    src: "2018-07-19_123.jpg",
    title: "盛夏 · 2018 年 7 月 19 日",
    location: "时间线",
    date: "2018-07-19",
    caption: "盛夏 · 2018 年 7 月 19 日 · 8 张"
  },
  {
    src: "2018-07-19_137.jpg",
    title: "盛夏 · 2018 年 7 月 19 日",
    location: "时间线",
    date: "2018-07-19",
    caption: "盛夏 · 2018 年 7 月 19 日 · 8 张"
  },
  {
    src: "2018-07-19_148.jpg",
    title: "盛夏 · 2018 年 7 月 19 日",
    location: "时间线",
    date: "2018-07-19",
    caption: "盛夏 · 2018 年 7 月 19 日 · 8 张"
  },
  {
    src: "2018-07-20_057.jpg",
    title: "盛夏 · 2018 年 7 月 20 日",
    location: "时间线",
    date: "2018-07-20",
    caption: "盛夏 · 2018 年 7 月 20 日 · 5 张"
  },
  {
    src: "2018-07-20_066.jpg",
    title: "盛夏 · 2018 年 7 月 20 日",
    location: "时间线",
    date: "2018-07-20",
    caption: "盛夏 · 2018 年 7 月 20 日 · 5 张"
  },
  {
    src: "2018-07-20_096.jpg",
    title: "盛夏 · 2018 年 7 月 20 日",
    location: "时间线",
    date: "2018-07-20",
    caption: "盛夏 · 2018 年 7 月 20 日 · 5 张"
  },
  {
    src: "2018-07-20_135.jpg",
    title: "盛夏 · 2018 年 7 月 20 日",
    location: "时间线",
    date: "2018-07-20",
    caption: "盛夏 · 2018 年 7 月 20 日 · 5 张"
  },
  {
    src: "2018-07-20_156.jpg",
    title: "盛夏 · 2018 年 7 月 20 日",
    location: "时间线",
    date: "2018-07-20",
    caption: "盛夏 · 2018 年 7 月 20 日 · 5 张"
  },
  {
    src: "2018-07-21_099.jpg",
    title: "盛夏 · 2018 年 7 月 21 日",
    location: "时间线",
    date: "2018-07-21",
    caption: "盛夏 · 2018 年 7 月 21 日 · 5 张"
  },
  {
    src: "2018-07-21_122.jpg",
    title: "盛夏 · 2018 年 7 月 21 日",
    location: "时间线",
    date: "2018-07-21",
    caption: "盛夏 · 2018 年 7 月 21 日 · 5 张"
  },
  {
    src: "2018-07-21_125.jpg",
    title: "盛夏 · 2018 年 7 月 21 日",
    location: "时间线",
    date: "2018-07-21",
    caption: "盛夏 · 2018 年 7 月 21 日 · 5 张"
  },
  {
    src: "2018-07-21_129.jpg",
    title: "盛夏 · 2018 年 7 月 21 日",
    location: "时间线",
    date: "2018-07-21",
    caption: "盛夏 · 2018 年 7 月 21 日 · 5 张"
  },
  {
    src: "2018-07-21_147.jpg",
    title: "盛夏 · 2018 年 7 月 21 日",
    location: "时间线",
    date: "2018-07-21",
    caption: "盛夏 · 2018 年 7 月 21 日 · 5 张"
  },
  {
    src: "2018-07-22_037.jpg",
    title: "盛夏 · 2018 年 7 月 22 日",
    location: "时间线",
    date: "2018-07-22",
    caption: "盛夏 · 2018 年 7 月 22 日 · 3 张"
  },
  {
    src: "2018-07-22_050.jpg",
    title: "盛夏 · 2018 年 7 月 22 日",
    location: "时间线",
    date: "2018-07-22",
    caption: "盛夏 · 2018 年 7 月 22 日 · 3 张"
  },
  {
    src: "2018-07-22_080.jpg",
    title: "盛夏 · 2018 年 7 月 22 日",
    location: "时间线",
    date: "2018-07-22",
    caption: "盛夏 · 2018 年 7 月 22 日 · 3 张"
  },
  {
    src: "2018-07-24_036.jpg",
    title: "盛夏 · 2018 年 7 月 24 日",
    location: "时间线",
    date: "2018-07-24",
    caption: "盛夏 · 2018 年 7 月 24 日 · 2 张"
  },
  {
    src: "2018-07-24_043.jpg",
    title: "盛夏 · 2018 年 7 月 24 日",
    location: "时间线",
    date: "2018-07-24",
    caption: "盛夏 · 2018 年 7 月 24 日 · 2 张"
  },
  {
    src: "2018-07-28_039.jpg",
    title: "盛夏 · 2018 年 7 月 28 日",
    location: "时间线",
    date: "2018-07-28",
    caption: "盛夏 · 2018 年 7 月 28 日 · 5 张"
  },
  {
    src: "2018-07-28_062.jpg",
    title: "盛夏 · 2018 年 7 月 28 日",
    location: "时间线",
    date: "2018-07-28",
    caption: "盛夏 · 2018 年 7 月 28 日 · 5 张"
  },
  {
    src: "2018-07-28_068.jpg",
    title: "盛夏 · 2018 年 7 月 28 日",
    location: "时间线",
    date: "2018-07-28",
    caption: "盛夏 · 2018 年 7 月 28 日 · 5 张"
  },
  {
    src: "2018-07-28_078.jpg",
    title: "盛夏 · 2018 年 7 月 28 日",
    location: "时间线",
    date: "2018-07-28",
    caption: "盛夏 · 2018 年 7 月 28 日 · 5 张"
  },
  {
    src: "2018-07-28_142.jpg",
    title: "盛夏 · 2018 年 7 月 28 日",
    location: "时间线",
    date: "2018-07-28",
    caption: "盛夏 · 2018 年 7 月 28 日 · 5 张"
  },
  {
    src: "2018-07-29_052.jpg",
    title: "盛夏 · 2018 年 7 月 29 日",
    location: "时间线",
    date: "2018-07-29",
    caption: "盛夏 · 2018 年 7 月 29 日 · 6 张"
  },
  {
    src: "2018-07-29_104.jpg",
    title: "盛夏 · 2018 年 7 月 29 日",
    location: "时间线",
    date: "2018-07-29",
    caption: "盛夏 · 2018 年 7 月 29 日 · 6 张"
  },
  {
    src: "2018-07-29_111.jpg",
    title: "盛夏 · 2018 年 7 月 29 日",
    location: "时间线",
    date: "2018-07-29",
    caption: "盛夏 · 2018 年 7 月 29 日 · 6 张"
  },
  {
    src: "2018-07-29_117.jpg",
    title: "盛夏 · 2018 年 7 月 29 日",
    location: "时间线",
    date: "2018-07-29",
    caption: "盛夏 · 2018 年 7 月 29 日 · 6 张"
  },
  {
    src: "2018-07-29_133.jpg",
    title: "盛夏 · 2018 年 7 月 29 日",
    location: "时间线",
    date: "2018-07-29",
    caption: "盛夏 · 2018 年 7 月 29 日 · 6 张"
  },
  {
    src: "2018-07-29_155.jpg",
    title: "盛夏 · 2018 年 7 月 29 日",
    location: "时间线",
    date: "2018-07-29",
    caption: "盛夏 · 2018 年 7 月 29 日 · 6 张"
  },
  {
    src: "2018-08-01_029.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_031.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_034.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_040.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_041.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_047.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_048.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_056.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_058.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_071.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_072.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_076.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_082.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_083.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_085.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_092.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_107.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_118.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_126.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_127.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_138.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_146.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_149.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-01_150.jpg",
    title: "夏日午后 · 2018 年 8 月 1 日",
    location: "时间线",
    date: "2018-08-01",
    caption: "夏日午后 · 2018 年 8 月 1 日 · 24 张"
  },
  {
    src: "2018-08-07_038.jpg",
    title: "夏日午后 · 2018 年 8 月 7 日",
    location: "时间线",
    date: "2018-08-07",
    caption: "夏日午后 · 2018 年 8 月 7 日 · 9 张"
  },
  {
    src: "2018-08-07_045.jpg",
    title: "夏日午后 · 2018 年 8 月 7 日",
    location: "时间线",
    date: "2018-08-07",
    caption: "夏日午后 · 2018 年 8 月 7 日 · 9 张"
  },
  {
    src: "2018-08-07_051.jpg",
    title: "夏日午后 · 2018 年 8 月 7 日",
    location: "时间线",
    date: "2018-08-07",
    caption: "夏日午后 · 2018 年 8 月 7 日 · 9 张"
  },
  {
    src: "2018-08-07_060.jpg",
    title: "夏日午后 · 2018 年 8 月 7 日",
    location: "时间线",
    date: "2018-08-07",
    caption: "夏日午后 · 2018 年 8 月 7 日 · 9 张"
  },
  {
    src: "2018-08-07_102.jpg",
    title: "夏日午后 · 2018 年 8 月 7 日",
    location: "时间线",
    date: "2018-08-07",
    caption: "夏日午后 · 2018 年 8 月 7 日 · 9 张"
  },
  {
    src: "2018-08-07_108.jpg",
    title: "夏日午后 · 2018 年 8 月 7 日",
    location: "时间线",
    date: "2018-08-07",
    caption: "夏日午后 · 2018 年 8 月 7 日 · 9 张"
  },
  {
    src: "2018-08-07_128.jpg",
    title: "夏日午后 · 2018 年 8 月 7 日",
    location: "时间线",
    date: "2018-08-07",
    caption: "夏日午后 · 2018 年 8 月 7 日 · 9 张"
  },
  {
    src: "2018-08-07_154.jpg",
    title: "夏日午后 · 2018 年 8 月 7 日",
    location: "时间线",
    date: "2018-08-07",
    caption: "夏日午后 · 2018 年 8 月 7 日 · 9 张"
  },
  {
    src: "2018-08-07_160.jpg",
    title: "夏日午后 · 2018 年 8 月 7 日",
    location: "时间线",
    date: "2018-08-07",
    caption: "夏日午后 · 2018 年 8 月 7 日 · 9 张"
  },
  {
    src: "2018-08-08_046.jpg",
    title: "夏日午后 · 2018 年 8 月 8 日",
    location: "时间线",
    date: "2018-08-08",
    caption: "夏日午后 · 2018 年 8 月 8 日 · 6 张"
  },
  {
    src: "2018-08-08_090.jpg",
    title: "夏日午后 · 2018 年 8 月 8 日",
    location: "时间线",
    date: "2018-08-08",
    caption: "夏日午后 · 2018 年 8 月 8 日 · 6 张"
  },
  {
    src: "2018-08-08_140.jpg",
    title: "夏日午后 · 2018 年 8 月 8 日",
    location: "时间线",
    date: "2018-08-08",
    caption: "夏日午后 · 2018 年 8 月 8 日 · 6 张"
  },
  {
    src: "2018-08-08_141.jpg",
    title: "夏日午后 · 2018 年 8 月 8 日",
    location: "时间线",
    date: "2018-08-08",
    caption: "夏日午后 · 2018 年 8 月 8 日 · 6 张"
  },
  {
    src: "2018-08-08_143.jpg",
    title: "夏日午后 · 2018 年 8 月 8 日",
    location: "时间线",
    date: "2018-08-08",
    caption: "夏日午后 · 2018 年 8 月 8 日 · 6 张"
  },
  {
    src: "2018-08-08_152.jpg",
    title: "夏日午后 · 2018 年 8 月 8 日",
    location: "时间线",
    date: "2018-08-08",
    caption: "夏日午后 · 2018 年 8 月 8 日 · 6 张"
  },
  {
    src: "2018-08-09_044.jpg",
    title: "夏日午后 · 2018 年 8 月 9 日",
    location: "时间线",
    date: "2018-08-09",
    caption: "夏日午后 · 2018 年 8 月 9 日 · 6 张"
  },
  {
    src: "2018-08-09_059.jpg",
    title: "夏日午后 · 2018 年 8 月 9 日",
    location: "时间线",
    date: "2018-08-09",
    caption: "夏日午后 · 2018 年 8 月 9 日 · 6 张"
  },
  {
    src: "2018-08-09_101.jpg",
    title: "夏日午后 · 2018 年 8 月 9 日",
    location: "时间线",
    date: "2018-08-09",
    caption: "夏日午后 · 2018 年 8 月 9 日 · 6 张"
  },
  {
    src: "2018-08-09_103.jpg",
    title: "夏日午后 · 2018 年 8 月 9 日",
    location: "时间线",
    date: "2018-08-09",
    caption: "夏日午后 · 2018 年 8 月 9 日 · 6 张"
  },
  {
    src: "2018-08-09_136.jpg",
    title: "夏日午后 · 2018 年 8 月 9 日",
    location: "时间线",
    date: "2018-08-09",
    caption: "夏日午后 · 2018 年 8 月 9 日 · 6 张"
  },
  {
    src: "2018-08-09_159.jpg",
    title: "夏日午后 · 2018 年 8 月 9 日",
    location: "时间线",
    date: "2018-08-09",
    caption: "夏日午后 · 2018 年 8 月 9 日 · 6 张"
  },
  {
    src: "2018-08-10_030.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_033.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_061.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_063.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_067.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_069.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_073.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_075.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_077.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_084.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_087.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_089.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_091.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_093.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_097.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_100.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_105.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_110.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_112.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_120.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_134.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_139.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_144.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_145.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_153.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-10_157.jpg",
    title: "夏日午后 · 2018 年 8 月 10 日",
    location: "时间线",
    date: "2018-08-10",
    caption: "夏日午后 · 2018 年 8 月 10 日 · 26 张"
  },
  {
    src: "2018-08-11_032.jpg",
    title: "夏日午后 · 2018 年 8 月 11 日",
    location: "时间线",
    date: "2018-08-11",
    caption: "夏日午后 · 2018 年 8 月 11 日 · 4 张"
  },
  {
    src: "2018-08-11_055.jpg",
    title: "夏日午后 · 2018 年 8 月 11 日",
    location: "时间线",
    date: "2018-08-11",
    caption: "夏日午后 · 2018 年 8 月 11 日 · 4 张"
  },
  {
    src: "2018-08-11_081.jpg",
    title: "夏日午后 · 2018 年 8 月 11 日",
    location: "时间线",
    date: "2018-08-11",
    caption: "夏日午后 · 2018 年 8 月 11 日 · 4 张"
  },
  {
    src: "2018-08-11_121.jpg",
    title: "夏日午后 · 2018 年 8 月 11 日",
    location: "时间线",
    date: "2018-08-11",
    caption: "夏日午后 · 2018 年 8 月 11 日 · 4 张"
  },
  {
    src: "2018-08-12_079.jpg",
    title: "夏日午后 · 2018 年 8 月 12 日",
    location: "时间线",
    date: "2018-08-12",
    caption: "夏日午后 · 2018 年 8 月 12 日 · 11 张"
  },
  {
    src: "2018-08-12_086.jpg",
    title: "夏日午后 · 2018 年 8 月 12 日",
    location: "时间线",
    date: "2018-08-12",
    caption: "夏日午后 · 2018 年 8 月 12 日 · 11 张"
  },
  {
    src: "2018-08-12_095.jpg",
    title: "夏日午后 · 2018 年 8 月 12 日",
    location: "时间线",
    date: "2018-08-12",
    caption: "夏日午后 · 2018 年 8 月 12 日 · 11 张"
  },
  {
    src: "2018-08-12_109.jpg",
    title: "夏日午后 · 2018 年 8 月 12 日",
    location: "时间线",
    date: "2018-08-12",
    caption: "夏日午后 · 2018 年 8 月 12 日 · 11 张"
  },
  {
    src: "2018-08-12_113.jpg",
    title: "夏日午后 · 2018 年 8 月 12 日",
    location: "时间线",
    date: "2018-08-12",
    caption: "夏日午后 · 2018 年 8 月 12 日 · 11 张"
  },
  {
    src: "2018-08-12_115.jpg",
    title: "夏日午后 · 2018 年 8 月 12 日",
    location: "时间线",
    date: "2018-08-12",
    caption: "夏日午后 · 2018 年 8 月 12 日 · 11 张"
  },
  {
    src: "2018-08-12_116.jpg",
    title: "夏日午后 · 2018 年 8 月 12 日",
    location: "时间线",
    date: "2018-08-12",
    caption: "夏日午后 · 2018 年 8 月 12 日 · 11 张"
  },
  {
    src: "2018-08-12_130.jpg",
    title: "夏日午后 · 2018 年 8 月 12 日",
    location: "时间线",
    date: "2018-08-12",
    caption: "夏日午后 · 2018 年 8 月 12 日 · 11 张"
  },
  {
    src: "2018-08-12_132.jpg",
    title: "夏日午后 · 2018 年 8 月 12 日",
    location: "时间线",
    date: "2018-08-12",
    caption: "夏日午后 · 2018 年 8 月 12 日 · 11 张"
  },
  {
    src: "2018-08-12_151.jpg",
    title: "夏日午后 · 2018 年 8 月 12 日",
    location: "时间线",
    date: "2018-08-12",
    caption: "夏日午后 · 2018 年 8 月 12 日 · 11 张"
  },
  {
    src: "2018-08-12_158.jpg",
    title: "夏日午后 · 2018 年 8 月 12 日",
    location: "时间线",
    date: "2018-08-12",
    caption: "夏日午后 · 2018 年 8 月 12 日 · 11 张"
  },
  {
    src: "2018-08-21_018.jpg",
    title: "夏末 · 2018 年 8 月 21 日",
    location: "时间线",
    date: "2018-08-21",
    caption: "夏末 · 2018 年 8 月 21 日 · 9 张"
  },
  {
    src: "2018-08-21_019.jpg",
    title: "夏末 · 2018 年 8 月 21 日",
    location: "时间线",
    date: "2018-08-21",
    caption: "夏末 · 2018 年 8 月 21 日 · 9 张"
  },
  {
    src: "2018-08-21_042.jpg",
    title: "夏末 · 2018 年 8 月 21 日",
    location: "时间线",
    date: "2018-08-21",
    caption: "夏末 · 2018 年 8 月 21 日 · 9 张"
  },
  {
    src: "2018-08-21_064.jpg",
    title: "夏末 · 2018 年 8 月 21 日",
    location: "时间线",
    date: "2018-08-21",
    caption: "夏末 · 2018 年 8 月 21 日 · 9 张"
  },
  {
    src: "2018-08-21_070.jpg",
    title: "夏末 · 2018 年 8 月 21 日",
    location: "时间线",
    date: "2018-08-21",
    caption: "夏末 · 2018 年 8 月 21 日 · 9 张"
  },
  {
    src: "2018-08-21_088.jpg",
    title: "夏末 · 2018 年 8 月 21 日",
    location: "时间线",
    date: "2018-08-21",
    caption: "夏末 · 2018 年 8 月 21 日 · 9 张"
  },
  {
    src: "2018-08-21_098.jpg",
    title: "夏末 · 2018 年 8 月 21 日",
    location: "时间线",
    date: "2018-08-21",
    caption: "夏末 · 2018 年 8 月 21 日 · 9 张"
  },
  {
    src: "2018-08-21_114.jpg",
    title: "夏末 · 2018 年 8 月 21 日",
    location: "时间线",
    date: "2018-08-21",
    caption: "夏末 · 2018 年 8 月 21 日 · 9 张"
  },
  {
    src: "2018-08-21_131.jpg",
    title: "夏末 · 2018 年 8 月 21 日",
    location: "时间线",
    date: "2018-08-21",
    caption: "夏末 · 2018 年 8 月 21 日 · 9 张"
  },
  {
    src: "2018-08-22_024.jpg",
    title: "夏末 · 2018 年 8 月 22 日",
    location: "时间线",
    date: "2018-08-22",
    caption: "夏末 · 2018 年 8 月 22 日 · 5 张"
  },
  {
    src: "2018-08-22_053.jpg",
    title: "夏末 · 2018 年 8 月 22 日",
    location: "时间线",
    date: "2018-08-22",
    caption: "夏末 · 2018 年 8 月 22 日 · 5 张"
  },
  {
    src: "2018-08-22_054.jpg",
    title: "夏末 · 2018 年 8 月 22 日",
    location: "时间线",
    date: "2018-08-22",
    caption: "夏末 · 2018 年 8 月 22 日 · 5 张"
  },
  {
    src: "2018-08-22_106.jpg",
    title: "夏末 · 2018 年 8 月 22 日",
    location: "时间线",
    date: "2018-08-22",
    caption: "夏末 · 2018 年 8 月 22 日 · 5 张"
  },
  {
    src: "2018-08-22_124.jpg",
    title: "夏末 · 2018 年 8 月 22 日",
    location: "时间线",
    date: "2018-08-22",
    caption: "夏末 · 2018 年 8 月 22 日 · 5 张"
  },
  {
    src: "2019-11-15_023.jpg",
    title: "深秋 · 2019 年 11 月 15 日",
    location: "时间线",
    date: "2019-11-15",
    caption: "深秋 · 2019 年 11 月 15 日 · 2 张"
  },
  {
    src: "2019-11-15_074.jpg",
    title: "深秋 · 2019 年 11 月 15 日",
    location: "时间线",
    date: "2019-11-15",
    caption: "深秋 · 2019 年 11 月 15 日 · 2 张"
  },
  {
    src: "2019-11-16_020.jpg",
    title: "深秋 · 2019 年 11 月 16 日",
    location: "时间线",
    date: "2019-11-16",
    caption: "深秋 · 2019 年 11 月 16 日 · 3 张"
  },
  {
    src: "2019-11-16_021.jpg",
    title: "深秋 · 2019 年 11 月 16 日",
    location: "时间线",
    date: "2019-11-16",
    caption: "深秋 · 2019 年 11 月 16 日 · 3 张"
  },
  {
    src: "2019-11-16_022.jpg",
    title: "深秋 · 2019 年 11 月 16 日",
    location: "时间线",
    date: "2019-11-16",
    caption: "深秋 · 2019 年 11 月 16 日 · 3 张"
  },
  {
    src: "2023-12-04_001.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_002.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_003.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_004.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_005.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_006.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_007.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_008.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_009.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_010.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_011.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_012.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_013.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_014.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_015.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_016.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  },
  {
    src: "2023-12-04_017.jpg",
    title: "近期 · 2023 年 12 月 4 日",
    location: "时间线",
    date: "2023-12-04",
    caption: "近期 · 2023 年 12 月 4 日 · 17 张"
  }
];

/* ============================================================
 *  渲染逻辑（你一般不需要修改下面的内容）
 * ============================================================ */

function formatGalleryDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * 从 API 获取照片数据（如果 API 可用），失败则 fallback 到本地 PHOTOS 数组
 * 返回统一的「按日期分组」格式，让渲染逻辑一致。
 */
async function fetchPhotoGroups() {
  try {
    const res = await fetch("/api/photos?group_by=date");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (data && data.groups && data.groups.length > 0) {
      return { mode: "api", groups: data.groups };
    }
    throw new Error("数据库中没有照片数据");
  } catch (err) {
    // API 不可用 → 用本地 PHOTOS 数组按日期分组
    const validPhotos = PHOTOS.filter((p) => p && p.src && p.src.trim() !== "");
    if (validPhotos.length === 0) return { mode: "local", groups: [] };

    // 本地分组
    const groups = {};
    validPhotos.forEach((p) => {
      const key = p.date || "unknown";
      if (!groups[key]) groups[key] = [];
      groups[key].push(p);
    });
    const sortedKeys = Object.keys(groups).sort((a, b) => {
      if (a === "unknown") return 1;
      if (b === "unknown") return -1;
      return new Date(a).getTime() - new Date(b).getTime();
    });
    return {
      mode: "local",
      groups: sortedKeys.map((key) => ({
        date: key,
        title: groups[key][0].title || key,
        count: groups[key].length,
        photos: groups[key],
      })),
    };
  }
}

async function renderGallery() {
  const container = document.getElementById("photo-grid");
  if (!container) return;

  // 拉取数据（API 优先，本地 fallback
  const { mode, groups } = await fetchPhotoGroups();

  // 还没有照片 —— 显示上传指南
  if (!groups || groups.length === 0) {
    container.innerHTML = `
      <div class="gallery-empty">
        <div class="gallery-empty-emoji">📷 🌿</div>
        <h3>画册还在准备中…</h3>
        <p>
          把你拍的照片放到网站根目录的 <code style="background:var(--paper);padding:2px 8px;border-radius:4px;">photos/</code> 文件夹里，
          然后在 <code style="background:var(--paper);padding:2px 8px;border-radius:4px;">gallery.js</code> 的 <code style="background:var(--paper);padding:2px 8px;border-radius:4px;">PHOTOS</code> 数组里
          填写每张照片的信息即可。
        </p>
        <p style="font-size:13px;opacity:0.75;margin-top:20px;">
          每添加一张照片，只需在数组里加一行，刷新页面就能看到啦 🌸
        </p>
      </div>

      <div class="photo-grid" style="margin-top:24px;opacity:0.45;">
        ${Array.from({length: 6}).map(() => `
          <div class="photo-card">
            <div class="photo-placeholder">
              <div class="photo-placeholder-emoji">🌳</div>
              <div class="photo-placeholder-text">你的照片<br/>会出现在这里</div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
    return;
  }

  // 直接渲染 groups（按日期分组已经由数据源准备好了）
  // 同时打平一份照片数组，给灯箱 lightbox 按索引用
  let flatPhotos = [];
  groups.forEach((g) => flatPhotos.push(...g.photos));

  container.innerHTML = groups.map((g) => `
      <section class="timeline-group">
        <div class="timeline-header">
          <div class="timeline-date">
            <span class="timeline-emoji">🌸</span>
            <span class="timeline-title">${g.title}</span>
            <span class="timeline-count">${g.count} 张</span>
          </div>
          ${g.date && g.date !== "unknown" ? `<div class="timeline-sub">${g.date}</div>` : ""}
        </div>
        <div class="photo-grid">
          ${g.photos.map((photo) => {
            const globalIndex = flatPhotos.findIndex((p) => p === photo);
            const caption = photo.caption || "";
            return `
              <div class="photo-card" data-index="${globalIndex}">
                <img src="photos/${photo.src}" alt="${photo.title || ""}" loading="lazy" />
                <div class="photo-caption">
                  ${caption ? `<div style="font-size:12px;opacity:0.9;">${caption}</div>` : ""}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </section>
    `).join("");

  // 绑定点击事件 —— 打开 Lightbox
  document.querySelectorAll(".photo-card").forEach((card) => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.getAttribute("data-index"), 10);
      openLightbox(idx, flatPhotos);
    });
  });
}

/* ============================================================
 *  Lightbox · 灯箱大图查看
 * ============================================================ */
let currentLightboxIndex = 0;
let currentLightboxPhotos = [];

function openLightbox(index, photos) {
  currentLightboxIndex = index;
  currentLightboxPhotos = photos;
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  renderLightboxContent();
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function prevLightbox() {
  if (!currentLightboxPhotos.length) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxPhotos.length) % currentLightboxPhotos.length;
  renderLightboxContent();
}

function nextLightbox() {
  if (!currentLightboxPhotos.length) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxPhotos.length;
  renderLightboxContent();
}

function renderLightboxContent() {
  const content = document.getElementById("lightbox-content");
  if (!content) return;

  const photo = currentLightboxPhotos[currentLightboxIndex];
  if (!photo) return;

  const date = photo.date ? formatGalleryDate(photo.date) : "";
  const location = photo.location || "";
  const meta = (date || location)
    ? [date, location].filter(Boolean).join(" · ")
    : "";

  content.innerHTML = `
    <img src="photos/${photo.src}" alt="${photo.title || ""}" />
    <div style="text-align:center;margin-top:16px;">
      <div class="lightbox-caption">
        ${photo.title ? `<div class="lightbox-title">${photo.title}</div>` : ""}
        ${photo.caption ? `<div style="font-size:14px;margin:4px 0;opacity:0.9;">${photo.caption}</div>` : ""}
        ${meta ? `<div class="lightbox-meta">📍 ${meta}</div>` : ""}
      </div>
    </div>
  `;
}

/* ============================================================
 *  事件绑定
 * ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderGallery();

  // 点击关闭按钮
  const closeBtn = document.getElementById("lightbox-close");
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  // 点击背景关闭
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });
  }

  // 左右箭头
  const prevBtn = document.getElementById("lightbox-prev");
  if (prevBtn) prevBtn.addEventListener("click", prevLightbox);
  const nextBtn = document.getElementById("lightbox-next");
  if (nextBtn) nextBtn.addEventListener("click", nextLightbox);

  // 键盘操作
  document.addEventListener("keydown", (e) => {
    const lb = document.getElementById("lightbox");
    if (!lb || !lb.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") prevLightbox();
    else if (e.key === "ArrowRight") nextLightbox();
  });
});
