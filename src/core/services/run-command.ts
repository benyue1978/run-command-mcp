import { execSync } from 'child_process';

/**
 * A simple service for generating greetings
 */
export class RunCommandService {
  /**
   * Run a command
   * @param command The command to run
   * @returns The output of the command
   */
  public static runCommand(command: string): string {
    // execute a command in bash
    const result = execSync(command);
    return result.toString();
  }

} 