import { EndorsementsApiClient } from "@socotra/api";
import { z } from "zod";

import { getHttpClient } from "./httpClient.js";
import { mapMultiple } from "./utils/mapMultiple.js";

import type { Tool } from "./types.js";

export const endorsementTools: Tool[] = [
  [
    "get-policy-endorsements",
    {
      title: "Get Policy Endorsements",
      description: `
    Returns all Policy endorsements from Socotra Connected Core for a single policy by a given policy ID.
    This tool allows to retrieve all endorsements for certain policy from Socotra's connected core.
    The endorsements list will be returned in JSON format.
    
    If errors occur, it probably means that the policy ID is invalid or the policy does not exist.
    
    Example usage: Get endorsements for policy with ID of 10000000
        await get-policy-endorsements({ policyLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        policyLocator: z
          .number()
          .describe("ID of the policy to retrieve endorsements for"),
      },
    },
    async ({ policyLocator }) => {
      const endorsementApiClient = new EndorsementsApiClient(
        await getHttpClient()
      );
      const endorsements = await endorsementApiClient.getAll(
        policyLocator.toString()
      );

      return mapMultiple(endorsements);
    },
  ],
  [
    "get-endorsement",
    {
      title: "Get Endorsement",
      description: `
      Returns single endorsement from Socotra Connected Core by a given endorsement ID.
      This tool allows to retrieve single endorsement from Socotra's connected core.
      The endorsement will be returned in JSON format.
      
      If errors occur, it probably means that the endorsement ID is invalid or the endorsement does not exist.
      
      Example usage: Get endorsement with ID of 10000000
          await get-endorsement({ endorsementLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        endorsementLocator: z
          .number()
          .describe("ID of the endorsement to retrieve"),
      },
    },
    async ({ endorsementLocator }) => {
      const endorsementApiClient = new EndorsementsApiClient(
        await getHttpClient()
      );
      const endorsement = await endorsementApiClient.get(
        endorsementLocator.toString()
      );
      return {
        content: [{ type: "text", text: JSON.stringify(endorsement) }],
      };
    },
  ],
  [
    "get-endorsement-price",
    {
      title: "Get Endorsement Price",
      description: `
      Get the Endorsement price from Socotra Connected Core by a given endorsement ID.
      This tool allows to retrieve pricing for a specific endorsement from Socotra's connected core.
      The pricing response will be returned in JSON format.
      
      If errors occur, it probably means that the endorsement ID is invalid, the endorsement does not exist or pricing fails.
      
      Example usage: Get pricing of endorsement with ID of 10000000
          await get-endorsement-price({ endorsementLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        endorsementLocator: z
          .number()
          .describe("ID of the endorsement to retrieve pricing for"),
      },
    },
    async ({ endorsementLocator }) => {
      const endorsementApiClient = new EndorsementsApiClient(
        await getHttpClient()
      );
      const endorsementPrice = await endorsementApiClient.price(
        endorsementLocator.toString()
      );
      return {
        content: [{ type: "text", text: JSON.stringify(endorsementPrice) }],
      };
    },
  ],
  [
    "get-endorsement-underwriting-decision",
    {
      title: "Get Endorsement Underwriting Decision",
      description: `
      Get the Endorsement underwriting decision from Socotra Connected Core by a given endorsement ID.
      This tool allows to retrieve underwriting decision for a specific endorsement from Socotra's connected core.
      The underwriting decision will be returned in JSON format.

      If errors occur, it probably means that the endorsement ID is invalid, the endorsement does not exist or underwriting decision retrieval fails.
    
      Example usage: Get underwriting decision of endorsement with ID of 10000000
          await get-endorsement-underwriting-decision({ endorsementLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        endorsementLocator: z
          .number()
          .describe(
            "ID of the endorsement to retrieve underwriting decision for"
          ),
      },
    },
    async ({ endorsementLocator }) => {
      const endorsementApiClient = new EndorsementsApiClient(
        await getHttpClient()
      );
      const underwritingDecision =
        await endorsementApiClient.automatedUnderwritingResult(
          endorsementLocator.toString()
        );
      return {
        content: [{ type: "text", text: JSON.stringify(underwritingDecision) }],
      };
    },
  ],
];
