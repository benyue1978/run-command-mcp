import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as services from "./services/index";

/**
 * Register all tools with the MCP server
 * 
 * @param server The MCP server instance
 */
export function registerTools(server: McpServer) {
  // Greeting tool
  server.tool(
    "run_command",
    "Run a shell command",
    {
      name: z.string().describe("command to run")
    },
    async (params: { name: string }) => {
      const greeting = services.RunCommandService.runCommand(params.name);
      return {
        content: [
          {
            type: "text",
            text: greeting
          }
        ]
      };
    }
  );
}