// src/components/CombinedFlow.jsx
import React, { useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import Flow from './mainFlow';
import GreetingNode from './greetingNode';
import DepartmentSelector from './departmentSelector';
import TicketingNode from './ticketingNode';
import greetingJson from '../../data/greetingNode.json';
import departmentJson from '../../data/departmentSelection.json';
import serviceNowCreateJson from '../../data/createServiceNow.json';
import serviceNowViewJson from '../../data/viewServiceNow.json';
import jiraCreateJson from '../../data/createJira.json';
import jiraViewJson from '../../data/viewJira.json';
import zendeskCreateJson from '../../data/createZendesk.json';
import zendeskViewJson from '../../data/viewZendesk.json';

const CombinedFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // Initialize both greeting and department nodes
    useEffect(() => {
        setNodes([
            {
                id: 'greeting-1',
                type: 'greetingNode',
                position: { x: 20, y: 60 },
                data: {
                    greeting: '',
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
                position: { x: 500, y: 200 },
                data: {
                    departments: ['IT', 'FINANCE', 'HR'],
                    newDepartment: '',
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
                position: { x: 20, y: 200 },
                data: {
                    selected: 'ServiceNow',
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
        ]);
    }, [setNodes]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const nodeTypes = {
        greetingNode: GreetingNode,
        departmentNode: DepartmentSelector,
        ticketingNode: TicketingNode,
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
            }
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
                style={{ position: 'absolute', zIndex: 10, padding: 10 }}
            >
                Save JSON
            </button>
        </Flow>
    );
};

export default CombinedFlow;
