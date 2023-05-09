export const deBracer = (
  text: string,
  scope: Object,
  errorMessage: string
): string => {
  if (typeof text !== "string") {
    console.error(
      errorMessage,
      " -- deBracer ERROR. Text sent: ",
      text,
      "Scope: ",
      scope
    );
    throw new Error(`Text sent to resolve, not text: ${text}`);
  }

  return text.replace(/\\*\{[a-zA-Z0-9_$]+\}/g, (x) => {
    // If value is matched as "\{variable}" then return "{variable}".
    if (x.charAt(0) === "\\") return x.substring(1);

    // Get the variable, i.e "{variable}" -> "variable".
    const subStr = x.substring(1, x.length - 1);

    // Get the value.
    const value = (scope as any)[subStr];

    // Get a resolved string only value.
    const resolvedValue = (() => {
      if (value === undefined || value === null) return "";
      if (typeof value === "number") return value.toString();
      return value;
    })();
    return deBracer(resolvedValue, scope, errorMessage);
  });
};
