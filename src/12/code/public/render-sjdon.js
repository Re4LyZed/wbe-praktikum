const renderSJDON = function (element, appRoot) {

    appRoot.appendChild(elt(element))

    // function elt(..)
    function elt(element) {

        // note: SJDON for functions not implemented

        let eleObj = deserialize(element)

        let node = document.createElement(eleObj.type)

        node.innerHTML = eleObj.value

        for (a in eleObj.attrs) {
            node.setAttribute(a, eleObj.attrs[a])
        }

        for (let child of eleObj.children) {
            node.appendChild(elt(child))
        }

        return node
    }

    // function deserialize(..)
    function deserialize(element) {

        let type = element[0]
        let value = ""
        let attrs = []
        let children = []

        Array.from(element).forEach(element => {
            if (Array.isArray(element)) {
                children.push(element)
            } else if (typeof element === 'object') {
                attrs = { ...attrs, ...element }
            } else if (element != type) {
                value = element
            }
        })

        return { type: type, value: value, attrs: attrs, children: children }
    }
}
