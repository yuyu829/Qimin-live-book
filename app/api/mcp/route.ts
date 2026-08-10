import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

const server = new Server(
  {
    name: "qimin-live-book-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 工具：节气与农事建议
server.tool(
  "seasonal_farming_advice",
  {
    season: z
      .enum(["spring", "summer", "autumn", "winter"])
      .describe("Current season"),
    question: z.string().describe("User question about farming or seasonal activities"),
  },
  async ({ season, question }) => {
    const adviceMap = {
      spring: "Spring is suitable for plowing, seed preparation, and early sowing.",
      summer: "Summer requires irrigation management, weeding, and crop protection.",
      autumn: "Autumn is the main harvest season and a good time for grain storage.",
      winter: "Winter is suitable for tool maintenance, storage inspection, and planning for the next farming cycle.",
    };

    return {
      content: [
        {
          type: "text",
          text: `【Qimin Yaoshu Seasonal Advisor】

Season: ${season}
Question: ${question}

Advice:
${adviceMap[season]}

According to the principles emphasized in Qimin Yaoshu, successful farming depends on observing seasonal timing, adapting to local soil and climate, and balancing cultivation with storage and resource management.`,
        },
      ],
    };
  }
);

// 可选：健康检查工具
server.tool(
  "book_world_info",
  {
    topic: z.string().describe("Topic related to the interactive book world"),
  },
  async ({ topic }) => {
    return {
      content: [
        {
          type: "text",
          text: `The interactive world of Qimin Live Book focuses on ancient Chinese agricultural culture, seasonal knowledge, food preparation, and immersive educational storytelling. Related topic: ${topic}.`,
        },
      ],
    };
  }
);

export async function POST(req: Request) {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  await server.connect(transport);
  return transport.handleRequest(req);
}