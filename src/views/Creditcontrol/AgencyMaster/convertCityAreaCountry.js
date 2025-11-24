export function convertCityAreaCountry(obj1) {
    const obj2 = []

    function traverse(node) {
        const newNode = {
            key: node.CountryCode.toString(),
            label: node.CountryName.trim(),
        }

        if (node.children && node.children.length > 0) {
            newNode.children = node.children.map((child) => {
                const childNode = traverse2(node, child)
                return {
                    key: `${newNode.key}-${childNode.key}`,
                    label: childNode.label,
                    ...(childNode.children &&
                        childNode.children.length > 0 && {
                            children: childNode.children,
                        }),
                }
            })
        }

        return newNode
    }
    function traverse2(parent, node) {
        const newNode = {
            key: node.StateCode.toString(),
            label: node.StateName.trim(),
        }

        if (node.children && node.children.length > 0) {
            newNode.children = node.children.map((child) => {
                const childNode = traverse3(child)
                return {
                    key: `${parent.CountryCode}-${newNode.key}-${childNode.key}`,
                    label: childNode.label,
                    ...(childNode.children &&
                        childNode.children.length > 0 && {
                            children: childNode.children,
                        }),
                }
            })
        }

        return newNode
    }

    function traverse3(node) {
        const newNode = {
            key: node.PlaceCode.toString(),
            label: node.PlaceName.trim(),
        }

        if (node.children && node.children.length > 0) {
            newNode.children = node.children.map((child) => {
                const childNode = traverse(child)
                return {
                    key: `${newNode.key}-${childNode.key}`,
                    label: childNode.label,
                    ...(childNode.children &&
                        childNode.children.length > 0 && {
                            children: childNode.children,
                        }),
                }
            })
        }

        return newNode
    }

    obj1.forEach((country) => {
        const countryNode = traverse(country)
        // obj2[countryNode.key] = countryNode;
        obj2.push(countryNode)
    })

    return obj2
}
