import { QuoteApiClient } from "@socotra/api";
import { z } from "zod";

import { getHttpClient } from "./httpClient.js";
import { mapMultiple } from "./utils/mapMultiple.js";

import type { Tool } from "./types.js";

export const quoteTools: Tool[] = [
  [
    "get-policy-quotes",
    {
      title: "Get Policy Quotes",
      description: `
    Returns all Policy quotes from Socotra Connected Core for a single policy by a given policy ID.
    This tool allows to retrieve all quotes for certain policy from Socotra's connected core.
    The quotes list will be returned in JSON format.
    
    If errors occur, it probably means that the policy ID is invalid or the policy does not exist.
    
    Example usage: Get quotes for policy with ID of 10000000
        await get-policy-quotes({ policyLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        policyLocator: z
          .number()
          .describe("ID of the policy to retrieve quotes for"),
      },
    },
    async ({ policyLocator }) => {
      const quoteApiClient = new QuoteApiClient(await getHttpClient());
      const quotes = await quoteApiClient.getAll(policyLocator.toString());

      return mapMultiple(quotes);
    },
  ],
  [
    "get-quote",
    {
      title: "Get Quote",
      description: `
      Returns single quote from Socotra Connected Core by a given quote ID.
      This tool allows to retrieve single quote from Socotra's connected core.
      The quote will be returned in JSON format.
      
      If errors occur, it probably means that the quote ID is invalid or the quote does not exist.
      
      Example usage: Get quote with ID of 10000000
          await get-quote({ quoteLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        quoteLocator: z.number().describe("ID of the quote to retrieve"),
      },
    },
    async ({ quoteLocator }) => {
      const quoteApiClient = new QuoteApiClient(await getHttpClient());
      const quote = await quoteApiClient.get(quoteLocator.toString());
      return {
        content: [{ type: "text", text: JSON.stringify(quote) }],
      };
    },
  ],
  [
    "get-quote-price",
    {
      title: "Get Quote Price",
      description: `
      Get the Quote price from Socotra Connected Core by a given quote ID.
      This tool allows to retrieve pricing for a specific quote from Socotra's connected core.
      The pricing response will be returned in JSON format.
      
      If errors occur, it probably means that the quote ID is invalid, the quote does not exist or pricing fails.
      
      Example usage: Get pricing of quote with ID of 10000000
          await get-quote-price({ quoteLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        quoteLocator: z
          .number()
          .describe("ID of the quote to retrieve pricing for"),
      },
    },
    async ({ quoteLocator }) => {
      const quoteApiClient = new QuoteApiClient(await getHttpClient());
      const quotePrice = await quoteApiClient.price(quoteLocator.toString());
      return {
        content: [{ type: "text", text: JSON.stringify(quotePrice) }],
      };
    },
  ],
];
