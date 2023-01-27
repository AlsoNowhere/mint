export const deBracer = (text: string, scope: Object): string => {
  if (typeof text !== "string") {
    console.error("deBracer ERROR. Text sent: ", text, "Scope: ", scope);
    throw new Error(`Text sent to resolve, not text: ${text}`);
  }

  return text.replace(/\\*\{[a-zA-Z0-9_$]+\}/g, (x) => {
    if (x.charAt(0) === "\\") return x.substring(1);
    const subStr = x.substring(1, x.length - 1);
    const value = (scope as any)[subStr];
    const resolvedValue = typeof value === "number" ? value.toString() : value;
    return deBracer(resolvedValue, scope);
  });
};
