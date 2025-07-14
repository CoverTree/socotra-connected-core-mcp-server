#!/usr/bin/env node

import { getAuthenticator, ProfileManager } from "@socotra/auth";
import {
  CancellationsApiClient,
  EndorsementsApiClient,
  HttpClient,
  PolicyApiClient,
  RenewalsApiClient,
  QuoteApiClient,
} from "@socotra/api";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  instructions: `
  # Socotra Connected Core Server

  This server provides access to Socotra's connected core features.
  Socotra is a platform for building insurance applications.
  Any inquiries about insurance naming Socotra should be directed to the server.
  `,
  name: "Socotra Connected Core Server",
  version: "0.1.0",
});

const profileManager = new ProfileManager();

const getHttpClient = async () => {
  const profile = await profileManager.load(process.env.SOCOTRA_PROFILE || "");

  const authenticator = getAuthenticator(profile, false);

  return new HttpClient({
    authenticator,
    uri: process.env.SOCOTRA_API_URL,
  });
};

server.tool(
  "get-policy",
  `
  Get the Policy from Socotra Connected Core by a given policy ID.
  This tool allows to retrieve policy details from Socotra's connected core.
  The policy will be returned in JSON format.
  
  If errors occur, it probably means that the policy ID is invalid or the policy does not exist.
  
  Example usage: Get policy with ID of 10000000
      await get-policy({ policyLocator: 10000000 })`,
  { policyLocator: z.number().describe("ID of the policy to retrieve") },
  {
    title: "Get Policy",
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: true,
  },
  async ({ policyLocator }) => {
    const policyApiClient = new PolicyApiClient(await getHttpClient());
    const policy = await policyApiClient.get(policyLocator.toString());

    return {
      content: [{ type: "text", text: JSON.stringify(policy) }],
    };
  }
);

server.tool(
  "get-policy-price",
  `
  Get the Policy prices from Socotra Connected Core by a given policy ID.
  This tool allows to retrieve pricing for certain policy from Socotra's connected core.
  The pricing response will be returned in JSON format.
  
  If errors occur, it probably means that the policy ID is invalid, the policy does not exist or pricing fails.
  
  Example usage: Get pricing of policy with ID of 10000000
      await get-policy-price({ policyLocator: 10000000 })`,
  {
    policyLocator: z
      .number()
      .describe("ID of the policy to retrieve pricing for"),
  },
  {
    title: "Get Policy Price",
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: true,
  },
  async ({ policyLocator }) => {
    const policyApiClient = new PolicyApiClient(await getHttpClient());
    const policyPrice = await policyApiClient.price(policyLocator.toString());

    return {
      content: [{ type: "text", text: JSON.stringify(policyPrice) }],
    };
  }
);

server.tool(
  "get-policy-quotes",
  `
  Returns all Policy quotes from Socotra Connected Core for a single policy by a given policy ID.
  This tool allows to retrieve all quotes for certain policy from Socotra's connected core.
  The quotes list will be returned in JSON format.
  
  If errors occur, it probably means that the policy ID is invalid or the policy does not exist.
  
  Example usage: Get quotes for policy with ID of 10000000
      await get-policy-quotes({ policyLocator: 10000000 })`,
  {
    policyLocator: z
      .number()
      .describe("ID of the policy to retrieve quotes for"),
  },
  {
    title: "Get Policy Quotes",
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: true,
  },
  async ({ policyLocator }) => {
    const quoteApiClient = new QuoteApiClient(await getHttpClient());
    const quotes = await quoteApiClient.getAll(policyLocator.toString());

    return {
      content: quotes.map((quote) => ({
        type: "text",
        text: JSON.stringify(quote),
      })),
    };
  }
);

server.tool(
  "get-policy-cancellations",
  `
  Returns all Policy cancellations from Socotra Connected Core for a single policy by a given policy ID.
  This tool allows to retrieve all cancellations for certain policy from Socotra's connected core.
  The cancellations list will be returned in JSON format.
  
  If errors occur, it probably means that the policy ID is invalid or the policy does not exist.
  
  Example usage: Get cancellations for policy with ID of 10000000
      await get-policy-cancellations({ policyLocator: 10000000 })`,
  {
    policyLocator: z
      .number()
      .describe("ID of the policy to retrieve cancellations for"),
  },
  {
    title: "Get Policy Cancellations",
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: true,
  },
  async ({ policyLocator }) => {
    const cancellationApiClient = new CancellationsApiClient(
      await getHttpClient()
    );

    const cancellations = await cancellationApiClient.getAll(
      policyLocator.toString()
    );

    return {
      content: cancellations.map((cancellation) => ({
        type: "text",
        text: JSON.stringify(cancellation),
      })),
    };
  }
);

server.tool(
  "get-policy-endorsements",
  `
  Returns all Policy endorsements from Socotra Connected Core for a single policy by a given policy ID.
  This tool allows to retrieve all endorsements for certain policy from Socotra's connected core.
  The endorsements list will be returned in JSON format.
  
  If errors occur, it probably means that the policy ID is invalid or the policy does not exist.
  
  Example usage: Get endorsements for policy with ID of 10000000
      await get-policy-endorsements({ policyLocator: 10000000 })`,
  {
    policyLocator: z
      .number()
      .describe("ID of the policy to retrieve endorsements for"),
  },
  {
    title: "Get Policy Endorsements",
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: true,
  },
  async ({ policyLocator }) => {
    const endorsementApiClient = new EndorsementsApiClient(
      await getHttpClient()
    );

    const endorsements = await endorsementApiClient.getAll(
      policyLocator.toString()
    );

    return {
      content: endorsements.map((endorsement) => ({
        type: "text",
        text: JSON.stringify(endorsement),
      })),
    };
  }
);

server.tool(
  "get-policy-renewals",
  `
  Returns all Policy renewals from Socotra Connected Core for a single policy by a given policy ID.
  This tool allows to retrieve all renewals for certain policy from Socotra's connected core.
  The renewals list will be returned in JSON format.
  
  If errors occur, it probably means that the policy ID is invalid or the policy does not exist.
  
  Example usage: Get renewals for policy with ID of 10000000
      await get-policy-renewals({ policyLocator: 10000000 })`,
  {
    policyLocator: z
      .number()
      .describe("ID of the policy to retrieve renewals for"),
  },
  {
    title: "Get Policy Renewals",
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: true,
  },
  async ({ policyLocator }) => {
    const renewalApiClient = new RenewalsApiClient(await getHttpClient());
    const renewals = await renewalApiClient.getAll(policyLocator.toString());

    return {
      content: renewals.map((renewal) => ({
        type: "text",
        text: JSON.stringify(renewal),
      })),
    };
  }
);

const transport = new StdioServerTransport();
server.connect(transport);
