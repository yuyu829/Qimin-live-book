# 齐民要术 · 活书世界

移动端优先的互动阅读应用。项目把《齐民要术》的古籍原文、农谚与贾思勰的整理转化为卡片对谈、现代科学解释和农事小游戏，让用户在阅读、提问与操作中理解古人的生活经验。

## 当前版本

- 封面、序言加载页、偏好设定、章节推荐、章节阅读、齐民村地图和村口学堂完整流程
- 《种芋》和《做酱》两个章节，支持卡片堆叠阅读、阅读全文与单条发言详情
- 卡片右滑、游戏右滑/下滑的首次手势引导
- 现代科学解释会在当前卡片出现时预加载，详情页可手动重新生成
- 长科学解释自动按完整语句分段，并显示可靠资料来源
- 详情页支持继续追问，问答气泡显示在科学资料下方
- “教书先生”可根据当前章节原文、译文与资料回答自由问题
- 本地词语小辞典优先展示人工注释，缺失内容再请求 AI
- 种芋小游戏：选地、挖地、放芋、浇水与芋头喵解锁
- 做酱小游戏：选豆、蒸豆、去皮、配方、入缸、搅拌、发酵与做酱喵解锁
- 农活喵图鉴根据小游戏进度显示已解锁或待解锁状态
- 村口学堂保持一行两列经验贴，内容增多后可纵向滚动
- 两首背景音乐在整个 App 生命周期持续顺序播放，支持淡入、交叉淡化与全局静音
- `localStorage` 保存已读章节、小游戏图鉴解锁状态和学堂留言

## 本地运行

需要 Node.js 18.18 或更高版本。

```powershell
npm install
npm run dev
```

终端会显示实际访问地址。默认是 `http://localhost:3000`；如果端口已占用，Next.js 会自动使用其他端口。

常用命令：

```powershell
npm test
npm run build
npm start
```

## 云端 AI 配置

在项目根目录创建或修改 `.env.local`：

```env
OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-4o-mini
# 使用兼容 OpenAI API 的服务时再填写；官方接口可删除此行
OPENAI_BASE_URL=https://api.openai.com/v1
```

修改环境变量后需要停止并重新运行 `npm run dev`。浏览器中的平台登录账号、ChatGPT/Codex 会话额度与本项目读取的 API Key 不是同一套凭据；项目只读取 `.env.local`。

所有请求由 `app/api/qimin/route.ts` 在服务端转发，Key 不会发送到浏览器。当前包含四种调用：

- `science`：结合当前卡片的现代科学资料生成解释
- `science-followup`：围绕当前卡片继续追问
- `term`：解释古籍词语
- `question`：教书先生回答章节问题

科学解释以项目内维护的 16 张卡片资料库为依据，再由模型组织成自然、有温度的回答。当前卡片进入顶层时会预加载；失败的请求不会缓存，详情页右侧的重载按钮可重新调用。

## 素材替换

- 页面插画、章节 GIF、小游戏图片与视频：`public/art/`
- 全局背景音乐：`public/audio/Music1.mp3`、`public/audio/Music2.mp3`
- 完整文件名、用途和建议尺寸：[public/art/README.md](public/art/README.md)

素材文件名属于页面接口，替换时保持名称不变即可，无需修改组件代码。

## 数据与代码位置

- 章节原文、译文和人物：`data/qimin.ts`
- 词语注释：`data/qimin-glossary.ts`
- 现代科学资料库与引用：`data/science-evidence.ts`
- AI 提示词：`lib/qimin-prompts.ts`
- AI 接口：`app/api/qimin/route.ts`
- 主交互页面：`app/page.tsx`

更完整的产品范围和验收标准见 [PRD.md](PRD.md)。

面向展示和普通用户的产品简介、完整操作说明见 [APP_GUIDE.md](APP_GUIDE.md)。
