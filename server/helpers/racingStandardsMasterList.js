export const racingStandardTimeToMs = (time) => {
  const s = time.s * 1000
  const m = time.m * (60 * 1000)
  const h = time.h * (60 * 60 * 1000)

  return time.ms + s + m + h
}

export const RacingStandardsMasterList = {
  rowing: {
    Men: [
      { name: 'M 2+', d: 2000, t: { h: 0, m: 6, s: 33, ms: 260 } },
      { name: 'M 2x', d: 2000, t: { h: 0, m: 5, s: 59, ms: 720 } },
      { name: 'M 4-', d: 2000, t: { h: 0, m: 5, s: 37, ms: 860 } },
      { name: 'M 4+', d: 2000, t: { h: 0, m: 5, s: 58, ms: 960 } },
      { name: 'M 4X', d: 2000, t: { h: 0, m: 5, s: 32, ms: 260 } },
      { name: 'M 8+', d: 2000, t: { h: 0, m: 5, s: 18, ms: 680 } }
    ],
    'Lightweight Men': [
      { name: 'LM 1x', d: 2000, t: { h: 0, m: 6, s: 41, ms: 300 } },
      { name: 'LM 2-', d: 2000, t: { h: 0, m: 6, s: 22, ms: 910 } },
      { name: 'LM 2x', d: 2000, t: { h: 0, m: 6, s: 5, ms: 360 } },
      { name: 'LM 4-', d: 2000, t: { h: 0, m: 5, s: 43, ms: 160 } },
      { name: 'LM 4x', d: 2000, t: { h: 0, m: 5, s: 42, ms: 750 } },
      { name: 'LM 8+', d: 2000, t: { h: 0, m: 5, s: 30, ms: 240 } }
    ],
    'U23 Men': [
      { name: 'BM 1X', d: 2000, t: { h: 0, m: 6, s: 46, ms: 610 } },
      { name: 'BM 2-', d: 2000, t: { h: 0, m: 6, s: 20, ms: 60 } },
      { name: 'BM 2x', d: 2000, t: { h: 0, m: 6, s: 7, ms: 570 } },
      { name: 'BM 4-', d: 2000, t: { h: 0, m: 5, s: 44, ms: 380 } },
      { name: 'BM 4+', d: 2000, t: { h: 0, m: 6, s: 3, ms: 10 } },
      { name: 'BM 4X', d: 2000, t: { h: 0, m: 5, s: 39, ms: 620 } },
      { name: 'BM8+', d: 2000, t: { h: 0, m: 5, s: 22, ms: 480 } }

    ],
    'U23 Lightweight Men': [
      { name: 'BLM 1X', d: 2000, t: { h: 0, m: 6, s: 46, ms: 34 } },
      { name: 'BLM2-', d: 2000, t: { h: 0, m: 6, s: 26, ms: 470 } },
      { name: 'BLM 2x', d: 2000, t: { h: 0, m: 6, s: 13, ms: 620 } },
      { name: 'BLM 4-', d: 2000, t: { h: 0, m: 5, s: 54, ms: 120 } },
      { name: 'BLM 4x', d: 2000, t: { h: 0, m: 5, s: 47, ms: 260 } }

    ],
    'Jr Men': [
      { name: 'JM 1X', d: 2000, t: { h: 0, m: 6, s: 45, ms: 450 } },
      { name: 'JM 2-', d: 2000, t: { h: 0, m: 6, s: 27, ms: 910 } },
      { name: 'JM 2+', d: 2000, t: { h: 0, m: 7, s: 10, ms: 10 } },
      { name: 'JM2x', d: 2000, t: { h: 0, m: 6, s: 18, ms: 190 } },
      { name: 'JM 4-', d: 2000, t: { h: 0, m: 5, s: 47, ms: 730 } },
      { name: 'JM 4+', d: 2000, t: { h: 0, m: 6, s: 11, ms: 960 } },
      { name: 'JM 4X', d: 2000, t: { h: 0, m: 5, s: 46, ms: 490 } },
      { name: 'JM8+', d: 2000, t: { h: 0, m: 5, s: 35, ms: 930 } }
    ],
    Women: [
      { name: 'W 1X', d: 2000, t: { h: 0, m: 7, s: 7, ms: 710 } },
      { name: 'W 2-', d: 2000, t: { h: 0, m: 6, s: 49, ms: 80 } },
      { name: 'W 2x', d: 2000, t: { h: 0, m: 6, s: 37, ms: 310 } },
      { name: 'W 4-', d: 2000, t: { h: 0, m: 6, s: 14, ms: 360 } },
      { name: 'W 4+', d: 2000, t: { h: 0, m: 6, s: 43, ms: 860 } },
      { name: 'W 4X', d: 2000, t: { h: 0, m: 6, s: 6, ms: 840 } },
      { name: 'W 8+', d: 2000, t: { h: 0, m: 5, s: 54, ms: 160 } }
    ],
    'Lightweight Women': [
      { name: 'LW 1X', d: 2000, t: { h: 0, m: 7, s: 24, ms: 460 } },
      { name: 'LW 2-', d: 2000, t: { h: 0, m: 7, s: 18, ms: 320 } },
      { name: 'LW 2x', d: 2000, t: { h: 0, m: 6, s: 47, ms: 690 } },
      { name: 'LW 4-', d: 2000, t: { h: 0, m: 6, s: 36, ms: 400 } },
      { name: 'LW 4x', d: 2000, t: { h: 0, m: 6, s: 15, ms: 950 } },
      { name: 'BW 4-', d: 2000, t: { h: 0, m: 6, s: 26, ms: 620 } }
    ],
    'U23 Women': [
      { name: 'BW 1X', d: 2000, t: { h: 0, m: 7, s: 27, ms: 230 } },
      { name: 'BW 2-', d: 2000, t: { h: 0, m: 7, s: 2, ms: 890 } },
      { name: 'BW 2x', d: 2000, t: { h: 0, m: 6, s: 47, ms: 30 } },
      { name: 'BW 4X', d: 2000, t: { h: 0, m: 6, s: 19, ms: 100 } },
      { name: 'BW8+', d: 2000, t: { h: 0, m: 6, s: 0, ms: 130 } }

    ],
    'U23 Lightweight Women': [
      { name: 'BLW 1X', d: 2000, t: { h: 0, m: 7, s: 28, ms: 340 } },
      { name: 'BLW 2-', d: 2000, t: { h: 0, m: 7, s: 31, ms: 110 } },
      { name: 'BLW 2x', d: 2000, t: { h: 0, m: 6, s: 54, ms: 410 } },
      { name: 'BLW 4x', d: 2000, t: { h: 0, m: 6, s: 25, ms: 960 } }

    ],
    'Jr Women': [
      { name: 'JW 1X', d: 2000, t: { h: 0, m: 7, s: 31, ms: 500 } },
      { name: 'JW 2-', d: 2000, t: { h: 0, m: 7, s: 15, ms: 530 } },
      { name: 'JW 2x', d: 2000, t: { h: 0, m: 7, s: 3, ms: 180 } },
      { name: 'JW 4-', d: 2000, t: { h: 0, m: 6, s: 37, ms: 890 } },
      { name: 'JW 4+', d: 2000, t: { h: 0, m: 7, s: 2, ms: 230 } },
      { name: 'JW 4X', d: 2000, t: { h: 0, m: 6, s: 23, ms: 850 } },
      { name: 'JW 8+', d: 2000, t: { h: 0, m: 6, s: 13, ms: 40 } }

    ],
    Para: [
      { name: 'PR2 M 1X', d: 2000, t: { h: 0, m: 8, s: 28, ms: 400 } },
      { name: 'PR2 W 1X', d: 2000, t: { h: 0, m: 9, s: 27, ms: 270 } },
      { name: 'PR1 W 1X', d: 2000, t: { h: 0, m: 10, s: 13, ms: 630 } },
      { name: 'PR1 M 1X', d: 2000, t: { h: 0, m: 9, s: 16, ms: 900 } },
      { name: 'PR3 W 2-', d: 2000, t: { h: 0, m: 7, s: 39, ms: 300 } },
      { name: 'PR2 MIX 2X', d: 2000, t: { h: 0, m: 8, s: 6, ms: 210 } },
      { name: 'PR3 MIX 2X', d: 2000, t: { h: 0, m: 7, s: 28, ms: 950 } },
      { name: 'PR3 MIX 4+', d: 2000, t: { h: 0, m: 6, s: 55, ms: 700 } },
      { name: 'AS M 1X', d: 1000, t: { h: 0, m: 4, s: 34, ms: 710 } },
      { name: 'AS W 1X', d: 1000, t: { h: 0, m: 5, s: 9, ms: 280 } },
      { name: 'TA MIX 2X', d: 1000, t: { h: 0, m: 3, s: 52, ms: 160 } },
      { name: 'LTA MIX 2X', d: 1000, t: { h: 0, m: 3, s: 27, ms: 980 } },
      { name: 'LTA MIX 4+', d: 1000, t: { h: 0, m: 3, s: 13, ms: 760 } },
      { name: 'LTA MIX 4+', d: 1000, t: { h: 0, m: 3, s: 55, ms: 700 } }
    ]
  }
}

//   'canoe-kayak': [
//     {name:'MK1', d:200, t:{h:0,m:0,s:33,ms:380}},
//     {name:'MK2', d:200, t:{h:0,m:0,s:30,ms:500}},
//     {name:'MK4', d:200, t:{h:0,m:0,s:29,ms:023}},
//     {name:'MK1', d:500, t:{h:0,m:1,s:35,ms:149}},
//     {name:'MK2', d:500, t:{h:0,m:1,s:26,ms:500}},
//     {name:'MK4', d:500, t:{h:0,m:1,s:17,ms:734}},
//     {name:'MK1', d:1000, t:{h:0,m:3,s:21,ms:890}},
//     {name:'MK2', d:1000, t:{h:0,m:3,s:04,ms:940}},
//     {name:'MK4', d:1000, t:{h:0,m:2,s:46,ms:724}},
//     {name:'MK1', d:5000, t:{h:0,m:18,s:00,ms:040}},
//     {name:'WK1', d:200, t:{h:0,m:0,s:37,ms:898}},
//     {name:'WK2', d:200, t:{h:0,m:0,s:35,ms:869}},
//     {name:'WK4', d:200, t:{h:0,m:0,s:33,ms:778}},
//     {name:'WK1', d:500, t:{h:0,m:1,s:46,ms:465}},
//     {name:'WK2', d:500, t:{h:0,m:1,s:37,ms:071}},
//     {name:'WK4', d:500, t:{h:0,m:1,s:28,ms:219}},
//     {name:'WK1', d:1000, t:{h:0,m:3,s:48,ms:560}},
//     {name:'WK2', d:1000, t:{h:0,m:3,s:31,ms:645}},
//     {name:'WK4', d:1000, t:{h:0,m:3,s:13,ms:296}},
//     {name:'WK1', d:5000, t:{h:0,m:20,s:10,ms:100}},
//     {name:'MC1', d:200, t:{h:0,m:0,s:37,ms:446}},
//     {name:'MC2', d:200, t:{h:0,m:0,s:35,ms:350}},
//     {name:'MC4', d:200, t:{h:0,m:0,s:32,ms:753}},
//     {name:'MC1', d:500, t:{h:0,m:1,s:43,ms:669}},
//     {name:'MC2', d:500, t:{h:0,m:1,s:35,ms:270}},
//     {name:'MC4', d:500, t:{h:0,m:1,s:29,ms:155}},
//     {name:'MC1', d:1000, t:{h:0,m:3,s:42,ms:385}},
//     {name:'MC2', d:1000, t:{h:0,m:3,s:25,ms:041}},
//     {name:'MC4', d:1000, t:{h:0,m:3,s:10,ms:701}},
//     {name:'MC1', d:5000, t:{h:0,m:20,s:27,ms:350}},
//     {name:'WC1', d:200, t:{h:0,m:0,s:44,ms:504}},
//     {name:'WC2', d:200, t:{h:0,m:0,s:42,ms:686}},
//     {name:'WC1', d:500, t:{h:0,m:2,s:03,ms:053}},
//     {name:'WC2', d:500, t:{h:0,m:1,s:51,ms:428}},
//     {name:'WC1', d:5000, t:{h:0,m:25,s:58,ms:260}},
//     {name:'JUN WC1', d:200, t:{h:0,m:0,s:46,ms:873}},
//     {name:'JUN WC2', d:200, t:{h:0,m:0,s:46,ms:020}},
//     {name:'JUN WC1', d:500, t:{h:0,m:2,s:16,ms:891}},
//     {name:'JUN WC2', d:500, t:{h:0,m:1,s:58,ms:306}},
//     {name:'JUN WK1', d:200, t:{h:0,m:0,s:40,ms:548}},
//     {name:'JUN WK1', d:500, t:{h:0,m:1,s:49,ms:735}},
//     {name:'JUN WK2', d:500, t:{h:0,m:1,s:39,ms:776}},
//     {name:'JUN WK4', d:500, t:{h:0,m:1,s:36,ms:497}},
//     {name:'JUN WK1', d:1000, t:{h:0,m:4,s:15,ms:603}},
//     {name:'JUN MC1', d:200, t:{h:0,m:0,s:39,ms:767}},
//     {name:'JUN MC4', d:500, t:{h:0,m:1,s:32,ms:235}},
//     {name:'JUN MC1', d:1000, t:{h:0,m:4,s:06,ms:560}},
//     {name:'JUN MC2', d:1000, t:{h:0,m:3,s:53,ms:872}},
//     {name:'JUN MK1', d:200, t:{h:0,m:0,s:35,ms:260}},
//     {name:'JUN MK2', d:200, t:{h:0,m:0,s:33,ms:054}},
//     {name:'JUN MK1', d:500, t:{h:0,m:1,s:35,ms:920}},
//     {name:'JUN MK4', d:500, t:{h:0,m:1,s:21,ms:055}},
//     {name:'JUN MK1', d:1000, t:{h:0,m:3,s:40,ms:047}},
//     {name:'JUN MK2', d:1000, t:{h:0,m:3,s:30,ms:856}},
//     {name:'JUN MK4', d:1000, t:{h:0,m:3,s:04,ms:865}},
//     {name:'U23 MK1', d:200, t:{h:0,m:0,s:34,ms:542}},
//     {name:'U23 MK2', d:200, t:{h:0,m:0,s:32,ms:066}},
//     {name:'U23 MK1', d:500, t:{h:0,m:1,s:36,ms:078}},
//     {name:'U23 MK4', d:500, t:{h:0,m:1,s:17,ms:964}},
//     {name:'U23 MK1', d:1000, t:{h:0,m:3,s:34,ms:611}},
//     {name:'U23 MK2', d:1000, t:{h:0,m:3,s:17,ms:472}},
//     {name:'U23 MC1', d:200, t:{h:0,m:0,s:38,ms:534}},
//     {name:'U23 MC2', d:500, t:{h:0,m:1,s:38,ms:445}},
//     {name:'U23 MC1', d:1000, t:{h:0,m:3,s:59,ms:889}},
//     {name:'U23 MC2', d:1000, t:{h:0,m:3,s:39,ms:534}},
//     {name:'U23 WK1', d:200, t:{h:0,m:0,s:39,ms:466}},
//     {name:'U23 WK1', d:500, t:{h:0,m:1,s:48,ms:228}},
//     {name:'U23 WK2', d:500, t:{h:0,m:1,s:40,ms:019}},
//     {name:'U23 WK4', d:500, t:{h:0,m:1,s:34,ms:944}},
//     {name:'U23 WK1', d:1000, t:{h:0,m:4,s:17,ms:793}},
//     {name:'U23 WC1', d:200, t:{h:0,m:0,s:45,ms:593}},
//     {name:'U23 WC2', d:200, t:{h:0,m:0,s:43,ms:742}},
//     {name:'U23 WC1', d:500, t:{h:0,m:2,s:09,ms:559}},
//     {name:'U23 WC2', d:500, t:{h:0,m:1,s:55,ms:926}},
//   ]
