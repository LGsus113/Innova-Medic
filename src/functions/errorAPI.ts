export function throwApiError(message: string): never {
  throw new Error(message);
}
