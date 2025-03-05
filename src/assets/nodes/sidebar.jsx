import React, { useState, useEffect } from 'react';

const Sidebar = ({ selectedNode, isOpen, toggleSidebar, setNodes, setEdges }) => {
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
    const [ticketingSelected, setTicketingSelected] = useState('');
    const [vectordatabseSelected, setVectordatabseSelected] = useState('');
    const [authSelected, setAuthSelected] = useState('');
    const [departments, setDepartments] = useState([]);
    const [newNodeType, setNewNodeType] = useState('');

    useEffect(() => {
        if (selectedNode) {
            setGreetingInput(selectedNode.data?.greeting || '');
            setNewDepartment(selectedNode.data?.newDepartment || '');
            setTicketingSelected(selectedNode.data?.selected || 'ServiceNow');
            setAuthSelected(selectedNode.data?.selected || 'Azure');
            setVectordatabseSelected(selectedNode.data?.selected || 'Milvus');
            setDepartments(selectedNode.data?.departments || []);
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
        setTicketingSelected(value);
        updateNodeData(selectedNode.id, { selected: value });
    };

    const handleVectordatabseChange = (e) => {
        const value = e.target.value;
        setVectordatabseSelected(value);
        updateNodeData(selectedNode.id, { selected: value });
    };

    const handleAuthChange = (e) => {
        const value = e.target.value;
        setAuthSelected(value);
        updateNodeData(selectedNode.id, { selected: value });
    };

    const handleAddDepartment = () => {
        if (newDepartment.trim()) {
            const updatedDepartments = [...departments, newDepartment.trim()];
            setDepartments(updatedDepartments);
            updateNodeData(selectedNode.id, {
                departments: updatedDepartments,
                newDepartment: '',
            });
            setNewDepartment('');
        }
    };

    const handleRemoveDepartment = (index) => {
        const updatedDepartments = departments.filter((_, i) => i !== index);
        setDepartments(updatedDepartments);
        updateNodeData(selectedNode.id, { departments: updatedDepartments });
    };

    const handleAddNewNode = () => {
        if (!selectedNode || !newNodeType) return;

        const nodeTypesMap = {
            greetingNode: { name: 'GREETING', description: 'Generate a greeting message' },
            departmentNode: { name: 'DEPARTMENT', description: 'Select department' },
            ticketingNode: { name: 'TICKETING', description: 'Select ticketing system' },
            authenticationNode: { name: 'IDENTITY PROVIDER', description: 'Select identity provider' },
            MilvusDatabaseNode: { name: 'MILVUS DATABASE', description: 'Query database' },
            Responsenode: { name: 'RESPONSE', description: 'Generate response' },
            GladMessageNode: { name: 'GLAD MESSAGE', description: 'Generate positive message' },
            LLM: { name: 'LLM', description: 'Generate LLM response' },
            incidentCreation: { name: 'INCIDENT CREATION', description: 'Create incident' },
            DynamicNode: { name: 'CUSTOM NODE', description: 'Custom department node' }
        };

        const newNodeId = `${newNodeType}-${Date.now()}`;
        const newNodeConfig = nodeTypesMap[newNodeType] || nodeTypesMap['DynamicNode'];

        const newNode = {
            id: newNodeId,
            type: newNodeType,
            position: {
                x: selectedNode.position.x + 300,
                y: selectedNode.position.y
            },
            data: {
                name: newNodeConfig.name,
                description: newNodeConfig.description,
                id: newNodeId,
                onOptions: selectedNode.data.onOptions // Inherit the options handler
            }
        };

        // Add the new node
        setNodes((nds) => [...nds, newNode]);

        // Add edge connecting the selected node (source) to the new node (target)
        setEdges((eds) => [
            ...eds,
            {
                id: `e-${selectedNode.id}-${newNodeId}`,
                source: selectedNode.id,
                target: newNodeId
            }
        ]);

        setNewNodeType(''); // Reset the selection
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
                                        {departments.map((dept, index) => (
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
                                        value={ticketingSelected}
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
                                        value={authSelected}
                                        onChange={handleAuthChange}
                                        style={{ width: '100%', padding: '5px' }}
                                    >
                                        <option value="Azure">Azure</option>
                                        <option value="Google">Google</option>
                                        <option value="Okta">Okta</option>
                                    </select>
                                </div>
                            )}

                            {selectedNode.type === 'MilvusDatabaseNode' && (
                                <div>
                                    <h4>Select Vector Database System</h4>
                                    <select
                                        value={vectordatabseSelected}
                                        onChange={handleVectordatabseChange}
                                        style={{ width: '100%', padding: '5px' }}
                                    >
                                        <option value="Milvus">Milvus</option>
                                        <option value="Faiss">Faiss</option>
                                    </select>
                                </div>
                            )}

                            {selectedNode.type === 'voiceAgent' && (
                                <div>
                                    <h4>Agent Configuration</h4>
                                    <p>Coming soon...</p>
                                </div>

                            )}

                            {selectedNode.type === 'emailAgent' && (
                                <div>
                                    <h4>Agent Configuration</h4>
                                    <p>Coming soon...</p>
                                </div>

                            )}

                            {/* Add New Node Section */}
                            <hr />
                            <h2>You can Customize the next node </h2>
                            <h4>Add the next block in the workflow</h4>
                            <select
                                value={newNodeType}
                                onChange={(e) => setNewNodeType(e.target.value)}
                                style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
                            >
                                <option value="">Select node type</option>
                                <option value="greetingNode">Greeting Node</option>
                                <option value="ticketingNode">Ticketing Node</option>
                                <option value="authenticationNode">Authentication Node</option>
                                <option value="MilvusDatabaseNode">Milvus Database Node</option>
                                <option value="Responsenode">Response Node</option>
                                <option value="GladMessageNode">Glad Message Node</option>
                                <option value="LLM">LLM Node</option>
                                <option value="incidentCreation">Incident Creation Node</option>
                                <option value="voiceAgent">Voice Agent Node</option>
                                <option value="emailAgent">Email Agent Node</option>
                            </select>
                            <button
                                onClick={handleAddNewNode}
                                disabled={!newNodeType}
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: newNodeType ? '#007bff' : '#ccc',
                                    color: 'white',
                                    border: 'none',
                                    cursor: newNodeType ? 'pointer' : 'not-allowed'
                                }}
                            >
                                Add New Node
                            </button>
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