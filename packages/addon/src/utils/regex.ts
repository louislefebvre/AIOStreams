import { isMatch, firstMatch } from 'super-regex';

const DEFAULT_TIMEOUT = 1000; // 1 second timeout

/**
 * Safely tests a regex pattern against a string with ReDoS protection
 * @param pattern The regex pattern to test
 * @param str The string to test against
 * @param timeoutMs Optional timeout in milliseconds (default: 1000ms)
 * @returns boolean indicating if the pattern matches the string
 */
export function safeRegexTest(
  pattern: RegExp,
  str: string,
  timeoutMs: number = DEFAULT_TIMEOUT
): boolean {
  try {
    return isMatch(pattern, str, { timeout: timeoutMs });
  } catch (error) {
    console.error(`Regex test timed out after ${timeoutMs}ms:`, error);
    return false;
  }
}

/**
 * Safely extracts the first match from a string using a regex pattern with ReDoS protection
 * @param pattern The regex pattern to use
 * @param str The string to search in
 * @param timeoutMs Optional timeout in milliseconds (default: 1000ms)
 * @returns The first match or undefined if no match or timeout
 */
export function safeRegexMatch(
  pattern: RegExp,
  str: string,
  timeoutMs: number = DEFAULT_TIMEOUT
): string | undefined {
  try {
    const match = firstMatch(pattern, str, { timeout: timeoutMs });
    return match?.match;
  } catch (error) {
    console.error(`Regex match timed out after ${timeoutMs}ms:`, error);
    return undefined;
  }
}

/**
 * Safely extracts all matches from a string using a regex pattern with ReDoS protection
 * @param pattern The regex pattern to use
 * @param str The string to search in
 * @param timeoutMs Optional timeout in milliseconds (default: 1000ms)
 * @returns Array of matches or empty array if no matches or timeout
 */
export function safeRegexMatches(
  pattern: RegExp,
  str: string,
  timeoutMs: number = DEFAULT_TIMEOUT
): string[] {
  try {
    const matches = Array.from(pattern[Symbol.matchAll](str));
    return matches.map((m) => m[0]);
  } catch (error) {
    console.error(`Regex matches timed out after ${timeoutMs}ms:`, error);
    return [];
  }
}
