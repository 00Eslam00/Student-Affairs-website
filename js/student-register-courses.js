document.addEventListener("click", (ele) => {
    ele = ele.target;

    if (ele.tagName.toLowerCase() == "option") {
        if (ele.hasAttribute("selected"))
            ele.removeAttribute("selected");
        else
            ele.setAttribute("selected", "");
    }
});