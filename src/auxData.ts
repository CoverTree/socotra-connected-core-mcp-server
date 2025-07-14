import { AuxDataApiClient } from "@socotra/api";
import { z } from "zod";

import { getHttpClient } from "./httpClient.js";
import { mapMultiple } from "./utils/mapMultiple.js";

import type { Tool } from "./types.js";

export const auxDataTools: Tool[] = [
  [
    "get-aux-data-keys",
    {
      title: "Get Aux Data Keys",
      description: `
    Returns all Aux Data keys from Socotra Connected Core for given ID.
    This tool allows to retrieve all available Aux Data keys from Socotra's connected core for given ID.
    The keys list will be returned in JSON format.
    
    If errors occur, it probably means that the request failed or there are no Aux Data keys available.
    
    Example usage: Get all Aux Data keys
        await get-aux-data-keys({ id: "some-id" })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        id: z.string().describe("ID for which to retrieve Aux Data keys"),
        page: z
          .number()
          .optional()
          .default(0)
          .describe("Page number for pagination"),
      },
    },
    async ({ id, page }) => {
      const auxDataApiClient = new AuxDataApiClient(await getHttpClient());

      const auxDataKeys = await auxDataApiClient.listKeys({
        locator: id,
        page,
      });

      return mapMultiple(auxDataKeys.keys);
    },
  ],
  [
    "get-single-aux-data-value",
    {
      title: "Get Single Aux Data Value",
      description: `
      Returns a single Aux Data value from Socotra Connected Core for given ID and key.
      This tool allows to retrieve a specific Aux Data value from Socotra's connected core.
      The value will be returned in JSON format.
      If errors occur, it probably means that the request failed or the Aux Data key does not exist for the given ID.
      Example usage: Get Aux Data value for ID "some-id" and key "some-key":
          await get-single-aux-data-value({ id: "some-id, key: "some-key" })`,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      inputSchema: {
        id: z.string().describe("ID for which to retrieve Aux Data keys"),
        key: z.string().describe("Aux Data key to retrieve value for"),
      },
    },
    async ({ id, key }) => {
      const auxDataApiClient = new AuxDataApiClient(await getHttpClient());

      const auxDataValue = await auxDataApiClient.retrieve({
        locator: id,
        key,
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(auxDataValue),
          },
        ],
      };
    },
  ],
];
