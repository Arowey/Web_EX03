// ============================================================
// 全站唯一的"数据源"，相当于后端数据库里的一张菜品表。
// 真实项目里这里会换成 fetch('/api/dishes')，页面组件不用改。
// ============================================================

// 分类列表，首页和菜单页的筛选按钮都用它渲染
export const categories = ['全部', '面食', '米饭', '小吃', '甜品', '饮品']

export const dishes = [
  {
    id: 1,
    name: '番茄鸡蛋面',
    emoji: '🍜',
    category: '面食',
    price: 12,
    rating: 4.8,
    canteen: '一食堂 · 2 号窗口',
    tags: ['招牌', '暖胃'],
    gradient: 'linear-gradient(135deg, #ffd9a0, #ff9f6e)',
    desc: '番茄熬到起沙，鸡蛋滑嫩，汤头酸甜开胃，是下课后的第一选择。',
    story: '窗口阿姨说，番茄要先用热油炒出红油再加水慢炖十分钟，汤才会浓。',
    comments: [
      { id: 1, name: '小林', rating: 5, content: '汤真的很浓，面也筋道，冬天来一碗整个人都活了。', time: '10 月 12 日' },
      { id: 2, name: '阿哲', rating: 4, content: '分量足，就是高峰期要排十分钟队。', time: '10 月 09 日' }
    ]
  },
  {
    id: 2,
    name: '红烧牛肉面',
    emoji: '🍲',
    category: '面食',
    price: 16,
    rating: 4.9,
    canteen: '二食堂 · 5 号窗口',
    tags: ['人气王', '大块牛肉'],
    gradient: 'linear-gradient(135deg, #f7c8a8, #d9764a)',
    desc: '牛肉炖到用筷子一夹就散，汤底带一点八角香，面条是现拉的。',
    story: '每天只炖两锅，中午十二点半以后基本就卖完了。',
    comments: [
      { id: 1, name: '饭团', rating: 5, content: '牛肉真的给得多，16 块在食堂算良心了。', time: '10 月 15 日' }
    ]
  },
  {
    id: 3,
    name: '石锅拌饭',
    emoji: '🍚',
    category: '米饭',
    price: 18,
    rating: 4.6,
    canteen: '三食堂 · 8 号窗口',
    tags: ['锅巴', '微辣'],
    gradient: 'linear-gradient(135deg, #ffe0b2, #f0a860)',
    desc: '端上来还在滋滋响，拌开以后每一粒米都裹上酱，锅底的锅巴最抢手。',
    story: '石锅要先烧到两百多度，米饭压进去才会结出脆脆的一层。',
    comments: [
      { id: 1, name: '小满', rating: 5, content: '锅巴是灵魂！记得让阿姨多给一勺辣酱。', time: '10 月 11 日' },
      { id: 2, name: '阿远', rating: 4, content: '好吃，但是等的时间有点久。', time: '10 月 03 日' }
    ]
  },
  {
    id: 4,
    name: '黄焖鸡米饭',
    emoji: '🍗',
    category: '米饭',
    price: 15,
    rating: 4.7,
    canteen: '二食堂 · 3 号窗口',
    tags: ['下饭', '微辣'],
    gradient: 'linear-gradient(135deg, #fbd6a5, #e08b4c)',
    desc: '鸡腿肉焖得酥烂，土豆吸满汤汁，一勺汤能干掉半碗饭。',
    story: '老板坚持用小锅单做，所以每一份的汤汁浓稠度都不太一样。',
    comments: [
      { id: 1, name: '橙子', rating: 5, content: '汤汁拌饭一绝，我一周吃了三次。', time: '10 月 14 日' }
    ]
  },
  {
    id: 5,
    name: '螺蛳粉',
    emoji: '🥣',
    category: '面食',
    price: 14,
    rating: 4.5,
    canteen: '一食堂 · 9 号窗口',
    tags: ['重口味', '有争议'],
    gradient: 'linear-gradient(135deg, #ffd0c4, #e2705f)',
    desc: '酸笋的味道隔着两排桌子都能闻到，喜欢的人一周三次，不喜欢的人绕道走。',
    story: '窗口外面贴着一张纸：请勿在自习室食用。',
    comments: [
      { id: 1, name: '螺蛳粉信徒', rating: 5, content: '汤头够酸够辣，腐竹给得很大方。', time: '10 月 08 日' },
      { id: 2, name: '路人甲', rating: 3, content: '味道可以，就是吃完衣服上全是味。', time: '09 月 28 日' }
    ]
  },
  {
    id: 6,
    name: '煎饼果子',
    emoji: '🌯',
    category: '小吃',
    price: 8,
    rating: 4.4,
    canteen: '南门 · 流动摊位',
    tags: ['早餐', '现做'],
    gradient: 'linear-gradient(135deg, #ffe7b8, #e6b25c)',
    desc: '薄脆是现炸的，加两个蛋也才十块，赶早八的时候救过很多人的命。',
    story: '摊主大叔记得住每个熟客的口味：要不要葱、要不要辣、加不加肠。',
    comments: [
      { id: 1, name: '早八人', rating: 4, content: '七点半去基本不用排队，八点就要等了。', time: '10 月 16 日' }
    ]
  },
  {
    id: 7,
    name: '炸鸡柳',
    emoji: '🍗',
    category: '小吃',
    price: 10,
    rating: 4.6,
    canteen: '西门 · 小吃街',
    tags: ['夜宵', '酥脆'],
    gradient: 'linear-gradient(135deg, #ffdca8, #d98b3f)',
    desc: '刚出锅的时候外壳脆得掉渣，撒上椒盐和辣椒面，配一杯冰饮正好。',
    story: '晚上九点以后摊位前永远排着队，那是图书馆闭馆的时间。',
    comments: [
      { id: 1, name: '夜猫子', rating: 5, content: '十块钱一大袋，两个人吃刚好。', time: '10 月 13 日' }
    ]
  },
  {
    id: 8,
    name: '麻辣烫',
    emoji: '🍢',
    category: '小吃',
    price: 20,
    rating: 4.8,
    canteen: '三食堂 · 12 号窗口',
    tags: ['自选', '中辣'],
    gradient: 'linear-gradient(135deg, #ffc9a8, #d95f43)',
    desc: '自己拿夹子挑菜，按重量称，最后浇一勺麻酱，是冬天最治愈的一餐。',
    story: '有同学总结出了公式：两把青菜 + 一份丸子 + 半份宽粉 = 刚好十五块。',
    comments: [
      { id: 1, name: '小锅', rating: 5, content: '麻酱可以自己加，我一般加两勺。', time: '10 月 10 日' },
      { id: 2, name: '阿棠', rating: 4, content: '好吃，但是很容易一不小心拿多了。', time: '10 月 01 日' }
    ]
  },
  {
    id: 9,
    name: '双皮奶',
    emoji: '🍮',
    category: '甜品',
    price: 9,
    rating: 4.7,
    canteen: '一食堂 · 甜品档',
    tags: ['冰凉', '奶香'],
    gradient: 'linear-gradient(135deg, #fff2d6, #f3cf8e)',
    desc: '表面那层奶皮微微皱起，勺子挖下去是颤巍巍的，甜度刚好不腻。',
    story: '下午三点出炉，通常四点就卖光了。',
    comments: [
      { id: 1, name: '甜党', rating: 5, content: '比外面甜品店便宜一半，味道不输。', time: '10 月 07 日' }
    ]
  },
  {
    id: 10,
    name: '桂花酒酿圆子',
    emoji: '🍡',
    category: '甜品',
    price: 10,
    rating: 4.5,
    canteen: '二食堂 · 甜品档',
    tags: ['热饮', '桂花香'],
    gradient: 'linear-gradient(135deg, #fff0c9, #ecc978)',
    desc: '小圆子软糯，酒酿微酸，桂花是秋天限定的那一批。',
    story: '只有九月到十一月才有，错过就要等一年。',
    comments: [
      { id: 1, name: '秋天', rating: 5, content: '桂花味很足，喝完胃里暖暖的。', time: '10 月 05 日' }
    ]
  },
  {
    id: 11,
    name: '柠檬茶',
    emoji: '🍋',
    category: '饮品',
    price: 8,
    rating: 4.3,
    canteen: '图书馆 · 一楼水吧',
    tags: ['解腻', '少冰可选'],
    gradient: 'linear-gradient(135deg, #f6f5b0, #cfd35c)',
    desc: '三片柠檬加满冰，酸得人一激灵，配炸物最合适。',
    story: '水吧的阿姨会问一句"要不要少冰"，然后真的只放三块冰。',
    comments: [
      { id: 1, name: '续命水', rating: 4, content: '八块钱一大杯，比奶茶店划算。', time: '10 月 02 日' }
    ]
  },
  {
    id: 12,
    name: '生椰拿铁',
    emoji: '☕',
    category: '饮品',
    price: 13,
    rating: 4.6,
    canteen: '图书馆 · 一楼水吧',
    tags: ['提神', '椰香'],
    gradient: 'linear-gradient(135deg, #f0e0cf, #b58a63)',
    desc: '椰乳的甜把咖啡的苦压下去一半，赶论文的下午来一杯能撑到晚上。',
    story: '考试周的时候，这个窗口一天能卖出三百多杯。',
    comments: [
      { id: 1, name: '论文人', rating: 5, content: '比外面便宜，而且不用排队等太久。', time: '10 月 06 日' }
    ]
  }
]
