import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * Register all prompts with the MCP server
 * @param server The MCP server instance
 */
export function registerPrompts(server: McpServer) {
  // Example prompt
  server.prompt(
    "run_command",
    "Run a shell command",
    {
      name: z.string().describe("command to run")
    },
    (params: { name: string }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Run the command: ${params.name}`
        }
      }]
    })
  );
}
