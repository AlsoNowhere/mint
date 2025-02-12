exports.clearApp = (element = document.body) => {
  while (element.childNodes.length > 0) {
    element.removeChild(element.childNodes[element.childNodes.length - 1]);
  }
};
