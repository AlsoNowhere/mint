
// Alternative regexp (no negative look behind).
// /\{[a-zA-Z0-9_$]+\}/g

// Optional slash
// /\*\{[a-zA-Z0-9_$]+\}/g

// Negative look behind
// /(?<!\\){[a-zA-Z0-9_$]+}/g

export const resolveBraces = (text, scope) => {
    return text.replace(/\\*\{[a-zA-Z0-9_$]+\}/g, x => {
        if (x.charAt(0) === "\\") {
            return x.substring(1);
        }
        return scope[x.substring(1, x.length-1)];
    });
}
