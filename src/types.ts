import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export type Tool = Parameters<typeof McpServer.prototype.registerTool>;
