export type Term = { word: string; category: string };

export type Speaker = {
  id: string;
  name: string;
  shortName: string;
  era: string;
  author: string;
  nature: string;
  bio: string;
  color: "sage" | "clay" | "gold";
};

export type ChapterMessage = {
  id: string;
  speakerId: string;
  translation: string;
  original: string;
  terms: Term[];
};

export type Chapter = {
  id: "soybean" | "sauce";
  category: string;
  volume: string;
  title: string;
  shortTitle: string;
  question: string;
  intro: string;
  messages: ChapterMessage[];
};

export const speakers: Record<string, Speaker> = {
  fanshengzhi: {
    id: "fanshengzhi",
    name: "《氾胜之书》",
    shortName: "氾",
    era: "西汉晚期",
    author: "氾胜之",
    nature: "技术方法",
    bio: "中国最早的农学专著之一。原书已散佚，许多实用方法因被贾思勰引用而保存下来。",
    color: "sage"
  },
  jia: {
    id: "jia",
    name: "贾思勰",
    shortName: "贾",
    era: "北魏末年",
    author: "《齐民要术》作者",
    nature: "整理与观察",
    bio: "曾任高阳太守，广泛搜集古籍、农谚和亲身经验，写成中国现存最早最完整的农书。",
    color: "clay"
  },
  proverb: {
    id: "proverb",
    name: "乡野谚语",
    shortName: "谚",
    era: "世代口耳相传",
    author: "无名农人",
    nature: "民间俗语",
    bio: "没有署名的田间经验，被一代代农人说出来，也被贾思勰认真写进了书里。",
    color: "gold"
  }
};

export const chapters: Chapter[] = [
  {
    id: "soybean",
    category: "种植",
    volume: "卷二",
    title: "《氾胜之区种大豆法》",
    shortTitle: "大豆点播法",
    question: "种豆子为什么要挖坑，而不是随手撒下去？",
    intro: "一套两千年前的精准播种方案，从坑距、施肥一直算到收成。",
    messages: [
      {
        id: "soy-1",
        speakerId: "fanshengzhi",
        translation: "种大豆，先别急着撒种。挖出方方正正的小坑，宽、深各六寸；坑与坑留出二尺，一亩地正好能排下一千二百八十个。",
        original: "氾胜之區種大豆法：「坎方深各六寸，相去二尺，一畝得千二百八十坎。」",
        terms: [{ word: "坎", category: "农作方法" }, { word: "寸", category: "古代长度" }, { word: "畝", category: "古代面积" }]
      },
      {
        id: "soy-2",
        speakerId: "fanshengzhi",
        translation: "坑挖好了，舀一升上好的肥，跟坑里的土细细拌匀，再填回去。临下种前先把土润透，每个坑浇三升水。",
        original: "「其坎成，取美糞一升，合坎中土攪和，以內坎中。臨種沃之，坎三升水。」",
        terms: [{ word: "升", category: "古代容量" }, { word: "沃", category: "古代农事用语" }]
      },
      {
        id: "soy-3",
        speakerId: "fanshengzhi",
        translation: "每坑放三粒豆种，薄薄盖一层土就够了。再用手掌轻轻按住，让种子和泥土贴紧，别让中间留空。",
        original: "「坎內豆三粒；覆上土，勿厚，以掌抑之，令種與土相親。」",
        terms: [{ word: "抑", category: "古代动作词" }]
      },
      {
        id: "soy-4",
        speakerId: "fanshengzhi",
        translation: "这么种，一个壮劳力能照看五亩。等到秋收，据说一亩能收到十六石，账算得清清楚楚。",
        original: "「丁夫一人，可治五畝。至秋收，一畝中十六石。」",
        terms: [{ word: "丁夫", category: "古代称谓" }, { word: "石", category: "古代容量" }]
      },
      {
        id: "soy-5",
        speakerId: "jia",
        translation: "我把这套旧法完整抄下来，是因为好方法不该随旧书一起失传。尺寸、用量、收成，农人真能照着做，才算有用。",
        original: "今並載之，以備遺法。",
        terms: [{ word: "遺法", category: "文献用语" }]
      }
    ]
  },
  {
    id: "sauce",
    category: "酿造",
    volume: "卷八",
    title: "《作酱法》",
    shortTitle: "晒酱三十日",
    question: "一缸好酱，为什么要晒、要搅，还最怕下雨？",
    intro: "阳光、搅拌和防雨，古人凭经验守住一场看不见的发酵。",
    messages: [
      {
        id: "sauce-1",
        speakerId: "jia",
        translation: "把酱缸敞开口朝天晒着，让日头慢慢把酱香焐出来。老话说“葵菜蔫了，酱要天天晒”，晒到位，味道才好。",
        original: "仰甕口曝之。諺曰：「萎蕤葵，日乾醬。」言其美矣。",
        terms: [{ word: "甕", category: "古代器具" }, { word: "曝", category: "古代动作词" }, { word: "萎蕤", category: "古代词语" }]
      },
      {
        id: "sauce-2",
        speakerId: "proverb",
        translation: "“葵菜打蔫，正是晒酱的时候。”田里的人看一眼草木，就知道今天这缸酱该怎么照料。",
        original: "「萎蕤葵，日乾醬」",
        terms: [{ word: "葵", category: "古代作物" }, { word: "乾醬", category: "酿造用语" }]
      },
      {
        id: "sauce-3",
        speakerId: "jia",
        translation: "头十天可不能偷懒，每天拿耙子从缸底翻搅好几回；十天后，改成一天一次，一直搅满三十天。",
        original: "十日內，每日數度以杷徹底攪之。十日後，每日輒一攪，三十日止。",
        terms: [{ word: "杷", category: "古代工具" }, { word: "輒", category: "古代副词" }]
      },
      {
        id: "sauce-4",
        speakerId: "jia",
        translation: "一下雨就赶紧盖住缸口，一滴雨水也别混进去，进了水容易生虫。雨停以后，记得再从头到尾搅一遍。",
        original: "雨即蓋甕，無令水入。水入則生蟲。每經雨後，輒須一攪。",
        terms: [{ word: "甕", category: "古代器具" }, { word: "輒", category: "古代副词" }]
      }
    ]
  }
];

export const chapterById = (id: string) => chapters.find((chapter) => chapter.id === id);

