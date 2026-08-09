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
    title: "《作酱等法第七十》",
    shortTitle: "蒸豆作酱法",
    question: "从蒸豆、拌料到晒足百日，古人怎样守成一缸好酱？",
    intro: "择时、蒸豆、配盐曲、封瓮、解酱与日晒，每一步都写得细密而具体。",
    messages: [
      {
        id: "sauce-1",
        speakerId: "jia",
        translation: "做酱最好选腊月、正月，其次二月，三月最晚。酱瓮必须不渗水，也不能用腌过菜或盛过醋的旧瓮；把它放在日照充足的高处石上，夏雨时尤其别让水泡到瓮底。",
        original: "十二月、正月為上時，二月為中時，三月為下時。用不津甕，甕津則壞醬。嘗為菹、酢者，亦不中用之。置日中高處石上。夏雨，無令水浸甕底。",
        terms: [{ word: "津甕", category: "渗水的陶瓮" }, { word: "菹", category: "腌菜" }, { word: "酢", category: "醋" }]
      },
      {
        id: "sauce-2",
        speakerId: "jia",
        translation: "选春播的小黑豆，豆粒小而均匀。先在大甑里蒸，蒸汽上来半日后倒出重装，把原来在上面的换到底下，才能生熟均匀；再用灰保温过夜，直到豆子里面发黄、外色极黑，才晒干备用。",
        original: "用春種烏豆，春豆粒小而均，晚豆粒大而雜。於大甑中燥蒸之。氣餾半日許，復貯出更裝之，迴在上者居下，不爾，則生熟不調均也。氣餾周遍，以灰覆之，經宿無令火絕。齧看：豆黃色黑極熟，乃下，日曝取乾。",
        terms: [{ word: "烏豆", category: "黑豆" }, { word: "甑", category: "古代蒸器" }, { word: "氣餾", category: "蒸汽透出" }]
      },
      {
        id: "sauce-3",
        speakerId: "jia",
        translation: "临舂豆去皮前还要再蒸一次，这样舂时豆瓣不易碎，也更容易簸净。用热汤浸豆、揉去黑皮时，只能添汤，不能换汤，否则豆味流失，做出的酱就不美；淘豆的汤还能拿来煮碎豆，做随吃的小酱。",
        original: "臨欲舂去皮，更裝入甑中蒸，令氣餾則下，一日曝之。明旦起，淨簸擇，滿臼舂之而不碎。若不重餾，碎而難淨。作熱湯，於大盆中浸豆黃。良久，淘汰，挼去黑皮，湯少則添，慎勿易湯；易湯則走失豆味，令醬不美也。淘豆湯汁，即煮碎豆作醬，以供旋食。",
        terms: [{ word: "舂", category: "臼中捣击" }, { word: "挼", category: "揉搓" }, { word: "旋食", category: "随做随吃" }]
      },
      {
        id: "sauce-4",
        speakerId: "jia",
        translation: "白盐、黄蒸、草蒿子和麦曲都要预先晒得极干。三斗豆黄配一斗曲末、一斗黄蒸末、五升白盐和三指一撮草蒿子；盐少了会发酸，之后再补盐也救不回原来的美味。",
        original: "預前，日曝白鹽、黃蒸、草●、麥麴，令極乾燥。鹽色黃者發醬苦，鹽若潤濕令醬壞。黃蒸令醬赤美。草●令醬芬芳。大率豆黃三斗，麴末一斗，黃蒸末一斗，白鹽五升，●子三指一撮。鹽少令醬酢；後雖加鹽，無復美味。",
        terms: [{ word: "黃蒸", category: "制酱辅料" }, { word: "麥麴", category: "麦制发酵曲" }, { word: "斗", category: "古代容量" }]
      },
      {
        id: "sauce-5",
        speakerId: "jia",
        translation: "把豆、盐、曲在盆里拌匀，用手反复揉到处处润透，再装进瓮里按紧，必须尽量装满，半瓮反而难熟。最后盖严、用泥密封，不能让气漏出去。",
        original: "三種量訖，於盆中面向「太歲」和之。攪令均調，以手痛挼，皆令潤徹。亦面向「太歲」內著甕中，手挼令堅，以滿為限；半則難熟。盆蓋，密泥，無令漏氣。",
        terms: [{ word: "太歲", category: "古代岁神方位" }, { word: "痛挼", category: "用力揉拌" }, { word: "密泥", category: "以泥密封" }]
      },
      {
        id: "sauce-6",
        speakerId: "jia",
        translation: "封好的酱坯按月份等待：腊月约三十五天，正月、二月约二十八天，三月约二十一天。开瓮时应当块面纵横开裂、四周离瓮并生满菌衣；取出捏碎，再加入澄清盐水和黄蒸浸出的汁，调到薄粥般稠度。",
        original: "熟便開之，臘月五七日，正月、二月四七日，三月三七日。當縱橫裂，周迴離甕，徹底生衣。悉貯出，搦破塊，兩甕分為三甕。日未出前汲井花水，於盆中以燥鹽和之，率一石水，用鹽三斗，澄取清汁。又取黃蒸於小盆內減鹽汁浸之，挼取黃瀋，漉去滓。合鹽汁瀉著甕中。鹽水多少，亦無定方，醬如薄粥便止。",
        terms: [{ word: "五七日", category: "三十五日" }, { word: "生衣", category: "表面形成菌衣" }, { word: "井花水", category: "清晨初汲井水" }]
      },
      {
        id: "sauce-7",
        speakerId: "proverb",
        translation: "把瓮口朝上敞开日晒，正所谓“葵菜晒蔫的日头，最能晒出好酱”。头十天每天从底部搅几次，之后每天一次，满三十天才停；下雨立即盖瓮，雨后再搅。解酱二十天后可以吃，但足一百天才真正成熟。",
        original: "仰甕口曝之。諺曰：「萎蕤葵，日乾醬。」言其美矣。十日內，每日數度以杷徹底攪之。十日後，每日輒一攪，三十日止。雨即蓋甕，無令水入。水入則生蟲。每經雨後，輒須一攪。解後二十日堪食；然要百日始熟耳。",
        terms: [{ word: "萎蕤葵", category: "晒蔫的葵菜" }, { word: "杷", category: "搅酱工具" }, { word: "解醬", category: "加盐水调开酱坯" }]
      },
      {
        id: "sauce-8",
        speakerId: "jia",
        translation: "这一篇不只记豆酱，还收了肉酱、快速肉酱、鱼酱、干刀鱼酱、麦酱、榆子酱、虾酱、鱼肠酱和藏蟹等做法。鱼酱、肉酱最好在十二月制作，才能过夏不生虫；其他月份也能做，却不易久藏。",
        original: "肉醬法：牛、羊、、鹿、兔肉皆得作。作魚醬法：鯉魚、鯖魚第一好；鱧魚亦中。凡作魚醬、肉醬，皆以十二月作之，則經夏無蟲。餘月亦得作，但喜生蟲，不得度夏耳。《食經》作麥醬法。作榆子醬法。作蝦醬法。作鱁鮧法，蓋魚腸醬也。藏蟹法。",
        terms: [{ word: "鱁鮧", category: "鱼肠酱" }, { word: "經夏", category: "度过夏季" }, { word: "藏蟹", category: "盐蓼汁腌蟹法" }]
      }
    ]
  }
];

export const chapterById = (id: string) => chapters.find((chapter) => chapter.id === id);
