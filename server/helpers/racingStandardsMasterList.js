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
      { name: 'LM 4x', d: 2000, t: { h: 0, m: 5, s: 42, ms: 750 } }
    ],
    'U23 Men': [

    ],
    'U23 Lightweight Men': [

    ],
    'Jr Men': [

    ],
    Women: [
      { name: 'W 1X', d: 2000, t: { h: 0, m: 7, s: 7, ms: 710 } },
      { name: 'W 2-', d: 2000, t: { h: 0, m: 6, s: 49, ms: 80 } },
      { name: 'W 2x', d: 2000, t: { h: 0, m: 6, s: 37, ms: 310 } },
      { name: 'W 4-', d: 2000, t: { h: 0, m: 6, s: 14, ms: 360 } },
      { name: 'W 4+', d: 2000, t: { h: 0, m: 6, s: 43, ms: 860 } },
      { name: 'W 4X', d: 2000, t: { h: 0, m: 6, s: 6, ms: 840 } }
    ],
    'Lightweight Women': [
      { name: 'LW 1X', d: 2000, t: { h: 0, m: 7, s: 24, ms: 460 } },
      { name: 'LW 2-', d: 2000, t: { h: 0, m: 7, s: 18, ms: 320 } },
      { name: 'LW 2x', d: 2000, t: { h: 0, m: 6, s: 47, ms: 690 } },
      { name: 'LW 4-', d: 2000, t: { h: 0, m: 6, s: 36, ms: 400 } },
      { name: 'LW 4x', d: 2000, t: { h: 0, m: 6, s: 15, ms: 950 } }
    ],
    'U23 Women': [

    ],
    'U23 Lightweight Women': [

    ],
    'Jr Women': [

    ],
    Para: [

    ]

  }
}

//
//
//     {name:'W8+', d:2000, t:{h:0,m:5,s:54,ms:160}},
//     {name:'LM8+', d:2000, t:{h:0,m:5,s:30,ms:240}},
//     {name:'BLM1X', d:2000, t:{h:0,m:6,s:46,ms:34}},
//     {name:'BLW1X', d:2000, t:{h:0,m:7,s:28,ms:340}},
//     {name:'BM1X', d:2000, t:{h:0,m:6,s:46,ms:610}},
//     {name:'BW1X', d:2000, t:{h:0,m:7,s:27,ms:230}},
//     {name:'BLW2-', d:2000, t:{h:0,m:7,s:31,ms:110}},
//     {name:'BW2-', d:2000, t:{h:0,m:7,s:02,ms:890}},
//     {name:'BLM2-', d:2000, t:{h:0,m:6,s:26,ms:470}},
//     {name:'BM2-', d:2000, t:{h:0,m:6,s:20,ms:060}},
//     {name:'BLW2x', d:2000, t:{h:0,m:6,s:54,ms:410}},
//     {name:'BW2x', d:2000, t:{h:0,m:6,s:47,ms:030}},
//     {name:'BLM2x', d:2000, t:{h:0,m:6,s:13,ms:620}},
//     {name:'BM2x', d:2000, t:{h:0,m:6,s:07,ms:570}},
//     {name:'BM4-', d:2000, t:{h:0,m:5,s:44,ms:380}},
//     {name:'BW4-', d:2000, t:{h:0,m:6,s:26,ms:620}},
//     {name:'BLM4-', d:2000, t:{h:0,m:5,s:54,ms:120}},
//     {name:'BM4+', d:2000, t:{h:0,m:6,s:03,ms:010}},
//     {name:'BLW4x', d:2000, t:{h:0,m:6,s:25,ms:960}},
//     {name:'BLM4x', d:2000, t:{h:0,m:5,s:47,ms:260}},
//     {name:'BW4X', d:2000, t:{h:0,m:6,s:19,ms:100}},
//     {name:'BM4X', d:2000, t:{h:0,m:5,s:39,ms:620}},
//     {name:'BM8+', d:2000, t:{h:0,m:5,s:22,ms:480}},
//     {name:'BW8+', d:2000, t:{h:0,m:6,s:00,ms:130}},
//     {name:'JW1X', d:2000, t:{h:0,m:7,s:31,ms:500}},
//     {name:'JM1X', d:2000, t:{h:0,m:6,s:45,ms:450}},
//     {name:'JM2-', d:2000, t:{h:0,m:6,s:27,ms:910}},
//     {name:'JW2-', d:2000, t:{h:0,m:7,s:15,ms:530}},
//     {name:'JM2+', d:2000, t:{h:0,m:7,s:10,ms:010}},
//     {name:'JM2x', d:2000, t:{h:0,m:6,s:18,ms:190}},
//     {name:'JW2x', d:2000, t:{h:0,m:7,s:03,ms:180}},
//     {name:'JM4-', d:2000, t:{h:0,m:5,s:47,ms:730}},
//     {name:'JW4-', d:2000, t:{h:0,m:6,s:37,ms:890}},
//     {name:'JW4+', d:2000, t:{h:0,m:7,s:02,ms:230}},
//     {name:'JM4+', d:2000, t:{h:0,m:6,s:11,ms:960}},
//     {name:'JM4X', d:2000, t:{h:0,m:5,s:46,ms:490}},
//     {name:'JW4X', d:2000, t:{h:0,m:6,s:23,ms:850}},
//     {name:'JW8+', d:2000, t:{h:0,m:6,s:13,ms:040}},
//     {name:'JM8+', d:2000, t:{h:0,m:5,s:35,ms:930}},
//     {name:'PR2 M1X', d:2000, t:{h:0,m:8,s:28,ms:400}},
//     {name:'PR2 W1X', d:2000, t:{h:0,m:9,s:27,ms:270}},
//     {name:'PR1 W1X', d:2000, t:{h:0,m:10,s:13,ms:630}},
//     {name:'PR1 M1X', d:2000, t:{h:0,m:9,s:16,ms:900}},
//     {name:'PR3 W2-', d:2000, t:{h:0,m:7,s:39,ms:300}},
//     {name:'PR2 MIX2X', d:2000, t:{h:0,m:8,s:06,ms:210}},
//     {name:'PR3 MIX2X', d:2000, t:{h:0,m:7,s:28,ms:950}},
//     {name:'PR3 MIX4+', d:2000, t:{h:0,m:6,s:55,ms:700}},
//     {name:'ASM1X', d:1000, t:{h:0,m:4,s:34,ms:710}},
//     {name:'ASW1X', d:1000, t:{h:0,m:5,s:09,ms:280}},
//     {name:'TAMIX2X', d:1000, t:{h:0,m:3,s:52,ms:160}},
//     {name:'LTAMIX2X', d:1000, t:{h:0,m:3,s:27,ms:980}},
//     {name:'LTAMIX4+', d:1000, t:{h:0,m:3,s:13,ms:760}},
//     {name:'LTAID4+', d:1000, t:{h:0,m:3,s:55,ms:700}},
//   ],
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
//     {name:'WC2', d:500,	t:{h:0,m:1,s:51,ms:428}},
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
