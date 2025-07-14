# socotra-connected-core-mcp-server

The MCP Server, which allows to connect to the Socotra Connected Core platform.

# Installation

1. First you need to install the `socotra-profile` utility, which is used to manage profiles for the Socotra Connected Core platform. You can install it globally using npm:

   ```bash
   npm install -g socotra-profile
   ```
2. Next, you need to create a profile for your Socotra Connected Core instance. You can do this by running the following command:

   ```bash
    socotra-profile create <name of profile>
    ```
3. Follow the prompts to enter the necessary information for your Socotra Connected Core instance, such as the API URL and authentication details.
4. Once you have created the profile, you can edit the MCP Servers configuration of your client, adding:

```json
{
  "mcpServers": {
    "socotra": {
      "command": "npx",
      "args": ["-y", "socotra-connected-core-mcp-server"],
      "env": {
        "SOCOTRA_PROFILE": "<name of profile configured via socotra-profile utility>",
        "SOCOTRA_API_URL": "<Base URL of Socotra Connected Core API>"
      }
    }
  }
}
```

# Supported features

Currently, the MCP Server supports read-only operations for subset of resources.
