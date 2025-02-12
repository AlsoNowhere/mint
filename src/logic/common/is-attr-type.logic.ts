// ** This function returns if a string matches the provided start and end characters.
// ** E.g 1
// ** str = "[class]"
// ** matches isAttrType(str, "[", "]")

// ** E.g 2
// ** str = "(click)"
// ** matches isAttrType(str, "(", ")")
export const isAttrType = (attr: string, start: string, end: string) => {
  return attr.charAt(0) === start && attr.charAt(attr.length - 1) === end;
};
