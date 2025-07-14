import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

/**
 * Maps an array of items to a CallToolResultSchema format.
 * @param arr
 */
export const mapMultiple = <T>(arr: T[]): CallToolResult => ({
  content: arr.map((item) => ({
    type: "text",
    text: JSON.stringify(item),
  })),
});
