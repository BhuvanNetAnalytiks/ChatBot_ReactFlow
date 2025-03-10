// src/components/CombinedFlow.jsx
import React, { useCallback, useEffect, useState } from 'react';
import { useNodesState, useEdgesState, addEdge, useReactFlow } from '@xyflow/react';
import Flow from './mainFlow';
import GreetingNode from './greetingNode';
import DepartmentSelector from './departmentSelector';
import TicketingNode from './ticketingNode';
import ChatbotNode from './chatInitiation';
import IdentityProvider from './identityProvider';
import milvusdatabase from './milvusDb'
import StartNode from './start';
import hrNode from './hrNode';
import ItNode from './itNode';
import DynamicNode from './DynamicNode';
import Response from './response';
import financeNode from './financeNode';
import gladMessageNode from './gladmessage';
import DepartmentDetection from './departmentDetection';
import Llm from './llm';
import incident from './incidentcreation';
import greetingJson from '../../data/greetingNode.json';
import departmentJson from '../../data/departmentSelection.json';
import serviceNowCreateJson from '../../data/createServiceNow.json';
import serviceNowViewJson from '../../data/viewServiceNow.json';
import chatbotJson from '../../data/chatBot.json';
import jiraCreateJson from '../../data/createJira.json';
import jiraViewJson from '../../data/viewJira.json';
import zendeskCreateJson from '../../data/createZendesk.json';
import zendeskViewJson from '../../data/viewZendesk.json';
import StartNodeJson from '../../data/StartNode.json';
import departmentDetectionJson from '../../data/departmentDetection.json';
import IdentityProviderJson from '../../data/identityProvider.json'; //Azure
import GetDetAzure from '../../data/getDetails.json'; //Azure
import MilvusDataJson from '../../data/milvusDatabase.json';
import Financenode from './financeNode';
import Sidebar from './sidebar';
import voiceAgent from './voiceAgent';
import emailAgent from './emailAgent';
import defaultEdges from '../../data/defaultOrchestrationnEdges.json';
const CombinedFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
        // {
        //     id: 'e1-2',
        //     source: 'startnode-1',
        //     target: 'authenticationnode-1',

        // },
        // {
        //     id: 'e2-3',
        //     source: 'authenticationnode-1',
        //     target: 'greeting-1',
        // },
        // {
        //     id: 'e3-4',
        //     source: 'greeting-1',
        //     target: 'departmentdetectionnode-1',
        // },
        // {
        //     id: 'e4-5',
        //     source: 'departmentdetectionnode-1',
        //     target: 'hrnode-1',
        // },
        // {
        //     id: 'e5-6',
        //     source: 'departmentdetectionnode-1',
        //     target: 'itnode-1',
        // },
        // {
        //     id: 'e6-7',
        //     source: 'departmentdetectionnode-1',
        //     target: 'financenode-1',
        // },
        // {
        //     id: 'e7-8',
        //     source: 'hrnode-1',
        //     target: 'milvusnode-1',
        // },
        // {
        //     id: 'e8-9',
        //     source: 'itnode-1',
        //     target: 'milvusnode-1',
        // },
        // {
        //     id: 'e9-10',
        //     source: 'financenode-1',
        //     target: 'milvusnode-1',
        // },
        // {
        //     id: 'e10-11',
        //     source: 'responsenode-1',
        //     target: 'gladmessagenode-1',

        // },
        // {
        //     id: 'e11-12',
        //     source: 'milvusnode-1',
        //     target: 'responsenode-1',
        // },
        // {
        //     id: 'e12-13',
        //     source: 'responsenode-1',
        //     target: 'llmnode-1',
        // },
        // {
        //     id: 'e13-14',
        //     source: 'llmnode-1',
        //     target: 'gladmessagenode-2',
        // },
        // {
        //     id: 'e14-15',
        //     source: 'llmnode-1',
        //     target: 'incident-1',
        // },
        // {
        //     id: 'e15-16',
        //     source: 'ticketing-1',
        //     target: 'incident-1',
        //     targetHandle: 'targetBottomCreateTicket'
        // },
        // {
        //     id: 'e16-17',
        //     source: 'department-1',
        //     target: 'departmentdetectionnode-1',
        //     targetHandle: 'topTarget'
        // },


    const [selectedNode, setSelectedNode] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { getEdges } = useReactFlow();

    const onNodeClick = useCallback((event, node) => {
        console.log("Node is being clicked!")
        setSelectedNode(node);
        setIsSidebarOpen(true);
    }, []);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen((prev) => !prev);
    }, []);

    const handleOutsideClick = useCallback((event) => {
        const sidebar = document.querySelector('.sidebar');
        const isClickInsideSidebar = sidebar && sidebar.contains(event.target);
        const isClickOnNode = event.target.closest('.react-flow__node');
        if (isSidebarOpen && !isClickInsideSidebar && !isClickOnNode) {
            setIsSidebarOpen(false);
        }
    }, [isSidebarOpen]);

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [handleOutsideClick]);

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
    const syncDepartmentNodes = useCallback(() => {
        const departmentNode = nodes.find((n) => n.id === 'department-1');
        if (!departmentNode) return;

        const currentDepartments = departmentNode.data.departments || [];
        const departmentNodeTypes = {
            IT: 'Itnode',
            HR: 'HrNode',
            FINANCE: 'Financenode',
        };

        // Get existing department nodes
        const existingDeptNodes = nodes.filter((n) =>
            ['HrNode', 'Itnode', 'Financenode','DynamicNode'].includes(n.type)
        );
        const existingDeptNames = existingDeptNodes.map((n) => n.data.name);

        // Add new department nodes
        currentDepartments.forEach((dept, index) => {
            const deptNormalized = dept.trim();
            if (!existingDeptNames.includes(deptNormalized)) {
                // Use specific type if it exists, otherwise use 'NewNode'
                const nodeType =
                    departmentNodeTypes[deptNormalized.toUpperCase()] || 'DynamicNode';
                const newNodeId = `${deptNormalized.toLowerCase()}node-${Date.now() + index}`;
                const newNode = {
                    id: newNodeId,
                    type: nodeType,
                    position: { x: 700, y: 60 + index * 150 },
                    data: {
                        name: deptNormalized,
                        description: `The ${deptNormalized} department is responsible for handling user prompts related to ${deptNormalized}`,
                        id: newNodeId,
                        onOptions: handleNodeOptions,
                    },
                };
                console.log('Creating new node:', newNode);
                setNodes((nds) => [...nds, newNode]);
                setEdges((eds) => [
                    ...eds,
                    {
                        id: `e-deptdetect-${newNodeId}`,
                        source: 'departmentdetectionnode-1',
                        target: newNodeId,
                    },
                    {
                        id: `e-${newNodeId}-milvus`,
                        source: newNodeId,
                        target: 'milvusnode-1',
                    },
                ]);
            }
        });

        // Remove department nodes that are no longer in the list
        existingDeptNodes.forEach((node) => {
            if (!currentDepartments.includes(node.data.name)) {
                setNodes((nds) => nds.filter((n) => n.id !== node.id));
                setEdges((eds) =>
                    eds.filter((e) => e.source !== node.id && e.target !== node.id)
                );
            }
        });
    }, [nodes, setNodes, setEdges, handleNodeOptions]);

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
                name: 'GREETING ',
                description: 'The greeting  is responsible for generating a greeting message to the user',
                id: 'greeting-1',
                type: 'greetingNode',
                position: { x: -20, y: 50 },
                data: {
                    greeting: '',
                    id: 'greeting-1', // Add id to data
                    onOptions: handleNodeOptions, // Add onOptions handler
                    // onChange: (value) =>
                    //     setNodes((nds) =>
                    //         nds.map((node) =>
                    //             node.id === 'greeting-1'
                    //                 ? { ...node, data: { ...node.data, greeting: value } }
                    //                 : node
                    //         )
                    //     ),
                },
            },
            {
                name: 'DEPARTMENT ',
                description: 'The department  is responsible for selecting the department of the user prompt',
                id: 'department-1',
                type: 'departmentNode',
                position: { x: 330, y: -250 },
                data: {
                    departments: ['IT', 'FINANCE', 'HR'],
                    newDepartment: '',
                    id: 'department-1', // Add id to data
                    onOptions: handleNodeOptions, // Add onOptions handler
                    // addDepartment: () =>
                    //     setNodes((nds) =>
                    //         nds.map((node) => {
                    //             if (node.id === 'department-1') {
                    //                 const newDept = node.data.newDepartment.trim();
                    //                 if (newDept) {
                    //                     return {
                    //                         ...node,
                    //                         data: {
                    //                             ...node.data,
                    //                             departments: [...node.data.departments, newDept],
                    //                             newDepartment: '',
                    //                         },
                    //                     };
                    //                 }
                    //             }
                    //             return node;
                    //         })
                    //     ),
                    // removeDepartment: (index) =>
                    //     setNodes((nds) =>
                    //         nds.map((node) =>
                    //             node.id === 'department-1'
                    //                 ? {
                    //                     ...node,
                    //                     data: {
                    //                         ...node.data,
                    //                         departments: node.data.departments.filter(
                    //                             (_, i) => i !== index
                    //                         ),
                    //                     },
                    //                 }
                    //                 : node
                    //         )
                    //     ),
                    // setNewDepartment: (value) =>
                    //     setNodes((nds) =>
                    //         nds.map((node) =>
                    //             node.id === 'department-1'
                    //                 ? { ...node, data: { ...node.data, newDepartment: value } }
                    //                 : node
                    //         )
                    //     ),
                },
            },
            // {
            //     name: 'IT ',
            //     description: 'The IT department is responsible for handling user prompts related to the Information Technology department',
            //     id: 'itnode-1',
            //     type: 'Itnode',
            //     position: { x: 700, y: 60 },
            //     data: { id: 'itnode-1', onOptions: handleNodeOptions },
            // },
            // {
            //     name: 'HR ',
            //     description: 'The HR department is responsible for handling user prompts related to the Human Resources department',
            //     id: 'hrnode-1',
            //     type: 'HrNode',
            //     position: { x: 700, y: -90 },
            //     data: { id: 'hrnode-1', onOptions: handleNodeOptions },
            // },
            // {
            //     name: 'FINANCE ',
            //     description: 'The Finance department is responsible for handling user prompts related to the Finance department',
            //     id: 'financenode-1',
            //     type: 'Financenode',
            //     position: { x: 700, y: 250 },
            //     data: { id: 'financenode-1', onOptions: handleNodeOptions },
            // },
            {
                name: 'TICKETING ',
                description: 'The ticketing  is responsible for selecting the ticketing system for incident creation',
                id: 'ticketing-1',
                type: 'ticketingNode',
                position: { x: 1750, y: 500 },
                data: {
                    selected: 'ServiceNow',
                    id: 'ticketing-1', // Add id to data
                    onOptions: handleNodeOptions, // Add onOptions handler
                    // onChange: (value) =>
                    //     setNodes((nds) =>
                    //         nds.map((node) =>
                    //             node.id === 'ticketing-1'
                    //                 ? { ...node, data: { ...node.data, selected: value } }
                    //                 : node
                    //         )
                    //     ),
                },
            },
            // {
            //     id: 'chatbot-1',
            //     type: 'chatbotNode',
            //     position: { x: 500, y: 400 },
            //     data: {
            //         id: 'chatbot-1', // Add id to data
            //         onOptions: handleNodeOptions, // Add onOptions handler
            //     },
            // },
            {
                name: 'START ',
                description: 'The entry point of the flow, initiating the process and directing the user or system to the next step.',
                id: 'startnode-1',
                type: 'startNode',
                position: { x: -410, y: 60 },
                data: {
                    id: 'startnode-1',
                    onOptions: handleNodeOptions,
                }

            },
            {
                name: 'DEPARTMENT DETECTION ',
                description: 'The department detection  is responsible for identifying the department of the user prompt',
                id: 'departmentdetectionnode-1',
                type: 'departmentDetection',
                position: { x: 350, y: 60 },
                data: {
                    id: 'departmentdetectionnode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                name: 'IDENTITY PROVIDER ',
                id: 'authenticationnode-1',
                type: 'authenticationNode',
                description: 'Select the identity provider for authentication',
                position: { x: -310, y: 50 },
                data: {
                    selected: 'Azure',
                    id: 'authenticatiobnode-1',
                    onOptions: handleNodeOptions,
                    // onChange: (value) =>
                    //     setNodes((nds) =>
                    //         nds.map((node) =>
                    //             node.id === 'authenticationnode-1'
                    //                 ? { ...node, data: { ...node.data, selected: value } }
                    //                 : node
                    //         )
                    //     ),
                }
            },
            {
                name: 'HR ',
                description: 'The HR department  is responsible for handling user prompts related to the Human Resources department',
                id: 'hrnode-1',
                type: 'HrNode',
                position: { x: 700, y: -90 },
                data: {
                    id: 'hrnode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                name: 'IT ',
                description: 'The IT department  is responsible for handling user prompts related to the Information Technology department',
                id: 'itnode-1',
                type: 'Itnode',
                position: { x: 700, y: 60 },
                data: {
                    id: 'itnode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                name: 'FINANCE ',
                description: 'The Finance department  is responsible for handling user prompts related to the Finance department',
                id: 'financenode-1',
                type: 'Financenode',
                position: { x: 700, y: 250 },
                data: {
                    id: 'financenode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                name: 'RESPONSE ',
                description: 'The response  is responsible for generating a response to the user prompt',
                id: 'responsenode-1',
                type: 'Responsenode',
                position: { x: 1300, y: 57 },
                data: {
                    id: 'responsenode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                name: 'MILVUS DATABASE ',
                description: 'The Milvus database  is responsible for querying the database to retrieve the relevant information',
                id: 'milvusnode-1',
                type: 'MilvusDatabaseNode',
                position: { x: 1000, y: 45 },
                data: {
                    selected: 'Milvus',
                    id: 'milvusnode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                name: 'GLAD MESSAGE ',
                description: 'The glad message  is responsible for generating a positive message to the user',
                id: 'gladmessagenode-1',
                type: 'GladMessageNode',
                position: { x: 1500, y: 10 },
                data: {
                    id: 'gladmessagenode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                name: 'GLAD MESSAGE ',
                description: 'The glad message node is responsible for generating a positive message to the user',
                id: 'gladmessagenode-2',
                type: 'GladMessageNode',
                position: { x: 1800, y: 60 },
                data: {
                    id: 'gladmessagenode-2',
                    onOptions: handleNodeOptions,
                }
            },
            {
                name: 'LLM ',
                description: 'The LLM  is responsible for generating a response using the Large Language Model',
                id: 'llmnode-1',
                type: 'LLM',
                position: { x: 1500, y: 140 },
                data: {
                    id: 'llmnode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                name: 'INCIDENT CREATION ',
                description: 'The incident creation  is responsible for creating an incident in the ticketing system',
                id: 'incident-1',
                type: 'incidentCreation',
                position: { x: 1800, y: 250 },
                data: {
                    id: 'incident-1',
                    onOptions: handleNodeOptions,
                }
            },
            // {
            //     name: 'voiceAgent ',
            //     description: 'The voice agent  is responsible for handling user prompts using voice commands',
            //     id: 'voiceAgent-1',
            //     type: 'voiceAgent',
            //     position: { x: 500, y: 400 },
            //     data: {
            //         id: 'voiceAgent-1',
            //         onOptions: handleNodeOptions,
            //     }
            // }

        ]);
    }, [setNodes, handleNodeOptions]); // Add handleNodeOptions to dependency array

    // Sync department nodes whenever the department node's data changes
    useEffect(() => {
        syncDepartmentNodes();
    }, [nodes.find((n) => n.id === 'department-1')?.data.departments, syncDepartmentNodes]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const nodeTypes = {
        greetingNode: GreetingNode,
        departmentNode: DepartmentSelector,
        ticketingNode: TicketingNode,
        // chatbotNode: ChatbotNode,
        departmentDetection: DepartmentDetection,
        authenticationNode: IdentityProvider,
        startNode: StartNode,
        HrNode: hrNode,
        Itnode: ItNode,
        Financenode: financeNode,
        Responsenode: Response,
        MilvusDatabaseNode: milvusdatabase,
        GladMessageNode: gladMessageNode,
        LLM: Llm,
        incidentCreation: incident,
        DynamicNode: DynamicNode,
        voiceAgent: voiceAgent,
        emailAgent: emailAgent,
    };

    // Combined save function: Map each node type to its JSON template and merge them
    const saveCombinedGraphToFile = useCallback(async () => {
        // Define a mapping from node type to a function that returns the corresponding step object.
        const stepMapping = {
            greetingNode: (node) => ({
                ...greetingJson.steps[0],
                parameters: [],
            }),
            // departmentNode: (node) => ({
            //     ...departmentJson.steps[0],
            //     parameters: node.data.departments.map((dept) => ({
            //         name: 'department',
            //         value: dept,
            //         type: 'body'
            //     })),
            // }),
            departmentNode: (node) => {
                return null;
            },
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
                return null;
            },
            startNode: (node) => {
                return null;
            },
            departmentDetection: (node) => {
                return null;
            },
            authenticationNode: (node) => {
                return {
                    create: IdentityProviderJson.steps[0],
                    view: GetDetAzure.steps[0]
                }
            },
            HrNode: (node) => {
                return null;
            },
            Itnode: (node) => {
                return null;
            },
            Financenode: (node) => {
                return null;
            },
            Responsenode: (node) => {
                return null;
            },
            MilvusDatabaseNode: (node) => {
                return {
                    ...MilvusDataJson.steps[0],
                    parameters: [{ "name": "question", "type": "body" }]
                }
            },
            GladMessageNode: (node) => {
                return null;
            },
            LLM: (node) => {
                return null;
            },
            incidentCreation: (node) => {
                return null;
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
                suggestedName: 'orchestration.json',
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
        <div style={{ display: 'flex', height: '100vh' }}>
            <Flow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onNodeClick={onNodeClick}
            >
                <button
                    onClick={saveCombinedGraphToFile}
                    style={{ position: 'absolute', zIndex: 10, padding: 10, color: 'blue' }}
                >
                    Build Json
                </button>
            </Flow>
            <Sidebar
                selectedNode={selectedNode}
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                setNodes={setNodes}
                setEdges={setEdges}
            />
        </div>
    );
};

export default CombinedFlow; 