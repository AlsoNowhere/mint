
export const resolveIf = (
    scope,
    rootElement,
    _ifValue,
    mintElement
) => {
    const inverse = _ifValue.charAt(0) === "!";
    const ifValue = inverse ? _ifValue.substring(1) : _ifValue;
    const state = scope[ifValue];
    return {
        state: inverse ? !state : !!state,
        rootElement,
        ifValue,
        mintElement,
        templated: inverse ? !state : !!state,
        scope,
        inverse
    }
}
