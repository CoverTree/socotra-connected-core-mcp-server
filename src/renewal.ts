import { RenewalsApiClient } from "@socotra/api";
import { z } from "zod";

import { getHttpClient } from "./httpClient.js";
import { mapMultiple } from "./utils/mapMultiple.js";

import type { Tool } from "./types.js";

export const renewalTools: Tool[] = [
  [
    "get-renewals",
    {
      title: "Get Renewals",
      description: `
    Get the Renewals from Socotra Connected Core by a given policy ID.
    This tool allows to retrieve renewal details from Socotra's connected core.
    The renewals will be returned in JSON format.
    
    If errors occur, it probably means that the policy ID is invalid or the policy does not exist.
    
    Example usage: Get renewals for policy with ID of 10000000
        await get-renewals({ policyLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        policyLocator: z
          .number()
          .describe("ID of the policy to retrieve renewals for"),
      },
    },
    async ({ policyLocator }) => {
      const renewalsApiClient = new RenewalsApiClient(await getHttpClient());
      const renewals = await renewalsApiClient.getAll(policyLocator.toString());

      return mapMultiple(renewals);
    },
  ],
  [
    "get-renewal",
    {
      title: "Get Renewal",
      description: `
      Returns single renewal from Socotra Connected Core by a given renewal ID.
      This tool allows to retrieve single renewal from Socotra's connected core.
      The renewal will be returned in JSON format.
      
      If errors occur, it probably means that the renewal ID is invalid or the renewal does not exist.
      
      Example usage: Get renewal with ID of 10000000
          await get-renewal({ renewalLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        renewalLocator: z.number().describe("ID of the renewal to retrieve"),
      },
    },
    async ({ renewalLocator }) => {
      const renewalsApiClient = new RenewalsApiClient(await getHttpClient());
      const renewal = await renewalsApiClient.get(renewalLocator.toString());
      return {
        content: [{ type: "text", text: JSON.stringify(renewal) }],
      };
    },
  ],
  [
    "get-renewal-price",
    {
      title: "Get Renewal Price",
      description: `
      Get the Renewal price from Socotra Connected Core by a given renewal ID.
      This tool allows to retrieve pricing for a specific renewal from Socotra's connected core.
      The pricing response will be returned in JSON format.
      
      If errors occur, it probably means that the renewal ID is invalid, the renewal does not exist or pricing fails.
      
      Example usage: Get pricing of renewal with ID of 10000000
          await get-renewal-price({ renewalLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        renewalLocator: z
          .number()
          .describe("ID of the renewal to retrieve pricing for"),
      },
    },
    async ({ renewalLocator }) => {
      const renewalsApiClient = new RenewalsApiClient(await getHttpClient());
      const renewalPrice = await renewalsApiClient.price(
        renewalLocator.toString()
      );
      return {
        content: [{ type: "text", text: JSON.stringify(renewalPrice) }],
      };
    },
  ],
  [
    "get-renewal-underwriting-decision",
    {
      title: "Get Renewal Underwriting Decision",
      description: `
      Get the Renewal underwriting decision from Socotra Connected Core by a given renewal ID.
      This tool allows to retrieve underwriting decision for a specific renewal from Socotra's connected core.
      The underwriting decision will be returned in JSON format.

      If errors occur, it probably means that the renewal ID is invalid, the renewal does not exist or underwriting decision retrieval fails.
    
      Example usage: Get underwriting decision of renewal with ID of 10000000
          await get-renewal-underwriting-decision({ renewalLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        renewalLocator: z
          .number()
          .describe("ID of the renewal to retrieve underwriting decision for"),
      },
    },
    async ({ renewalLocator }) => {
      const renewalsApiClient = new RenewalsApiClient(await getHttpClient());
      const underwritingDecision =
        await renewalsApiClient.automatedUnderwritingResult(
          renewalLocator.toString()
        );
      return {
        content: [{ type: "text", text: JSON.stringify(underwritingDecision) }],
      };
    },
  ],
];
