import { CancellationsApiClient } from "@socotra/api";
import { z } from "zod";

import { getHttpClient } from "./httpClient.js";
import { mapMultiple } from "./utils/mapMultiple.js";

import type { Tool } from "./types.js";

export const cancellationTools: Tool[] = [
  [
    "get-policy-cancellations",
    {
      title: "Get Policy Cancellations",
      description: `
      Returns all Policy cancellations from Socotra Connected Core for a single policy by a given policy ID.
      This tool allows to retrieve all cancellations for certain policy from Socotra's connected core.
      The cancellations list will be returned in JSON format.
      
      If errors occur, it probably means that the policy ID is invalid or the policy does not exist.
      
      Example usage: Get cancellations for policy with ID of 10000000
          await get-policy-cancellations({ policyLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        policyLocator: z
          .number()
          .describe("ID of the policy to retrieve cancellations for"),
      },
    },
    async ({ policyLocator }) => {
      const cancellationApiClient = new CancellationsApiClient(
        await getHttpClient()
      );

      const cancellations = await cancellationApiClient.getAll(
        policyLocator.toString()
      );

      return mapMultiple(cancellations);
    },
  ],
  [
    "get-cancellation",
    {
      title: "Get Cancellation",
      description: `
      Returns single cancellations from Socotra Connected Core by a given cancellation ID.
      This tool allows to retrieve single cancellation from Socotra's connected core.
      The cancellation will be returned in JSON format.
      
      If errors occur, it probably means that the cancellation ID is invalid or the cancellation does not exist.
      
      Example usage: Get cancellation with ID of 10000000
          await get-cancellation({ cancellationLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        cancellationLocator: z
          .number()
          .describe("ID of the cancellation to retrieve"),
      },
    },
    async ({ cancellationLocator }) => {
      const cancellationApiClient = new CancellationsApiClient(
        await getHttpClient()
      );

      const cancellation = await cancellationApiClient.get(
        cancellationLocator.toString()
      );

      return {
        content: [{ type: "text", text: JSON.stringify(cancellation) }],
      };
    },
  ],
  [
    "get-cancellation-price",
    {
      title: "Get Cancellation Price",
      description: `
      Get the Cancellation price from Socotra Connected Core by a given cancellation ID.
      This tool allows to retrieve pricing for a specific cancellation from Socotra's connected core.
      The pricing response will be returned in JSON format.
      
      If errors occur, it probably means that the cancellation ID is invalid, the cancellation does not exist or pricing fails.
      
      Example usage: Get pricing of cancellation with ID of 10000000
          await get-cancellation-price({ cancellationLocator: 10000000 })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        cancellationLocator: z
          .number()
          .describe("ID of the cancellation to retrieve pricing for"),
      },
    },
    async ({ cancellationLocator }) => {
      const cancellationApiClient = new CancellationsApiClient(
        await getHttpClient()
      );
      const cancellationPrice = await cancellationApiClient.price(
        cancellationLocator.toString()
      );
      return {
        content: [{ type: "text", text: JSON.stringify(cancellationPrice) }],
      };
    },
  ],
];
