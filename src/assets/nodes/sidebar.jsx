import React from 'react';

const Sidebar = ({ selectedNode, isOpen, toggleSidebar }) => {
    const sidebarStyle = {
        width: isOpen ? '500px' : '0', // Sidebar width when open
        padding: isOpen ? '10px' : '0', // Padding only when open
        position: 'fixed', // Fix sidebar position
        right: 0, // Attach to the right side
        top: 0, // Start from the top
        height: '100vh', // Full height
        backgroundColor: '#fff',
        borderLeft: '1px solid #ddd',
        transition: 'width 0.3s ease', // Smooth transition
        overflowY: 'auto', // Allow scrolling
        boxSizing: 'border-box', // Include padding/border in width calculation
    };

    return (
        <div style={sidebarStyle}>
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
                            <h3>{selectedNode.name}</h3>
                            <h4> ABOUT : </h4>
                            <p>{selectedNode.description}</p>
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
