export type ScienceSource = {
  id: string;
  title: string;
  publisher: string;
  year: number;
  url: string;
};

export type ScienceEvidence = {
  summary: string;
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
  "soy-1": { summary: "现代植物学把芋的主要食用膨大器官描述为球茎，而不是通常意义上的根。叶片与球茎大小会受品种和栽培条件共同影响，因此古代字源解释不能直接当作因果机制。", sourceIds: ["taro-morphology"] },
  "soy-2": { summary: "古籍异名反映地方语言和分类传统；仅凭名称不能把“水芋”“乌芋”等稳定等同于某个现代物种，需要结合形态、产地和标本判断。", sourceIds: ["taro-morphology"] },
  "soy-3": { summary: "现代芋种质确有明显的球茎大小、分蘖、成熟期和产量差异；种芋大小与种植密度也会影响产量。古代容量和亩产数字不宜直接换算成现代指标。", sourceIds: ["taro-morphology", "taro-corm-yield"] },
  "soy-4": { summary: "蔓生、球茎形状和侧芽方式可用于描述芋类材料，但古名与现代分类未必一一对应；更稳妥的解释是把它视作古人记录的特殊栽培类型。", sourceIds: ["taro-morphology"] },
  "soy-5": { summary: "有机物和厩肥能改善养分供应，并可能提高土壤保水与通气；种芋位置、种植密度也会影响球茎形成。但“三尺方坑”的具体尺寸缺少现代对照试验，不能宣称普遍最优。", sourceIds: ["taro-agronomy", "taro-organic-manure", "taro-corm-yield"] },
  "soy-6": { summary: "芋的球茎膨大需要稳定水分、适宜养分和可供根系生长的土壤环境。保持土壤湿润、除草并改善土壤结构有农学依据，但最佳株距和灌水量会随品种、土壤与气候改变。", sourceIds: ["taro-agronomy", "taro-corm-yield", "taro-organic-manure"] },
  "soy-7": { summary: "芋是富含淀粉的块茎作物，品种和栽培管理会显著影响单位面积产量，因此可作为多样化食物来源；但《列仙传》的具体预言故事属于历史叙事，现代农学资料不能替它作真实性背书。", sourceIds: ["taro-agronomy", "taro-corm-yield"] },
  "soy-8": { summary: "播种月份本质上是在匹配温度、水分和生育期，不能脱离古代地区气候直接套用到今天。腌渍则是另一套加工过程，与田间种植机制应分开解释。", sourceIds: ["taro-agronomy"] },
  "sauce-1": { summary: "发酵容器渗水或混入未经控制的水分，会改变盐度和微生物生态；洁净、完整且便于遮雨的容器有助于降低杂菌污染。古法强调旧瓮用途，现代解释更接近卫生与残留微生物风险。", sourceIds: ["soy-fermentation-review", "soy-chemistry-review"] },
  "sauce-2": { summary: "充分蒸熟可使豆体软化、蛋白质变性，更利于后续曲菌酶作用；翻装能减少大甑内上下受热不均。豆粒大小均匀也有助于热量和水分传递一致。", sourceIds: ["soy-fermentation-review", "soy-koji"] },
  "sauce-3": { summary: "复蒸会继续软化豆粒并利于去皮；浸泡液中可能含有从豆中溶出的可溶性滋味物质，所以反复换水可能带走风味。不过“不换汤一定更美”仍属于工艺经验，不是所有现代流程的通则。", sourceIds: ["soy-chemistry-review", "soy-fermentation-review"] },
  "sauce-4": { summary: "曲中的微生物和酶负责分解蛋白质、淀粉并形成风味前体；盐度会筛选耐盐微生物并抑制部分腐败菌。盐过少会改变发酵生态，但古代配比不能在不了解原料含水量时直接照搬。", sourceIds: ["soy-fermentation-review", "soy-koji", "soy-chemistry-review"] },
  "sauce-5": { summary: "充分混合能让盐、曲和水分分布更均匀，减少局部过咸、过干或污染风险。装填与封闭会改变氧气和微生物环境，但“半瓮难熟”的程度仍与容器、温度和含水量有关。", sourceIds: ["soy-fermentation-review", "soy-koji"] },
  "sauce-6": { summary: "曲块开裂和表面菌丝可反映水分损失与微生物生长，但仅凭“生衣”不能判断安全成熟。长期发酵成熟应综合时间、盐度、酸度、香气与微生物变化。", sourceIds: ["soy-fermentation-review", "soy-moromi-maturity"] },
  "sauce-7": { summary: "搅拌会改善物料均匀性和气体交换，影响酵母、乳酸菌代谢及香气形成；发酵时间则推动蛋白质和糖类持续转化。雨水进入会稀释盐度并增加污染风险。", sourceIds: ["soy-fermentation-review", "soy-chemistry-review", "soy-moromi-maturity"] },
  "sauce-8": { summary: "肉、鱼和豆类发酵的原料、盐度、温度及优势微生物并不相同，不能因都叫“酱”就视作同一安全工艺。古人选择冬季可能利用低温降低腐败和虫害风险，但现代制作仍需独立的食品安全控制。", sourceIds: ["soy-fermentation-review", "soy-chemistry-review"] }
};

export function scienceEvidenceFor(messageId: string) {
  const evidence = scienceEvidenceByMessage[messageId];
  if (!evidence) return undefined;
  return {
    ...evidence,
    sources: evidence.sourceIds.map((id) => scienceSources[id]).filter(Boolean)
  };
}
