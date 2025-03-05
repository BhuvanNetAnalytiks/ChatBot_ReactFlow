// import React from 'react';

// const Sidebar = ({ selectedNode, isOpen, toggleSidebar , setNodes }) => {
//     const sidebarStyle = {
//         width: isOpen ? '500px' : '0', // Sidebar width when open
//         padding: isOpen ? '10px' : '0', // Padding only when open
//         position: 'fixed', // Fix sidebar position
//         right: 0, // Attach to the right side
//         top: 0, // Start from the top
//         height: '100vh', // Full height
//         backgroundColor: '#fff',
//         borderLeft: '1px solid #ddd',
//         transition: 'width 0.3s ease', // Smooth transition
//         overflowY: 'auto', // Allow scrolling
//         boxSizing: 'border-box', // Include padding/border in width calculation
//     };



//     return (
//         <div style={sidebarStyle}>
//             {isOpen && (
//                 <>
//                     <button
//                         onClick={toggleSidebar}
//                         style={{
//                             position: 'absolute',
//                             top: '10px',
//                             right: '10px',
//                             cursor: 'pointer',
//                             border: 'none',
//                             background: 'transparent',
//                             fontSize: '20px',
//                         }}
//                     >
//                         ×
//                     </button>
//                     {selectedNode ? (
//                         <>
//                             <h3>{selectedNode.name}</h3>
//                             <h4> ABOUT : </h4>
//                             <p>{selectedNode.description}</p>
//                         </>
//                     ) : (
//                         <p>Select a node to view details</p>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default Sidebar;


import React, { useState, useEffect } from 'react';

const Sidebar = ({ selectedNode, isOpen, toggleSidebar, setNodes }) => {
  const sidebarStyle = {
    width: isOpen ? '600px' : '0',
    padding: isOpen ? '20px' : '0',
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100vh',
    backgroundColor: '#fff',
    borderLeft: '1px solid #ddd',
    transition: 'width 0.3s ease',
    overflowY: 'auto',
    boxSizing: 'border-box',
  };

  const [greetingInput, setGreetingInput] = useState('');
  const [newDepartment, setNewDepartment] = useState('');

  // Sync local state with selectedNode when it changes
  useEffect(() => {
    if (selectedNode) {
      setGreetingInput(selectedNode.data?.greeting || '');
      setNewDepartment(selectedNode.data?.newDepartment || '');
    }
  }, [selectedNode]);

  const updateNodeData = (nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  };

  const handleGreetingChange = (e) => {
    const value = e.target.value;
    setGreetingInput(value);
    updateNodeData(selectedNode.id, { greeting: value });
  };

  const handleTicketingChange = (e) => {
    const value = e.target.value;
    updateNodeData(selectedNode.id, { selected: value });
  };

  const handleAuthChange = (e) => {
    const value = e.target.value;
    updateNodeData(selectedNode.id, { selected: value });
  };

  const handleAddDepartment = () => {
    if (newDepartment.trim()) {
      updateNodeData(selectedNode.id, {
        departments: [...selectedNode.data.departments, newDepartment.trim()],
        newDepartment: '',
      });
      setNewDepartment('');
    }
  };

  const handleRemoveDepartment = (index) => {
    updateNodeData(selectedNode.id, {
      departments: selectedNode.data.departments.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="sidebar" style={sidebarStyle}> {/* Add className */}
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
              <h4>ABOUT:</h4>
              <p>{selectedNode.description}</p>
              <hr />

              {selectedNode.type === 'greetingNode' && (
                <div>
                  <h4>Greeting Message</h4>
                  <input
                    type="text"
                    value={greetingInput}
                    onChange={handleGreetingChange}
                    placeholder="Enter greeting message"
                    style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
                  />
                </div>
              )}

              {selectedNode.type === 'departmentNode' && (
                <div>
                  <h4>Departments</h4>
                  <ul>
                    {selectedNode.data.departments.map((dept, index) => (
                      <li key={index}>
                        {dept}{' '}
                        <button
                          onClick={() => handleRemoveDepartment(index)}
                          style={{ color: 'red', marginLeft: '10px' }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    placeholder="Add new department"
                    style={{ width: '70%', padding: '5px', marginRight: '10px' }}
                  />
                  <button onClick={handleAddDepartment}>Add</button>
                </div>
              )}

              {selectedNode.type === 'ticketingNode' && (
                <div>
                  <h4>Select Ticketing System</h4>
                  <select
                    value={selectedNode.data.selected}
                    onChange={handleTicketingChange}
                    style={{ width: '100%', padding: '5px' }}
                  >
                    <option value="ServiceNow">ServiceNow</option>
                    <option value="Jira">Jira</option>
                    <option value="Zendesk">Zendesk</option>
                  </select>
                </div>
              )}

              {selectedNode.type === 'authenticationNode' && (
                <div>
                  <h4>Select Identity Provider</h4>
                  <select
                    value={selectedNode.data.selected}
                    onChange={handleAuthChange}
                    style={{ width: '100%', padding: '5px' }}
                  >
                    <option value="Azure">Azure</option>
                    <option value="Google">Google</option>
                    <option value="Okta">Okta</option>
                  </select>
                </div>
              )}
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