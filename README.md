# 《流俗地：街角记忆博物馆》

一个为 **Bring a Book to Life / 让一本书鲜活起来** 黑客松设计的 MVP：基于黎紫书《流俗地》的灵感，打造“空间记忆叙事 Agent”。

它不是小说摘要器，也不是和角色闲聊的工具，而是让用户成为街区记忆的整理者：点击一条南洋老街上的地点，读取物件、家书、时代回声，并向不同年代的普通人追问那些没能说出口的话。

## MVP 范围

- 1 条老街
- 3 个地点：旧咖啡店、杂货铺、巴士站
- 3 位记忆人物：林伯（1965）、美珍（1988）、阿豪（2003）
- 本地 JSON 记忆库，不使用复杂数据库
- 无 API Key 时可离线演示；配置 `OPENAI_API_KEY` 后，人物对话会优先使用 Vercel AI SDK 生成

## 技术栈

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui 风格组件
- Vercel AI SDK
- 本地 JSON 数据

## 运行方法

```bash
npm install
npm run dev
```

打开浏览器访问：

```txt
http://localhost:3000
```

可选：启用真实模型生成。

```bash
OPENAI_API_KEY=你的_key npm run dev
```

Windows PowerShell:

```powershell
$env:OPENAI_API_KEY="你的_key"
npm run dev
```

## 项目目录

```txt
.
├── app
│   ├── api/agent/route.ts
│   ├── location/[id]/page.tsx
│   ├── street/page.tsx
│   ├── timeline/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── ui
│   ├── app-nav.tsx
│   ├── location-experience.tsx
│   ├── memory-counter.tsx
│   ├── street-map.tsx
│   └── timeline-unlocks.tsx
├── data/memories.json
├── lib
│   ├── agents
│   │   ├── character-agent.ts
│   │   ├── letter-reflection-agent.ts
│   │   └── street-memory-agent.ts
│   ├── memory.ts
│   ├── types.ts
│   └── utils.ts
├── public/locations
│   ├── bus-stop.svg
│   ├── grocery.svg
│   └── kopitiam.svg
├── package.json
├── tailwind.config.ts
└── README.md
```

## 三个 Agent

### StreetMemoryAgent

作为旁白介绍当前位置，连接不同人物记忆，控制整体情绪节奏。语气克制、温柔、有纪录片感。

### CharacterAgent

每个人物包含年份、背景、已知信息、隐藏情绪和说话风格。回答严格限制在人物年份之前，不剧透未来，默认控制在 80 到 150 字左右。

### LetterReflectionAgent

围绕家书输出三层内容：

- 信中写下的话
- 可能没写出口的话
- 这封信反映的时代压力

同一封信支持三种阅读视角：作为儿子、作为父亲、作为离乡者。

## 3 分钟 Demo 演示脚本

**0:00 - 0:30 首页**

“这是《流俗地：街角记忆博物馆》。我们没有把书做成角色聊天，而是把一块土地做成会记忆人的空间。用户不是旁观者，而是街区记忆的整理者。”

点击「进入街区」。

**0:30 - 1:10 街区地图**

“MVP 严格控制在一条老街、三个地点：旧咖啡店、杂货铺、巴士站。每个地点对应一个年代和一位普通人。右上角会记录已经收集的记忆数量。”

点击「旧咖啡店」。

**1:10 - 2:00 旧咖啡店与家书 Agent**

“这里是 1965 年。左侧是地点图像，中间是记忆碎片、家书和时代回声。家书 Agent 会把同一封信拆成三层：写下的话、没写出口的话、时代压力。”

依次点击「作为儿子」「作为父亲」「作为离乡者」。

“同一封信会因为阅读视角不同而变化。它不编造秘密，只做克制推断：比如‘不用担心’背后可能是疲惫、汇款压力和东亚家庭里报喜不报忧的习惯。”

**2:00 - 2:35 人物 Agent**

在右侧点击问题：“你为什么不告诉家人真实情况？”

“人物 Agent 只知道自己所在年份以前的信息。林伯不会知道 1988 年的杂货铺，也不会知道 2003 年的巴士站。他回答时会用生活细节，而不是抽象总结。”

**2:35 - 3:00 时间轴**

回到时间轴页。

“当用户解锁更多地点，时间轴会把 1965、1988、2003 串起来。评委看到的不是小说摘要，而是迁徙、照护、离开这些普通人的压力如何在同一条街上回响。”

收尾：

“我们希望体验结束时，用户感觉自己不是读完一本小说，而是在一条真实存在过的南洋老街里，听完几个普通人一生中最想说却没能说出口的话。”
