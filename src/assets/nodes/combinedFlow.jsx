// src/components/CombinedFlow.jsx
import React, { useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, addEdge, useReactFlow } from '@xyflow/react';
import Flow from './mainFlow';
import GreetingNode from './greetingNode';
import DepartmentSelector from './departmentSelector';
import TicketingNode from './ticketingNode';
import ChatbotNode from './chatInitiation';
import greetingJson from '../../data/greetingNode.json';
import departmentJson from '../../data/departmentSelection.json';
import serviceNowCreateJson from '../../data/createServiceNow.json';
import serviceNowViewJson from '../../data/viewServiceNow.json';
import chatbotJson from '../../data/chatBot.json'
import jiraCreateJson from '../../data/createJira.json';
import jiraViewJson from '../../data/viewJira.json';
import zendeskCreateJson from '../../data/createZendesk.json';
import zendeskViewJson from '../../data/viewZendesk.json';
 
const CombinedFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([
        {
            id: 'edge-1',
            source: 'greeting-1',
            target: 'chatbot-1',
        },
        {
            id: 'edge-2',
            source: 'department-1',
            target: 'chatbot-1',
        },
        {
            id: 'edge-3',
            source: 'ticketing-1',
            target: 'chatbot-1',
        }
    ]);
 
    const { getEdges } = useReactFlow();
 
    // Handle node options (NEW FUNCTION)
    const handleNodeOptions = useCallback((nodeId, action) => {
        switch (action) {
            case 'delete':
                setNodes((nds) => nds.filter((node) => node.id !== nodeId));
                setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
                break;
            case 'copy':
                setNodes((nds) => {
                    const nodeToCopy = nds.find((node) => node.id === nodeId);
                    if (nodeToCopy) {
                        const newId = `${nodeId.split('-')[0]}-${Date.now()}`;
                        const newNode = {
                            ...nodeToCopy,
                            id: newId,
                            position: {
                                x: nodeToCopy.position.x + 50,
                                y: nodeToCopy.position.y + 50,
                            },
                        };
                        return [...nds, newNode];
                    }
                    return nds;
                });
                break;
            case 'change':
                // Implement change block functionality
                console.log('Change block for node', nodeId);
                break;
            case 'about':
                // Implement about node functionality
                console.log('About node', nodeId);
                break;
            default:
                break;
        }
    }, [setNodes, setEdges]);
 
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Delete') {
                // Get all edges from the store
                const edges = getEdges();
 
                // Filter the selected edges
                const selectedEdges = edges.filter((edge) => edge.selected);
 
                // Get the IDs of the selected edges
                const selectedEdgeIds = selectedEdges.map((edge) => edge.id);
 
                // Filter out the selected edges
                setEdges((eds) => eds.filter((edge) => !selectedEdgeIds.includes(edge.id)));
            }
        };
 
        // Add event listener
        window.addEventListener('keydown', handleKeyDown);
 
        // Cleanup event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [getEdges, setEdges]);
 
    // Initialize both greeting and department nodes
    useEffect(() => {
        setNodes([
            {
                id: 'greeting-1',
                type: 'greetingNode',
                position: { x: 20, y: 60 },
                data: {
                    greeting: '',
                    id: 'greeting-1', // Add id to data
                    onOptions: handleNodeOptions, // Add onOptions handler
                    onChange: (value) =>
                        setNodes((nds) =>
                            nds.map((node) =>
                                node.id === 'greeting-1'
                                    ? { ...node, data: { ...node.data, greeting: value } }
                                    : node
                            )
                        ),
                },
            },
            {
                id: 'department-1',
                type: 'departmentNode',
                position: { x: 900, y: 60 },
                data: {
                    departments: ['IT', 'FINANCE', 'HR'],
                    newDepartment: '',
                    id: 'department-1', // Add id to data
                    onOptions: handleNodeOptions, // Add onOptions handler
                    addDepartment: () =>
                        setNodes((nds) =>
                            nds.map((node) => {
                                if (node.id === 'department-1') {
                                    const newDept = node.data.newDepartment.trim();
                                    if (newDept) {
                                        return {
                                            ...node,
                                            data: {
                                                ...node.data,
                                                departments: [...node.data.departments, newDept],
                                                newDepartment: '',
                                            },
                                        };
                                    }
                                }
                                return node;
                            })
                        ),
                    removeDepartment: (index) =>
                        setNodes((nds) =>
                            nds.map((node) =>
                                node.id === 'department-1'
                                    ? {
                                        ...node,
                                        data: {
                                            ...node.data,
                                            departments: node.data.departments.filter(
                                                (_, i) => i !== index
                                            ),
                                        },
                                    }
                                    : node
                            )
                        ),
                    setNewDepartment: (value) =>
                        setNodes((nds) =>
                            nds.map((node) =>
                                node.id === 'department-1'
                                    ? { ...node, data: { ...node.data, newDepartment: value } }
                                    : node
                            )
                        ),
                },
            },
            {
                id: 'ticketing-1',
                type: 'ticketingNode',
                position: { x: 500, y: 50 },
                data: {
                    selected: 'ServiceNow',
                    id: 'ticketing-1', // Add id to data
                    onOptions: handleNodeOptions, // Add onOptions handler
                    onChange: (value) =>
                        setNodes((nds) =>
                            nds.map((node) =>
                                node.id === 'ticketing-1'
                                    ? { ...node, data: { ...node.data, selected: value } }
                                    : node
                            )
                        ),
                },
            },
            {
                id: 'chatbot-1',
                type: 'chatbotNode',
                position: { x: 500, y: 400 },
                data: {
                    id: 'chatbot-1', // Add id to data
                    onOptions: handleNodeOptions, // Add onOptions handler
                },
            },
        ]);
    }, [setNodes, handleNodeOptions]); // Add handleNodeOptions to dependency array
 
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );
 
    const nodeTypes = {
        greetingNode: GreetingNode,
        departmentNode: DepartmentSelector,
        ticketingNode: TicketingNode,
        chatbotNode: ChatbotNode,
    };
 
    // Combined save function: Map each node type to its JSON template and merge them
    const saveCombinedGraphToFile = useCallback(async () => {
        // Define a mapping from node type to a function that returns the corresponding step object.
        const stepMapping = {
            greetingNode: (node) => ({
                ...greetingJson.steps[0],
                parameters: [{ name: 'greeting', value: node.data.greeting, type: 'body' }],
            }),
            departmentNode: (node) => ({
                ...departmentJson.steps[0],
                parameters: node.data.departments.map((dept) => ({
                    name: 'department',
                    value: dept,
                    type: 'body'
                })),
            }),
            ticketingNode: (node) => {
                if (node.data.selected === 'ServiceNow') {
                    return {
                        create: serviceNowCreateJson.steps[0], // Include create step
                        view: serviceNowViewJson.steps[0],    // Include view step
                    };
                }
                else if (node.data.selected === 'Jira') {
                    return {
                        create: jiraCreateJson.steps[0], // Include create step
                        view: jiraViewJson.steps[0],    // Include view step
                    };
                }
                else if (node.data.selected === 'Zendesk') {
                    return {
                        create: zendeskCreateJson.steps[0], // Include create step
                        view: zendeskViewJson.steps[0],    // Include view step
                    };
                }
                return null;    
            },
            chatbotNode: (node) => {
                // Return a valid step object for the chatbot node
                return {
                    ...chatbotJson.steps[0], // Use the chatbot JSON template
                    parameters: [], // Add any necessary parameters here
                };
            },        
 
        };
 
        // Build an array of step objects for each node that has a mapping.
        const combinedSteps = nodes.reduce((acc, node) => {
            const mapper = stepMapping[node.type];
            const steps = mapper(node);
            if (steps) {
                // If the steps are an object with create and view properties, add both to the accumulator
                if (steps.create && steps.view) {
                    acc.push(steps.create, steps.view);
                } else {
                    // Otherwise, add the single step
                    acc.push(steps);
                }
            }
            return acc;
        }, []);
 
        const combinedJson = { steps: combinedSteps };
        const jsonData = JSON.stringify(combinedJson, null, 2);
 
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: 'combinedGraph.json',
                types: [
                    {
                        description: 'JSON Files',
                        accept: { 'application/json': ['.json'] },
                    },
                ],
            });
            const writable = await handle.createWritable();
            await writable.write(jsonData);
            await writable.close();
            alert('Combined graph saved to file!');
        } catch (error) {
            console.error('Error saving file:', error);
            alert('Error saving file: ' + error.message);
        }
    }, [nodes]);
 
    return (
        <Flow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
        >
            {/* Single common save button */}
            <button
                onClick={saveCombinedGraphToFile}
                style={{ position: 'absolute', zIndex: 10, padding: 10, color:'blue' }}
            >
                Build Json
            </button>
        </Flow>
    );
};
 
export default CombinedFlow;