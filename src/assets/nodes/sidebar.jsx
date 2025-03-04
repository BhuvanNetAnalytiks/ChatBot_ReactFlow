import React from 'react';
 
const Sidebar = ({ selectedNode, isOpen, toggleSidebar }) => {
    const sidebarStyle = {
        width: isOpen ? '250px' : '0', // Full width when open
        minWidth: isOpen ? '250px' : '0', // Ensure minimum width
        padding: isOpen ? '10px' : '0', // Padding only when open
        borderLeft: '1px solid #ddd',
        transition: 'width 0.3s ease', // Smooth transition
        overflowY: 'auto', // Allow scrolling if content overflows
        overflowX: 'hidden', // Prevent horizontal overflow
        backgroundColor: '#fff',
        height: '100%', // Full height
        flexShrink: 0, // Prevent sidebar from shrinking
        position: 'relative',
        boxSizing: 'border-box', // Include padding/border in width calculation
    };
 
    return (
        <div className="sidebar" style={sidebarStyle}>
            {isOpen && (
                <>
                    <button
                        onClick={toggleSidebar}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            cursor: 'pointer',
                            border: 'none',
                            background: 'transparent',
                            fontSize: '20px',
                        }}
                    >
                        ×
                    </button>
                    {selectedNode ? (
                        <>
                            <h3>Node Details</h3>
                            <p><strong>ID:</strong> {selectedNode.id}</p>
                            <p><strong>Type:</strong> {selectedNode.type}</p>
                            <p><strong>Position:</strong> ({selectedNode.position.x}, {selectedNode.position.y})</p>
                            <h4>Data:</h4>
                            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                {JSON.stringify(selectedNode.data, null, 2)}
                            </pre>
                        </>
                    ) : (
                        <p>Select a node to view details</p>
                    )}
                </>
            )}
        </div>
    );
};
 
export default Sidebar;