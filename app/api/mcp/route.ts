import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";

function createMcpServer() {
  const server = new McpServer({
    name: "qimin-live-book-mcp",
    version: "1.0.0",
  });

  // 工具 1：节气农事建议
  server.registerTool(
    "seasonal_farming_advice",
    {
      title: "Seasonal Farming Advice",
      description: "Provide farming advice inspired by Qimin Yaoshu",
      inputSchema: {
        season: z.enum(["spring", "summer", "autumn", "winter"]),
        question: z.string(),
      },
    },
    async ({ season, question }) => {
      const adviceMap = {
        spring:
          "Spring is suitable for plowing, seed preparation, and sowing.",
        summer:
          "Summer requires irrigation management and crop protection.",
        autumn:
          "Autumn is the main harvest season and suitable for grain storage.",
        winter:
          "Winter is suitable for tool maintenance and planning for the next farming cycle.",
      };

      return {
        content: [
          {
            type: "text",
            text: `Season: ${season}

Question: ${question}

Advice: ${adviceMap[season]}`,
          },
        ],
      };
    }
  );

  // 工具 2：书籍世界信息
  server.registerTool(
    "book_world_info",
    {
      title: "Book World Information",
      description:
        "Return information about the Qimin Live Book interactive world",
      inputSchema: {
        topic: z.string(),
      },
    },
    async ({ topic }) => {
      return {
        content: [
          {
            type: "text",
            text: `Qimin Live Book focuses on ancient Chinese agricultural culture, seasonal knowledge, food preparation, and immersive educational storytelling. Topic: ${topic}.`,
          },
        ],
      };
    }
  );

  return server;
}

export async function POST(req: Request) {
  const server = createMcpServer();

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  await server.connect(transport);

  return await transport.handleRequest(req);
}