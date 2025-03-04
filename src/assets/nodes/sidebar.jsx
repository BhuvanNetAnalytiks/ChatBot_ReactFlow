import React from 'react';

const Sidebar = ({ selectedNode }) => {
    if (!selectedNode) {
        return (
            <div style={{ width: '250px', padding: '10px', borderLeft: '1px solid #ddd' }}>
                <p>Select a node to view details</p>
            </div>
        );
    }

    return (
        <div style={{ width: '250px', padding: '10px', borderLeft: '1px solid #ddd' }}>
            <h3>Node Details</h3>
            <p><strong>ID:</strong> {selectedNode.id}</p>
            <p><strong>Type:</strong> {selectedNode.type}</p>
            <p><strong>Position:</strong> ({selectedNode.position.x}, {selectedNode.position.y})</p>
            <h4>Data:</h4>
            <pre>{JSON.stringify(selectedNode.data, null, 2)}</pre>
        </div>
    );
};

export default Sidebar;