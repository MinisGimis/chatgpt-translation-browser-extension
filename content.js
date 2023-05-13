function logElementsWithChineseText(node) {
    const visibleElements = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "a", "span", "div", "li", "td", "strong", "em", "caption", "article", "blockquote", "cite", "code", "em", "i", "label", "pre", "q", "s", "small", "time", "u"];
    if (node.nodeType === Node.ELEMENT_NODE && visibleElements.includes(node.tagName.toLowerCase())) {
        const immediateTextNodes = Array.from(node.childNodes)
            .filter(child => child.nodeType === Node.TEXT_NODE);
        immediateTextNodes.forEach(textNode => {
            const textContent = textNode.textContent.trim();
            const chineseCharacters = textContent.match(/[\u4e00-\u9fa5]/g);
            if (chineseCharacters) {
                console.log(textContent);
            }
        });
    }
    node.childNodes.forEach(logElementsWithChineseText);
}

logElementsWithChineseText(document.body);
