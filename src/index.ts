#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { auxDataTools } from "./auxData.js";
import { cancellationTools } from "./cancellation.js";
import { endorsementTools } from "./endorsement.js";
import { policyTools } from "./policy.js";
import { quoteTools } from "./quote.js";
import { renewalTools } from "./renewal.js";

const server = new McpServer({
  instructions: `
  # Socotra Connected Core Server

  This server provides access to Socotra's connected core features.
  Socotra is a platform for building insurance applications.
  Any inquiries about insurance naming Socotra should be directed to the server.
  
  ## Important
  - If you see the error of type 409 or 422 - respond to the user with the error content.
  `,
  name: "Socotra Connected Core Server",
  version: "0.2.0",
});

auxDataTools.forEach((tool) => server.registerTool(...tool));
cancellationTools.forEach((tool) => server.registerTool(...tool));
endorsementTools.forEach((tool) => server.registerTool(...tool));
policyTools.forEach((tool) => server.registerTool(...tool));
quoteTools.forEach((tool) => server.registerTool(...tool));
renewalTools.forEach((tool) => server.registerTool(...tool));

const transport = new StdioServerTransport();
server.connect(transport);
