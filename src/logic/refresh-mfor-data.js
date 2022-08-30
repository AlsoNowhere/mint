
export const refreshmForData = (templateScope, newData) => {

    Object.keys(templateScope).forEach(key => {
        if (key === "_i" || key === "_x") {
            return;
        }
        if (!Object.prototype.hasOwnProperty.apply(newData, [key])) {
            delete templateScope[key];
        }
    });

    Object.keys(newData).forEach(key => {
        if (key === "_i" || key === "_x") {
            return;
        }
        templateScope[key] = newData[key];
    });

}
