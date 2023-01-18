// import built-in react modules
import { useState, useEffect } from 'react';

// export the function component so that it can be use anywhere
export default function Tree({data}) {

    // set a state for storing the organized treeData
    const [treeData, setTreeData] = useState(null);
    // set a state for toggable list item
    const [nodesState, setNodesState] = useState({});

    // this function will handle the change of state for toggable list item
    const handleClick = (nodeId) => {
        setNodesState({
            ...nodesState,
            [nodeId]: !nodesState[nodeId]
        });
    }

    // organize the data for tree structure
    function buildTree(data, parentId = null) {
        // set an array to store the organize data
        const children = [];

        /* Top level elements will be those who have null parent, 
        if node.parent matches the parentId it will push a new object to the children array containing all the properties of the node
        and children property which is an array, it will then call the buildTree function recursively until it reaches a node which has no child node */
        data.forEach(node => {
            if (node.parent === parentId) {
                children.push({
                    ...node,
                    children: buildTree(data, node.id)
                });
            }
        });

        // return the sorted children array
        return children.sort((a, b) => a.name.localeCompare(b.name));
    }

    // to fetch the territory data on page render
    useEffect(() => {
        setTreeData(buildTree(data));
    }, [data]);

    // render the tree structure
    function renderNode(node) {
        return (
            <li key={node.id}>
                {/* conditional class if it is toggled or not and pass the handleClick function on onClick event */}
                <span  className={ nodesState[node.id] ? "caret caret-down" : "caret"} onClick={() => handleClick(node.id)}>{node.name}</span>
                {/* conditional rendering if the children array of the node is not empty then it will render the nested UL */}
                {node.children && node.children.length > 0 && (
                    <ul className={ nodesState[node.id] ? "active" : "nested"}>
                        {/* sort the children array then check if an element also has a children array that is not empty */}
                        {/* if not empty, it will recursively call the renderNode to render a new LI */}
                        {/* if it is empty, a single LI will be rendered */}
                        {node.children.sort((a, b) => a.name.localeCompare(b.name)).map(child => {
                            return child.children && child.children.length > 0 ?
                                renderNode(child)
                            :
                                <li key={child.id}>{child.name}</li>
                        })}
                    </ul>
                )}
            </li>
        )
    }

    // if the treeData is empty or null it will show this component
    if (!treeData) {
        return <div>Loading...</div>
    }

    // render the component
    return (
        <ul id="myUL">
            {/* use map to apply the renderNode function on each element */}
            {treeData.map(node => renderNode(node))}
        </ul>
    )
}