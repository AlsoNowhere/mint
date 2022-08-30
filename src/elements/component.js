
export const component = (
    nodeName,
    componentScope,
    attributes,
    content
) => {
    if (
        typeof nodeName !== "string"
    ) {
        throw new Error("Mint element -- nodeName -- nodeName must be string")
    }

    if (
        !(componentScope instanceof Object)
    ) {
        throw new Error("Mint element -- componentScope -- must be Object or null")
    }

    return {
        nodeName,
        componentScope,
        attributes,
        content,
        id: "__MintComponent"
    }
}
