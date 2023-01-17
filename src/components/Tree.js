import { useState, useEffect } from 'react';

export default function Tree({data}) {

    const [treeData, setTreeData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    // const dataCopy = data.slice();

    function buildTree(data) {
        // create a map to store the nodes
        const map = new Map();
        data.forEach(node => {
            map.set(node.id, { ...node, children: [] });
        });

        // build the tree
        data.forEach(node => {
            if (node.parent) {
                const parent = map.get(node.parent);
                parent.children.push(node);
            }
        });
        // find the root nodes
        // const rootNodes = data.filter(node => !node.parent);
        // return rootNodes;
        return [...map.values()];
    }
    
    useEffect(() => {
        setTreeData(buildTree(data));
    }, [data]);

    function renderNode(node) {
        if (!node) return null;
        return (
            <li key={node.id}>
                <span className={ isOpen ? "caret caret-down" : "caret"} onClick={handleClick}>{node.name}</span>
                {node.children && node.children.length > 0 && (
                    <ul className={ isOpen ? "active" : "nested"}>
                        {node.children.map(child => renderNode(child))}
                    </ul>
                )}
            </li>
        )
    }

    if (!treeData) {
        return <div>Loading...</div>
    }

    // const rootNodes = Array.from(treeData);
    // console.log(treeData);
    return (
        <ul id="myUL">
            {treeData.map(node => renderNode(node))}
        </ul>
    )
}