import { PolicyApiClient } from "@socotra/api";
import { z } from "zod";

import { getHttpClient } from "./httpClient.js";

import type { Tool } from "./types.js";

export const policyTools: Tool[] = [
  [
    "get-policy",
    {
      title: "Get Policy",
      description: `
    Get the Policy from Socotra Connected Core by a given policy ID.
    This tool allows to retrieve policy details from Socotra's connected core.
    The policy will be returned in JSON format.
    
    If errors occur, it probably means that the policy ID is invalid or the policy does not exist.
    
    Example usage: Get policy with ID of 10000000
        await get-policy({ policyLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        policyLocator: z.number().describe("ID of the policy to retrieve"),
      },
    },
    async ({ policyLocator }) => {
      const policyApiClient = new PolicyApiClient(await getHttpClient());
      const policy = await policyApiClient.get(policyLocator.toString());

      return {
        content: [{ type: "text", text: JSON.stringify(policy) }],
      };
    },
  ],
  [
    "get-policy-price",
    {
      title: "Get Policy Price",
      description: `
    Get the Policy prices from Socotra Connected Core by a given policy ID.
    This tool allows to retrieve pricing for certain policy from Socotra's connected core.
    The pricing response will be returned in JSON format.
    
    If errors occur, it probably means that the policy ID is invalid, the policy does not exist or pricing fails.
    
    Example usage: Get pricing of policy with ID of 10000000
        await get-policy-price({ policyLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        policyLocator: z
          .number()
          .describe("ID of the policy to retrieve pricing for"),
      },
    },
    async ({ policyLocator }) => {
      const policyApiClient = new PolicyApiClient(await getHttpClient());
      const policyPrice = await policyApiClient.price(policyLocator.toString());

      return {
        content: [{ type: "text", text: JSON.stringify(policyPrice) }],
      };
    },
  ],
  [
    "get-policy-underwriting-decision",
    {
      title: "Get Policy Underwriting Decision",
      description: `
    Get the Policy underwriting decision from Socotra Connected Core by a given policy ID.
    This tool allows to retrieve underwriting decision for a specific policy from Socotra's connected core.
    The underwriting decision will be returned in JSON format.

    If errors occur, it probably means that the policy ID is invalid, the policy does not exist or underwriting decision retrieval fails.
  
    Example usage: Get underwriting decision of policy with ID of 10000000
        await get-policy-underwriting-decision({ policyLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        policyLocator: z
          .number()
          .describe("ID of the policy to retrieve underwriting decision for"),
      },
    },
    async ({ policyLocator }) => {
      const policyApiClient = new PolicyApiClient(await getHttpClient());
      const underwritingDecision =
        await policyApiClient.automatedUnderwritingResult(
          policyLocator.toString()
        );

      return {
        content: [{ type: "text", text: JSON.stringify(underwritingDecision) }],
      };
    },
  ],
];
