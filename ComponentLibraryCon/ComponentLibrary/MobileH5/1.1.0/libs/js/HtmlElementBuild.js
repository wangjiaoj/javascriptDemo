class HtmlElementBuild {
    constructor() {

    };
    buildElementText(text) {
        text = text ? text : 'div';
        let textEle = document.createTextNode(text);
        return textEle;
    };
    buildElement(type, className, attributeList) {
        type = type ? type : 'div';
        let div = document.createElement(type);
        if (className) {
            if (typeof className == "string") {
                div.classList.add(className)
            } else {
                className.forEach((item, index) => {
                    div.classList.add(item);
                });
            }
        }
        if (attributeList) {
            attributeList.forEach((item, index) => {
                div.setAttribute(item.name, item.value);
            });
        }
        return div;
    }
    on(target) {

    }
}
export default HtmlElementBuild;