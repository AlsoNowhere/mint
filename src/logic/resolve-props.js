
export const resolveProps = (
    props,
    componentScope,
    parentComponentScope
) => {
    Object.entries(props)
        .forEach(([key, value]) => {
            if (key.substring(0, 2) === "m-") {
                return;
            }
            if (
                key.charAt(0) === "["
                && key.slice(-1) === "]"
            ) {
                const target = key.substring(1, key.length - 1);
                componentScope[target] = parentComponentScope[value];
            }
            else {
                componentScope[key] = value;
            }
        });
}
