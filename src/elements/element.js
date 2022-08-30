
export const element = (

    // String or { name: string, as: string }
    nameComponentOrFunction,

    // Object
    attributesOrProps,

    // Array of elements or single element
    content
) => {


    if (
        typeof nameComponentOrFunction !== "string"
        && !(nameComponentOrFunction instanceof Function)
        && nameComponentOrFunction.id !== "__MintComponent"
    ) {
        throw new Error("Mint element -- nameComponentOrFunction -- first argument must be string or Component")
    }

    if (
        attributesOrProps !== undefined
        && (
            !(attributesOrProps instanceof Object)
            && attributesOrProps !== null
        )
    ) {
        throw new Error("Mint element -- attributesOrProps -- second argument must be Object or null")
    }

    if (
        content !== undefined
        && typeof content !== "string"
        && content.id !== "__MintElement"
        && (
            content instanceof Array && content.reduce((a, b) => a || (b.id !== "__MintElement" && typeof b !== "string"), false)
        )
    ) {
        throw new Error("Mint element -- content -- must be Array of elements or single element")
    }

    const output = {
        content,
        id: "__MintElement"
    };

    if (typeof nameComponentOrFunction === "string") {
        output.nodeName = nameComponentOrFunction;
    }
    else {
        output.component = nameComponentOrFunction;
    }

    if (typeof nameComponentOrFunction === "string") {
        output.attributes = attributesOrProps;
    }
    else {
        output.props = attributesOrProps;
    }

    return output;
}
