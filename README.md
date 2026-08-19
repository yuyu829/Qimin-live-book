# 齐民要术 · 活书世界

移动端优先的互动阅读 Demo：让《齐民要术》里的古代农书、贾思勰和民间谚语以“群聊”形式重新开口。

## 当前功能

- 封面 -> 兴趣选择 -> 推荐章节 -> 章节阅读 -> 齐民村地图
- 种植篇《种芋第十六》
- 酿造篇《作酱等法第七十》
- 逐条点击出现的聊天消息
- 发言人来源资料卡
- 正文右侧动态术语浮窗
- 真实 AI 科学解释、术语解释和章节问答
- 学堂一句话经验留言墙
- `localStorage` 保存进度和留言

## 开发

```powershell
npm install
npm run dev
```

打开 http://localhost:3000。

## AI 配置

在 `.env.local` 中配置官方 OpenAI API Key：

```env
OPENAI_API_KEY=your_key
OPENAI_BASE_URL=https://api.openai-next.com/v1
OPENAI_MODEL=gpt-5
```

三类请求统一由 `app/api/qimin/route.ts` 处理。没有 Key 时会显示明确错误，不伪造 AI 结果。

## 图片资产

将生成好的 WebP 图片放入 `public/art/`，文件名和尺寸见 [public/art/README.md](public/art/README.md)。图片缺失时页面使用代码绘制的备用画面。

## 产品文档

完整产品需求、数据结构、范围边界和验收标准见 [PRD.md](PRD.md)。
