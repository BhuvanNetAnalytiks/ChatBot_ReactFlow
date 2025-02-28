// src/components/CombinedFlow.jsx
import React, { useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, addEdge, useReactFlow } from '@xyflow/react';
import Flow from './mainFlow';
import GreetingNode from './greetingNode';
import DepartmentSelector from './departmentSelector';
import TicketingNode from './ticketingNode';
import ChatbotNode from './chatInitiation';
import IdentityProvider from './identityProvider';
import milvusdatabase from './milvusDb'
import StartNode  from './start';
import hrNode from './hrNode';
import ItNode from './itNode';
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
import Financenode from './financeNode';
 
const CombinedFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([
        {
            id: 'e1-2',
            source: 'startnode-1',
            target: 'authenticationnode-1',

        },
        {
            id: 'e2-3',
            source: 'authenticationnode-1',
            target: 'greeting-1',
        },
        {
            id: 'e3-4',
            source: 'greeting-1',
            target: 'departmentdetectionnode-1',
        },
        {
            id: 'e4-5',
            source: 'departmentdetectionnode-1',
            target: 'hrnode-1',
        },
        { 
            id: 'e5-6',
            source: 'departmentdetectionnode-1',
            target: 'itnode-1',
        },
        {
            id: 'e6-7',
            source: 'departmentdetectionnode-1',
            target: 'financenode-1',
        },
        {
            id: 'e7-8',
            source: 'hrnode-1',
            target: 'milvusnode-1',
        },
        {
            id: 'e8-9',
            source: 'itnode-1',
            target: 'milvusnode-1',
        },
        {
            id: 'e9-10',
            source: 'financenode-1',
            target: 'milvusnode-1',
        },
        {
            id: 'e10-11',
            source: 'responsenode-1',
            target: 'gladmessagenode-1',

        },
        {
            id: 'e11-12',
            source: 'milvusnode-1',
            target: 'responsenode-1',
        },
        {
            id: 'e12-13',   
            source: 'responsenode-1',
            target:'llmnode-1',
        },
        {
            id: 'e13-14',
            source: 'llmnode-1',
            target: 'gladmessagenode-2',
        },
        {
           id: 'e14-15',
           source:'llmnode-1',
           target: 'incident-1',
        },
        {
            id: 'e15-16',
            source:'ticketing-1',
            target: 'incident-1',
        },
        {
            id: 'e16-17',
            source:'department-1',
            target:'departmentdetectionnode-1',
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
                position: { x: 480, y: 50 },
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
                position: { x: 715, y: -250 },
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
                position: { x: 1050, y: -95 },
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
            {
                id: 'startnode-1',
                type: 'startNode',
                position: { x: 10, y:60},
                data: {
                    id: 'startnode-1',
                    onOptions: handleNodeOptions,
                }

            },
            {
                id: 'departmentdetectionnode-1',
                type: 'departmentDetection',
                position: { x:750, y:60},
                data:{
                    id: 'departmentdetectionnode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                id: 'authenticationnode-1',
                type: 'authenticationNode',
                position: { x:150, y:50},
                data:{
                    selected: 'Azure',
                    id: 'authenticatiobnode-1', 
                    onOptions: handleNodeOptions, 
                    onChange: (value) =>
                        setNodes((nds) =>
                            nds.map((node) =>
                                node.id === 'authenticationnode-1'
                                    ? { ...node, data: { ...node.data, selected: value } }
                                    : node
                            )
                        ),
                }
            },
            {
                id: 'hrnode-1',
                type: 'HrNode',
                position: { x:1000, y:60},
                data: {
                    id: 'hrnode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                id: 'itnode-1',
                type: 'Itnode',
                position: { x:1200, y:60},
                data: {
                    id: 'itnode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                id: 'financenode-1',
                type: 'Financenode',
                position: { x:1400, y:60},
                data: {
                    id: 'financenode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                id: 'responsenode-1',
                type: 'Responsenode',
                position: { x:1550, y:60},
                data:{
                    id: 'responsenode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                id: 'milvusnode-1',
                type: 'MilvusDatabaseNode',
                position: { x:1700, y:60},
                data:{
                    id: 'milvusnode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                id: 'gladmessagenode-1',
                type: 'GladMessageNode',
                position: { x:2000, y:60},
                data:{
                    id: 'gladmessagenode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                id: 'gladmessagenode-2',
                type: 'GladMessageNode',
                position: { x:2200, y:60},
                data:{
                    id: 'gladmessagenode-2',
                    onOptions: handleNodeOptions,
                }   
            },
            {
                id: 'llmnode-1',
                type: 'LLM',
                position: {x:2500, y:60},
                data:{
                    id: 'llmnode-1',
                    onOptions: handleNodeOptions,
                }
            },
            {
                id: 'incident-1',
                type: 'incidentCreation',
                position: {x:2700, y:60},
                data:{
                    id: 'incident-1',
                    onOptions: handleNodeOptions,
                }
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
        departmentDetection: DepartmentDetection,
        authenticationNode: IdentityProvider,
        startNode: StartNode,
        HrNode: hrNode,
        Itnode: ItNode,
        Financenode : financeNode,
        Responsenode: Response,
        MilvusDatabaseNode: milvusdatabase,
        GladMessageNode: gladMessageNode,
        LLM: Llm,
        incidentCreation : incident,
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
            startNode: (node) => {
                return{
                    ...StartNodeJson.steps[0],
                    parameters: [],
                };
            },
            departmentDetection: (node) => {
                return{
                    ...departmentDetectionJson.steps[0],
                    parameters: [],
                }
            },
            authenticationNode: (node) => {
                return{
                    create: IdentityProviderJson.steps[0],
                    view: GetDetAzure.steps[0]
                }
            },  
            HrNode: (node) =>{
                return null;
            },
            Itnode: (node) =>{
                return null;
            },
            Financenode: (node) =>{
                return null;
            },
            Responsenode: (node) =>{
                return null;
            },
            MilvusDatabaseNode: (node) => {
                return null;
            },
            GladMessageNode: (node) => {
                return null;
            },
            LLM: (node) => {
                return null;
            },
            incident: (node) => {
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