import ReactHtmlParser from 'react-html-parser';
export function onScrollElementAtParentElement(childClass, parentClass, offset) {
    var _a;
    if (!offset) {
        offset = 0;
    }
    let childElement = document.querySelector(childClass);
    let parentElement = document.querySelector(parentClass);
    let isMobileScreen = window.innerWidth <= 768;
    if (childElement && parentElement) {
        let sHeight = (_a = childElement.getBoundingClientRect()) === null || _a === void 0 ? void 0 : _a.x;
        parentElement.scrollTo({ top: sHeight + (isMobileScreen ? 0 : sHeight / 3) + offset, behavior: 'smooth' });
    }
}
export function onScrollToElement(childClass, offset) {
    if (!offset) {
        offset = 0;
    }
    let childElement = document.querySelector(childClass);
    let isMobileScreen = window.innerWidth <= 768;
    if (childElement) {
        window.scrollTo({ top: childElement.scrollHeight + (isMobileScreen ? 0 : childElement.clientHeight / 3) + offset, behavior: 'smooth' });
    }
}
export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
export function stringToHtml(str) {
    return ReactHtmlParser(str.replace(/<o:p>/g, '').replace(/<\/o:p>/, ''));
}
