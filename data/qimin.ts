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
    title: "《種芋第十六》",
    shortTitle: "种芋法",
    question: "芋头为什么要深埋、勤浇，还要靠豆萁保湿？",
    intro: "从字源、品种到种法和救荒，古人把芋头的一整套门道都写进了这一卷。",
    messages: [
      {
        id: "soy-1",
        speakerId: "jia",
        translation: "《说文》说，芋头叶子大、根实也大，长得叫人一惊，所以叫“芋”；齐地的人则称它为“莒”。",
        original: "《说文》曰：“芋，大叶实根骇人者，故谓之‘芋’。”“齐人呼芋为‘莒’。”",
        terms: [{ word: "芋", category: "古代作物" }, { word: "莒", category: "地方称谓" }]
      },
      {
        id: "soy-2",
        speakerId: "jia",
        translation: "《广雅》又补充：芋还有“渠”“藉姑”等叫法，水里长的芋也叫乌芋。",
        original: "《广雅》曰：“渠，芋；其茎谓之。”“藉姑，水芋也，亦曰乌芋。”",
        terms: [{ word: "渠", category: "芋的别称" }, { word: "藉姑", category: "水芋别称" }, { word: "乌芋", category: "水芋别称" }]
      },
      {
        id: "soy-3",
        speakerId: "jia",
        translation: "《广志》记了芋头的百般品种：有的芋魁大如斗、像杵；有的子多，有的少子却味道最好。",
        original: "《广志》曰：“蜀汉既繁芋，民以为资。凡十四等：有君子芋，大如斗，魁如杵，有车毂芋，有锯子芋，有旁巨芋，有青边芋：此四芋多子。有谈善芋，魁大如瓶，少子；叶如散盖，绀色；紫茎，长丈馀；易熟，味长，芋之最善者也；茎可作羹臛，肥涩，得饮乃下。有蔓芋，缘枝生，大者次二三升。有鸡子芋，色黄。有百果芋，魁大，子繁多，亩收百斛；种以百亩，以养彘。有早芋，七月熟。有九面芋，大而不美。有象空芋，大而弱，使人易饥。有青芋，有素芋，子皆不可食，茎可为菹。凡此诸芋，皆可干腊。又可藏至夏食之。又百子芋，出叶俞县。有魁芋，无旁子，生永昌县。有大芋，二升，出范阳、新郑。”",
        terms: [{ word: "芋魁", category: "芋头主块茎" }, { word: "斛", category: "古代容量" }, { word: "羹臛", category: "古代菜肴" }]
      },
      {
        id: "soy-4",
        speakerId: "jia",
        translation: "《风土记》说，博士芋顺着藤蔓生长，根块像鹅蛋、鸭蛋那么大。",
        original: "《风土记》曰：“博士芋，蔓生，根如鹅、鸭卵。”",
        terms: [{ word: "博士芋", category: "芋头品种" }, { word: "蔓生", category: "生长方式" }]
      },
      {
        id: "soy-5",
        speakerId: "fanshengzhi",
        translation: "《氾胜之书》的种法很讲究：方坑深宽各三尺，先铺豆萁踩实，再把湿土和粪拌匀铺上，浇水保湿；五颗芋子放在四角和中央，再踩一遍。",
        original: "《汜胜之书》曰：“种芋，区方深皆三尺。取豆萁内区中，足践之，厚尺五寸。取区上湿土与粪和之，内区中萁上，令厚尺二寸，以水浇之，足践令保泽。取五芋子置四角及中央，足践之。旱，数浇之。萁烂。芋生子，皆长三尺。一区收三石。”",
        terms: [{ word: "区", category: "种植方坑" }, { word: "豆萁", category: "豆类秸秆" }, { word: "三石", category: "古代容量" }]
      },
      {
        id: "soy-6",
        speakerId: "fanshengzhi",
        translation: "另一种办法是选肥松又近水的地，和土施肥，二月雨水足时下种，每两尺一株。芋头根要深，旁边的土要松；天旱就浇，长草就锄，勤快些收成常能翻倍。",
        original: "“又种芋法：宜择肥缓土近水处，和柔，粪之。二月注雨，可种芋。率二尺下一本。芋生根欲深，其旁以缓其土。旱则浇之。有草锄之，不厌数多。治芋如此，其收常倍。”",
        terms: [{ word: "肥缓土", category: "土壤条件" }, { word: "注雨", category: "雨水充足" }, { word: "一本", category: "一株" }]
      },
      {
        id: "soy-7",
        speakerId: "jia",
        translation: "《列仙传》讲过一个救荒故事：酒客预言三年后大饥，便让梁国百姓多种芋，后来果然靠芋头活了下来。贾思勰感叹，明知芋头能度过凶年，怎么能不督促种植？",
        original: "《列仙传》曰：“酒客为梁，使丞烝民益种芋：‘三年当大饥。’卒如其言，梁民不死。”〔按芋可以救饥馑，度凶年。今中国多不以此为意，后至有耳目所不闻见者。及水、旱、风、虫、霜、雹之灾，便能饿死满道，白骨交横。知而不种，坐致泯灭，悲夫！人君者，安可不督课之哉？〕",
        terms: [{ word: "饥馑", category: "灾荒" }, { word: "度凶年", category: "渡过荒年" }, { word: "督课", category: "督促农事" }]
      },
      {
        id: "soy-8",
        speakerId: "jia",
        translation: "崔寔说，正月就可以把芋头腌成菹；《家政法》则说，二月可以种芋。一个说吃法，一个说农时，都是芋头的生活门道。",
        original: "崔寔曰：“正月，可菹芋。”《家政法》曰：“二月可种芋也。”",
        terms: [{ word: "菹", category: "腌渍做法" }, { word: "家政法", category: "古代生活书" }]
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
