export type ScienceSource = {
  id: string;
  title: string;
  publisher: string;
  year: number;
  url: string;
};

export type ScienceEvidence = {
  summary: string;
  explanation: string;
  sourceIds: string[];
};

export const scienceSources: Record<string, ScienceSource> = {
  "taro-morphology": {
    id: "taro-morphology",
    title: "Anatomy and Morphology of Taro, Colocasia esculenta",
    publisher: "University of Hawaiʻi Press",
    year: 1983,
    url: "https://doi.org/10.1515/9780824887612-007"
  },
  "taro-agronomy": {
    id: "taro-agronomy",
    title: "Agronomy",
    publisher: "University of Hawaiʻi Press",
    year: 1983,
    url: "https://doi.org/10.1515/9780824887612-011"
  },
  "taro-corm-yield": {
    id: "taro-corm-yield",
    title: "Effect of corm size and plant population density on corm yield of Taro",
    publisher: "International Journal of Advanced Biological and Biomedical Research",
    year: 2015,
    url: "https://doi.org/10.18869/ijabbr.2015.405"
  },
  "taro-organic-manure": {
    id: "taro-organic-manure",
    title: "Augmenting yield of taro through organic manures",
    publisher: "Crop Research",
    year: 2021,
    url: "https://doi.org/10.31830/2454-1761.2021.052"
  },
  "soy-fermentation-review": {
    id: "soy-fermentation-review",
    title: "Soy sauce fermentation: Microorganisms, aroma formation, and process modification",
    publisher: "Food Research International",
    year: 2019,
    url: "https://doi.org/10.1016/j.foodres.2019.03.010"
  },
  "soy-chemistry-review": {
    id: "soy-chemistry-review",
    title: "Chemical and Sensory Characteristics of Soy Sauce: A Review",
    publisher: "Journal of Agricultural and Food Chemistry",
    year: 2020,
    url: "https://doi.org/10.1021/acs.jafc.0c04274"
  },
  "soy-koji": {
    id: "soy-koji",
    title: "Characteristics of Koji Using Liquid Starter for Soy Sauce Production",
    publisher: "Fermentation",
    year: 2023,
    url: "https://doi.org/10.3390/fermentation9110979"
  },
  "soy-moromi-maturity": {
    id: "soy-moromi-maturity",
    title: "A novel method to evaluate the moromi maturity during long-term fermentation",
    publisher: "Food Control",
    year: 2024,
    url: "https://doi.org/10.1016/j.foodcont.2024.110421"
  }
};

export const scienceEvidenceByMessage: Record<string, ScienceEvidence> = {
  "soy-1": { summary: "现代植物学把芋的主要食用膨大器官描述为球茎，而不是通常意义上的根。叶片与球茎大小会受品种和栽培条件共同影响，因此古代字源解释不能直接当作因果机制。", explanation: "《说文》把“大叶”和地下部分肥大连在一起，观察其实挺敏锐：叶片是植物接住阳光、制造养分的主要地方，地下球茎则像一座慢慢充实的粮仓。不过现代植物学会纠正一个小细节——我们吃的主要是球茎，并不是普通意义上的根。叶大也不等于球茎一定大，品种、光照、水肥和病害都会插手。所以这段话更像古人抓住了外形特征来命名，而不是一条严格的生物学定律。", sourceIds: ["taro-morphology"] },
  "soy-2": { summary: "古籍异名反映地方语言和分类传统；仅凭名称不能把“水芋”“乌芋”等稳定等同于某个现代物种，需要结合形态、产地和标本判断。", explanation: "同一种植物走到不同地方，常会换一个名字；反过来，同一个旧名也可能被拿来称呼几种相似植物。《广雅》把“渠”“藉姑”“乌芋”并列保存下来，像给我们留下一张古代方言地图。但只凭两个字，还不能把它们硬套到今天某个确定物种上。现代分类要继续看叶形、球茎、花序、生长水域和标本。古人记录名字的价值，在于让我们看见当时的人怎样辨认和使用植物，而不是替现代植物学直接下结论。", sourceIds: ["taro-morphology"] },
  "soy-3": { summary: "现代芋种质确有明显的球茎大小、分蘖、成熟期和产量差异；种芋大小与种植密度也会影响产量。古代容量和亩产数字不宜直接换算成现代指标。", explanation: "这一长串芋名并不只是“古人爱起名字”。现代芋品种之间，确实会在球茎大小、子芋多少、成熟早晚、颜色和口感上拉开很大差别；种芋大小和栽植密度也会影响最后的收成。古人把“少子但味好”“子多适合高产”分别记下，已经有了按用途选品种的意识。不过“亩收百斛”这类数字要谨慎看：古代亩、斗、斛的制度会变，也缺少今天统一的试验条件，适合看作高产印象，不能直接换算成现代亩产。", sourceIds: ["taro-morphology", "taro-corm-yield"] },
  "soy-4": { summary: "蔓生、球茎形状和侧芽方式可用于描述芋类材料，但古名与现代分类未必一一对应；更稳妥的解释是把它视作古人记录的特殊栽培类型。", explanation: "“蔓生、根如鹅鸭卵”是很典型的田间描述法：不先讲抽象分类，而是告诉你它怎么长、地下部分像什么。现代植物学也会用生长习性、球茎形状和侧芽方式辨别材料，因此这条记录很有形态学价值。不过“博士芋”究竟对应今天哪一种或哪一品系，单靠这句话还认不准。更稳妥的读法，是把它看成一种古人熟悉的特殊栽培类型，而不是急着给它贴上现代学名。", sourceIds: ["taro-morphology"] },
  "soy-5": { summary: "有机物和厩肥能改善养分供应，并可能提高土壤保水与通气；种芋位置、种植密度也会影响球茎形成。但“三尺方坑”的具体尺寸缺少现代对照试验，不能宣称普遍最优。", explanation: "豆萁垫底，湿土和粪铺在上面，像是在坑里做了一层会慢慢腐熟的“土壤夹心”。有机物分解后能补充养分，也可能让土更能保水、又不至于板得太死；四角加中央的摆法，则是在有限空间里安排种芋间距。古人厉害的地方，是把肥、湿、松和株距一起考虑了。不过“三尺方坑”是否处处最好，现代资料并没有给出这样的结论；土质、降雨和品种一换，坑深和密度也应跟着调整。", sourceIds: ["taro-agronomy", "taro-organic-manure", "taro-corm-yield"] },
  "soy-6": { summary: "芋的球茎膨大需要稳定水分、适宜养分和可供根系生长的土壤环境。保持土壤湿润、除草并改善土壤结构有农学依据，但最佳株距和灌水量会随品种、土壤与气候改变。", explanation: "芋头的叶片大，生长期又要不断把养分送进地下球茎，水分忽多忽少时很容易影响生长。因此“肥、松、近水”是一套连在一起的条件：肥土供养分，松土让根系和球茎有舒展空间，近水则方便在干旱时及时补水。勤除草也不是只求地面好看，杂草会抢水、抢肥。只是古书里的“两尺一本”和浇水次数不能原样搬到所有地方，今天仍要看品种、土壤排水和当地气候。", sourceIds: ["taro-agronomy", "taro-corm-yield", "taro-organic-manure"] },
  "soy-7": { summary: "芋是富含淀粉的块茎作物，品种和栽培管理会显著影响单位面积产量，因此可作为多样化食物来源；但《列仙传》的具体预言故事属于历史叙事，现代农学资料不能替它作真实性背书。", explanation: "芋的球茎富含淀粉，能提供较集中的能量，又可以通过选择品种和管理方式取得可观收成，所以古人把它当作备荒作物并不奇怪。多种一种能储藏、能顶饱的作物，也是在给家庭粮食来源多留一条路。不过《列仙传》里“三年后大饥”的预言属于历史故事，现代农学只能说明芋具有粮食和备荒价值，不能替故事本身证明真假。真正值得留下的，是古人对单一粮源风险的警惕。", sourceIds: ["taro-agronomy", "taro-corm-yield"] },
  "soy-8": { summary: "播种月份本质上是在匹配温度、水分和生育期，不能脱离古代地区气候直接套用到今天。腌渍则是另一套加工过程，与田间种植机制应分开解释。", explanation: "“正月菹芋、二月种芋”看着只差一个月，其实说的是两件事：前者是把已有的芋拿来腌渍，后者才是安排下种。农时背后是在等温度、水分和生育期凑到合适窗口，并不是日历翻到二月就到处都能照做。古代使用的还是农历，不同地区气候也相差很大。今天若想参考这条经验，应先看当地霜期、地温和雨水；这段文字真正有趣的，是把芋从田间种植一直连到了家庭保存。", sourceIds: ["taro-agronomy"] },
  "sauce-1": { summary: "发酵容器渗水或混入未经控制的水分，会改变盐度和微生物生态；洁净、完整且便于遮雨的容器有助于降低杂菌污染。古法强调旧瓮用途，现代解释更接近卫生与残留微生物风险。", explanation: "一瓮酱其实是个小小的微生物世界，水多一点、盐淡一点，里面谁占上风都可能改变。渗水的瓮或雨水进入，会稀释局部盐度，也给外来杂菌多一次闯入的机会；盛过醋、腌菜的旧瓮，则可能留下气味、盐分和原来的微生物群。古人没有显微镜，却靠一次次成败把“瓮要完整、要洁净、要防雨”写得很死。现代看，这不是迷信洁癖，而是在管理发酵环境的稳定性。", sourceIds: ["soy-fermentation-review", "soy-chemistry-review"] },
  "sauce-2": { summary: "充分蒸熟可使豆体软化、蛋白质变性，更利于后续曲菌酶作用；翻装能减少大甑内上下受热不均。豆粒大小均匀也有助于热量和水分传递一致。", explanation: "豆子蒸熟，不只是为了变软。加热会让蛋白质结构舒展开，也让后续曲菌产生的酶更容易接近原料、慢慢拆出氨基酸和风味物质。大甑里上层和下层受热并不完全一样，所以蒸到一半重新翻装，相当于给豆子“换座位”，避免一边过熟、一边还夹生。选择大小均匀的春豆也有同样考虑：颗粒越整齐，吸水和受热越同步。古人说的“生熟调均”，正是现代加工里很重要的均一性。", sourceIds: ["soy-fermentation-review", "soy-koji"] },
  "sauce-3": { summary: "复蒸会继续软化豆粒并利于去皮；浸泡液中可能含有从豆中溶出的可溶性滋味物质，所以反复换水可能带走风味。不过“不换汤一定更美”仍属于工艺经验，不是所有现代流程的通则。", explanation: "豆子再蒸一次，会进一步软化种皮和豆体，舂、揉时就更容易把皮分开，又不至于把豆瓣打得太碎。热汤浸泡时，一部分可溶性的糖、氨基酸和滋味成分也会跑进水里；如果不断换汤，确实可能连味道一起倒掉。所以古人宁可添汤、不愿换汤，是在护住原料风味。不过这仍是特定工艺里的经验，并不表示所有豆制品都不能换水，卫生条件和后续用途也要一起考虑。", sourceIds: ["soy-chemistry-review", "soy-fermentation-review"] },
  "sauce-4": { summary: "曲中的微生物和酶负责分解蛋白质、淀粉并形成风味前体；盐度会筛选耐盐微生物并抑制部分腐败菌。盐过少会改变发酵生态，但古代配比不能在不了解原料含水量时直接照搬。", explanation: "曲像是把一支“分解小队”请进了酱缸：其中的微生物和酶会把豆、麦里的蛋白质和淀粉逐步拆开，产生鲜味、甜味和后续香气的原料。盐也不只是调味，它会筛掉一部分不耐盐的腐败菌，让更适合酱醪环境的微生物留下。盐太少，酸味和杂菌风险都可能上升；但盐太多也会拖慢发酵。古书配方很有参考价值，却不能脱离原料含水量和现代计量直接照抄。", sourceIds: ["soy-fermentation-review", "soy-koji", "soy-chemistry-review"] },
  "sauce-5": { summary: "充分混合能让盐、曲和水分分布更均匀，减少局部过咸、过干或污染风险。装填与封闭会改变氧气和微生物环境，但“半瓮难熟”的程度仍与容器、温度和含水量有关。", explanation: "用力揉到“润彻”，目的不是越狠越好，而是让盐、曲和水分真正走到每一处。若一团太咸、一团太干，微生物和酶的工作速度就会参差不齐，还可能留下容易坏的角落。装瓮后压紧、封好，也是在尽量稳定水分和气体环境。古人说半瓮难熟，可能与空隙、温度波动和水分散失有关，但不能简单理解为瓮越满越安全；现代制作仍要给发酵状态和产气留下合适空间。", sourceIds: ["soy-fermentation-review", "soy-koji"] },
  "sauce-6": { summary: "曲块开裂和表面菌丝可反映水分损失与微生物生长，但仅凭“生衣”不能判断安全成熟。长期发酵成熟应综合时间、盐度、酸度、香气与微生物变化。", explanation: "酱坯开裂、离开瓮壁、表面“生衣”，说明水分、结构和微生物生长都在变化，古人把这些外观当作开瓮信号，很像今天用状态而不是只看日历来判断过程。不过表面长出一层东西，并不天然等于“好菌”或已经安全成熟。现代发酵还会综合盐度、酸度、气味、时间和微生物变化来判断。古人的经验可贵在会看、会等，但我们不能把一个外观特征当成唯一安全标准。", sourceIds: ["soy-fermentation-review", "soy-moromi-maturity"] },
  "sauce-7": { summary: "搅拌会改善物料均匀性和气体交换，影响酵母、乳酸菌代谢及香气形成；发酵时间则推动蛋白质和糖类持续转化。雨水进入会稀释盐度并增加污染风险。", explanation: "搅酱不是例行打卡。酱醪放久了会分层，盐、水分、温度和氧气分布都不一样；从底部搅匀，能让各处发酵条件更接近，也会影响酵母、乳酸菌和香气形成。前十天变化快，所以搅得勤；后来系统渐稳，频率才降下来。雨水一进瓮，不只“弄脏”这么简单，还会稀释盐度、打乱原有微生物平衡。至于百日，并非神奇整数，更像古人留给复杂风味慢慢形成的成熟时间。", sourceIds: ["soy-fermentation-review", "soy-chemistry-review", "soy-moromi-maturity"] },
  "sauce-8": { summary: "肉、鱼和豆类发酵的原料、盐度、温度及优势微生物并不相同，不能因都叫“酱”就视作同一安全工艺。古人选择冬季可能利用低温降低腐败和虫害风险，但现代制作仍需独立的食品安全控制。", explanation: "豆酱、肉酱、鱼酱都叫“酱”，里面发生的事却并不一样：原料的蛋白质、脂肪和含水量不同，需要的盐度、温度和优势微生物也会变化。古人偏爱十二月制作，很可能是在借冬季低温压住腐败速度和虫害，为长时间发酵争取安全窗口。但低温并不能替代卫生控制。今天若复原肉酱或鱼酱，不能只凭豆酱经验类推，必须分别考虑原料处理、盐度、温度和食品安全。", sourceIds: ["soy-fermentation-review", "soy-chemistry-review"] }
};

export function scienceEvidenceFor(messageId: string) {
  const evidence = scienceEvidenceByMessage[messageId];
  if (!evidence) return undefined;
  return {
    ...evidence,
    sources: evidence.sourceIds.map((id) => scienceSources[id]).filter(Boolean)
  };
}

export function scienceContextForMessages(messageIds: string[]) {
  return messageIds
    .map((messageId) => scienceEvidenceByMessage[messageId] ? `${messageId}：${scienceEvidenceByMessage[messageId].summary}` : undefined)
    .filter(Boolean)
    .join("\n");
}
