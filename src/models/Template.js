
export const Template = function(
    elementOrText,
    attributesOrTextValue,
    scope
){
    this.element = elementOrText;
    if (elementOrText instanceof Text) {
        this.textValue = attributesOrTextValue;
    }
    else {
        this.attributes = attributesOrTextValue;
    }
    this.scope = scope;
}
