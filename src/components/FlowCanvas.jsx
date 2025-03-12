import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import InputNode from './NodeTypes/InputNode.jsx';
import Authenticated from './NodeTypes/Authenticated.jsx';
import NotAuthenticated from './NodeTypes/NotAuthenticated.jsx';
import DepartmentClassifier from './NodeTypes/DepartmentClassifier.jsx';
import GladMessage from './NodeTypes/GladMessage.jsx';
import RAG from './NodeTypes/Rag.jsx';
import Response from './NodeTypes/Response.jsx';
import GreetingMessage from './NodeTypes/GreetingNode.jsx';
import TicketCreation from './NodeTypes/TicketCreation.jsx';
import LLM from './NodeTypes/LLM.jsx';
import Prompt from './NodeTypes/prompt.jsx';
import ticketcreated from './NodeTypes/TicketCreated.jsx';

// Predefined JSON files (add more as needed)
const preDefinedJsonFile = {
  'startNode.json': {
    "function": "function",
    "module": "main_library.function1",
    "endpoint": "/run_function1",
    "methods": ["POST"],
    "parameters": []
  },
  'authNode.json': {
    "function": "get_auth_url_microsoft",
    "module": "main_library.microsoft_auth_graph_api",
    "endpoint": "/microsoft/login",
    "methods": ["GET"],
    "parameters": [],
    "response_type": "redirect"
  },
  'handleCallback.json': {
    "function": "handle_callback",
    "module": "main_library.microsoft_auth_graph_api",
    "endpoint": "/getAToken",
    "methods": ["GET"],
    "parameters": [
      {
        "name": "code",
        "type": "query"
      },
      {
        "name": "error",
        "type": "query"
      },
      {
        "name": "error_description",
        "type": "query"
      }
    ]
  },
  'deptClassifier.json': {
    "function": "classifyDepartment",
    "module": "classifier_library.dept",
    "endpoint": "/classify_dept",
    "methods": ["POST"],
    "parameters": ["input_text"]
  },
  'messageNode.json': {
    "function": "sendMessage",
    "module": "message_library.send",
    "endpoint": "/send_message",
    "methods": ["POST"],
    "parameters": ["message"]
  },
  'ragNode.json': {
    "function": "retrieveAndGenerate",
    "module": "rag_library.rag",
    "endpoint": "/rag",
    "methods": ["POST"],
    "parameters": ["query"]
  },
  'ticketNode.json': {
    "function": "createTicket",
    "module": "ticket_library.create",
    "endpoint": "/create_ticket",
    "methods": ["POST"],
    "parameters": ["issue"]
  },
  'llmNode.json': {
    "function": "generateResponse",
    "module": "llm_library.generate",
    "endpoint": "/generate",
    "methods": ["POST"],
    "parameters": ["prompt"]
  },
  'promptNode.json': {
    "function": "processPrompt",
    "module": "prompt_library.process",
    "endpoint": "/process_prompt",
    "methods": ["POST"],
    "parameters": ["input"]
  },
  'responseNode.json': {
    "function": "formatResponse",
    "module": "response_library.format",
    "endpoint": "/format_response",
    "methods": ["POST"],
    "parameters": ["data"]
  }
};

const nodeTypes = {
  start: InputNode,
  authenticatedNode: Authenticated,
  notAuthenticatedNode: NotAuthenticated,
  departmentClassifier: DepartmentClassifier,
  gladMessage: GladMessage,
  rag: RAG,
  response: Response,
  greetingMessage: GreetingMessage,
  ticketcreation: TicketCreation,
  llm: LLM,
  prompt: Prompt,
  ticketcreated: ticketcreated,
};

// Updated initialNodes with predefinedJson for all nodes
const initialNodes = [
  { id: '1', type: 'start', data: { predefinedJson: 'startNode.json' }, position: { x: 100, y: 200 } },
  { id: '2', type: 'authenticatedNode', data: { predefinedJson: 'authNode.json' }, position: { x: 300, y: 40 } },
  { id: '3', type: 'notAuthenticatedNode', data: { predefinedJson: 'authNode.json' }, position: { x: 300, y: 200 } },
  { id: '4', type: 'departmentClassifier', data: { predefinedJson: 'deptClassifier.json' }, position: { x: 600, y: 350 } },
  { id: '5', type: 'greetingMessage', data: { predefinedJson: 'messageNode.json' }, position: { x: 600, y: 40 } },
  { id: '6', type: 'rag', data: { predefinedJson: 'ragNode.json' }, position: { x: 1100, y: 300 } },
  { id: '7', type: 'rag', data: { predefinedJson: 'ragNode.json' }, position: { x: 1100, y: 400 } },
  { id: '8', type: 'rag', data: { predefinedJson: 'ragNode.json' }, position: { x: 1100, y: 500 } },
  { id: '9', type: 'gladMessage', data: { predefinedJson: 'messageNode.json' }, position: { x: 2000, y: 200 } },
  { id: '10', type: 'llm', data: { predefinedJson: 'llmNode.json' }, position: { x: 1600, y: 300 } },
  { id: '11', type: 'gladMessage', data: { predefinedJson: 'messageNode.json' }, position: { x: 1600, y: 200 } },
  { id: '12', type: 'ticketcreation', data: { predefinedJson: 'ticketNode.json' }, position: { x: 2000, y: 400 } },
  { id: '13', type: 'prompt', data: { predefinedJson: 'promptNode.json' }, position: { x: 300, y: 350 } },
  { id: '14', type: 'greetingMessage', data: { predefinedJson: 'messageNode.json' }, position: { x: 600, y: 200 } },
  { id: '15', type: 'response', data: { predefinedJson: 'responseNode.json' }, position: { x: 1300, y: 500 } },
  { id: '16', type: 'response', data: { predefinedJson: 'responseNode.json' }, position: { x: 1300, y: 400 } },
  { id: '17', type: 'response', data: { predefinedJson: 'responseNode.json' }, position: { x: 1300, y: 300 } },
  { id: '18', type: 'ticketcreated', data: { predefinedJson: 'ticketcreated.json' }, position: { x: 2400, y: 500 } },
  { id: '19', type: 'gladMessage', data: { predefinedJson: 'messageNode.json' }, position: { x: 2400, y: 300 } },
];

// Function to generate orchestration JSON
const generateOrchestrationJSON = (nodes, edges) => {
  // Start from the "start" node (id: "1") and follow the edges
  const steps = [];
  const visited = new Set();
  const traverseFlow = (nodeId) => {
    if (visited.has(nodeId)) return; // Avoid cycles
    visited.add(nodeId);

    const node = nodes.find(n => n.id === nodeId);
    if (node && node.data.predefinedJson) {
      steps.push(preDefinedJsonFile[node.data.predefinedJson]);
    }

    // Find all edges originating from this node
    const nextEdges = edges.filter(e => e.source === nodeId);
    nextEdges.forEach(edge => {
      traverseFlow(edge.target);
    });
  };

  // Start traversal from node "1" (start node)
  traverseFlow('1');

  const orchestrationData = {
    steps: steps,
  };
  return JSON.stringify(orchestrationData, null, 2);
};

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: 'e1-2', source: '1', target: '2', label: 'YES' },
    { id: 'e1-3', source: '1', target: '3', label: 'NO' },
    { id: 'e1-13', source: '1', target: '13' },
    { id: 'e2-5', source: '2', target: '5' },
    { id: 'e3-14', source: '3', target: '14' },
    { id: 'e13-4', source: '13', target: '4' },
    { id: 'e4-6', source: '4', target: '6', label: 'IT' },
    { id: 'e4-7', source: '4', target: '7', label: 'HR' },
    { id: 'e4-8', source: '4', target: '8', label: 'Finance' },
    { id: 'e6-17', source: '6', target: '17' },
    { id: 'e8-15', source: '8', target: '15' },
    { id: 'e7-16', source: '7', target: '16' },
    { id: 'e17-11', source: '17', target: '11', label: 'YES' },
    { id: 'e17-10', source: '17', target: '10', label: 'NO' },
    { id: 'e10-12', source: '10', target: '12', label: 'NO' },
    { id: 'e10-9', source: '10', target: '9', label: 'YES' },
    { id: 'e12-18', source: '12', target: '18' , label: 'NO'},
    { id: 'e12-19', source: '12', target: '19' , label: 'YES'}
  
  ]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleSaveOrchestration = () => {
    const jsonContent = generateOrchestrationJSON(nodes, edges);

    // Create a Blob and trigger download to save to local system
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'orchestration.json'; // File name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('Orchestration saved as "orchestration.json" to your local system');
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      <button
        onClick={handleSaveOrchestration}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Save Orchestration
      </button>
    </div>
  );
};

export default FlowCanvas;