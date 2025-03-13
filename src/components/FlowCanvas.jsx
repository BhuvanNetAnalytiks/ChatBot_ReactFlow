// import React, { useCallback } from 'react';
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
 
// import InputNode from './NodeTypes/InputNode.jsx';
// import Authenticated from './NodeTypes/Authenticated.jsx';
// import NotAuthenticated from './NodeTypes/NotAuthenticated.jsx';
// import DepartmentClassifier from './NodeTypes/DepartmentClassifier.jsx';
// import GladMessage from './NodeTypes/GladMessage.jsx';
// import RAG from './NodeTypes/Rag.jsx';
// import Response from './NodeTypes/Response.jsx';
// import GreetingMessage from './NodeTypes/GreetingNode.jsx';
// import TicketCreation from './NodeTypes/TicketCreation.jsx';
// import LLM from './NodeTypes/LLM.jsx';
// import Prompt from './NodeTypes/prompt.jsx';
// import ticketcreated from './NodeTypes/TicketCreated.jsx';
// import voiceagent from './NodeTypes/voiceAgent.jsx';
// import mailagent from './NodeTypes/mailAgent.jsx';
// import chatagent from './NodeTypes/chatAgent.jsx';
// // Predefined JSON files (add more as needed)
// const preDefinedJsonFile = {
//   'startNode.json': {
//     "function": "function",
//     "module": "main_library.function1",
//     "endpoint": "/run_function1",
//     "methods": ["POST"],
//     "parameters": []
//   },
//   'authNode.json': {
//     "function": "get_auth_url_microsoft",
//     "module": "main_library.microsoft_auth_graph_api",
//     "endpoint": "/microsoft/login",
//     "methods": ["GET"],
//     "parameters": [],
//     "response_type": "redirect"
//   },
//   'handleCallback.json': {
//     "function": "handle_callback",
//     "module": "main_library.microsoft_auth_graph_api",
//     "endpoint": "/getAToken",
//     "methods": ["GET"],
//     "parameters": [
//       {
//         "name": "code",
//         "type": "query"
//       },
//       {
//         "name": "error",
//         "type": "query"
//       },
//       {
//         "name": "error_description",
//         "type": "query"
//       }
//     ]
//   },
//   'deptClassifier.json': {
//     "function": "classifyDepartment",
//     "module": "classifier_library.dept",
//     "endpoint": "/classify_dept",
//     "methods": ["POST"],
//     "parameters": ["input_text"]
//   },
//   'messageNode.json': {
//     "function": "sendMessage",
//     "module": "message_library.send",
//     "endpoint": "/send_message",
//     "methods": ["POST"],
//     "parameters": ["message"]
//   },
//   'ragNode.json': {
//     "function": "retrieveAndGenerate",
//     "module": "rag_library.rag",
//     "endpoint": "/rag",
//     "methods": ["POST"],
//     "parameters": ["query"]
//   },
//   'ticketNode.json': {
//     "function": "createTicket",
//     "module": "ticket_library.create",
//     "endpoint": "/create_ticket",
//     "methods": ["POST"],
//     "parameters": ["issue"]
//   },
//   'llmNode.json': {
//     "function": "generateResponse",
//     "module": "llm_library.generate",
//     "endpoint": "/generate",
//     "methods": ["POST"],
//     "parameters": ["prompt"]
//   },
//   'promptNode.json': {
//     "function": "processPrompt",
//     "module": "prompt_library.process",
//     "endpoint": "/process_prompt",
//     "methods": ["POST"],
//     "parameters": ["input"]
//   },
//   'responseNode.json': {
//     "function": "formatResponse",
//     "module": "response_library.format",
//     "endpoint": "/format_response",
//     "methods": ["POST"],
//     "parameters": ["data"]
//   }
// };
 
// const nodeTypes = {
//   start: InputNode,
//   authenticatedNode: Authenticated,
//   notAuthenticatedNode: NotAuthenticated,
//   departmentClassifier: DepartmentClassifier,
//   gladMessage: GladMessage,
//   rag: RAG,
//   response: Response,
//   greetingMessage: GreetingMessage,
//   ticketcreation: TicketCreation,
//   llm: LLM,
//   prompt: Prompt,
//   ticketcreated: ticketcreated,
//   voiceagent: voiceagent,
//   mailagent:mailagent,
//   chatagent:chatagent,
// };
 
// // Updated initialNodes with predefinedJson for all nodes
// const initialNodes = [
//   { id: '1', type: 'start', data: { predefinedJson: 'startNode.json' }, position: { x:-300, y: 200 } },
//   { id: '2', type: 'authenticatedNode', data: { predefinedJson: 'authNode.json' }, position: { x: 300, y: 40 } },
//   { id: '3', type: 'notAuthenticatedNode', data: { predefinedJson: 'authNode.json' }, position: { x: 300, y: 200 } },
//   { id: '4', type: 'departmentClassifier', data: { predefinedJson: 'deptClassifier.json' }, position: { x: 600, y: 350 } },
//   { id: '5', type: 'greetingMessage', data: { predefinedJson: 'messageNode.json' }, position: { x: 600, y: 40 } },
//   { id: '6', type: 'rag', data: { predefinedJson: 'ragNode.json' }, position: { x: 1100, y: 300 } },
//   { id: '7', type: 'rag', data: { predefinedJson: 'ragNode.json' }, position: { x: 1100, y: 400 } },
//   { id: '8', type: 'rag', data: { predefinedJson: 'ragNode.json' }, position: { x: 1100, y: 500 } },
//   { id: '9', type: 'gladMessage', data: { predefinedJson: 'messageNode.json' }, position: { x: 2000, y: 200 } },
//   { id: '10', type: 'llm', data: { predefinedJson: 'llmNode.json' }, position: { x: 1600, y: 300 } },
//   { id: '11', type: 'gladMessage', data: { predefinedJson: 'messageNode.json' }, position: { x: 1600, y: 200 } },
//   { id: '12', type: 'ticketcreation', data: { predefinedJson: 'ticketNode.json' }, position: { x: 2000, y: 400 } },
//   { id: '13', type: 'prompt', data: { predefinedJson: 'promptNode.json' }, position: { x: 300, y: 350 } },
//   { id: '14', type: 'greetingMessage', data: { predefinedJson: 'messageNode.json' }, position: { x: 600, y: 200 } },
//   { id: '15', type: 'response', data: { predefinedJson: 'responseNode.json' }, position: { x: 1300, y: 500 } },
//   { id: '16', type: 'response', data: { predefinedJson: 'responseNode.json' }, position: { x: 1300, y: 400 } },
//   { id: '17', type: 'response', data: { predefinedJson: 'responseNode.json' }, position: { x: 1300, y: 300 } },
//   { id: '18', type: 'ticketcreated', data: { predefinedJson: 'ticketcreated.json' }, position: { x: 2400, y: 500 } },
//   { id: '19', type: 'gladMessage', data: { predefinedJson: 'messageNode.json' }, position: { x: 2400, y: 300 } },
//   { id: '20', type: 'voiceagent', data: { predefinedJson: 'voiceagent.json' }, position: { x: 50, y:300 } },
//   { id: '21', type: 'mailagent', data: { predefinedJson: 'mailagent.json' }, position: { x: 50, y: 400 } },
//   { id: '22', type: 'chatagent', data: { predefinedJson: 'chatagent.json' }, position: { x: 50, y: 500 } },
// ];
 
// // Function to generate orchestration JSON
// const generateOrchestrationJSON = (nodes, edges) => {
//   // Start from the "start" node (id: "1") and follow the edges  
//   const steps = [];
//   const visited = new Set();
//   const traverseFlow = (nodeId) => {
//     if (visited.has(nodeId)) return; // Avoid cycles
//     visited.add(nodeId);
 
//     const node = nodes.find(n => n.id === nodeId);
//     if (node && node.data.predefinedJson) {
//       steps.push(preDefinedJsonFile[node.data.predefinedJson]);
//     }
 
//     // Find all edges originating from this node
//     const nextEdges = edges.filter(e => e.source === nodeId);
//     nextEdges.forEach(edge => {
//       traverseFlow(edge.target);
//     });
//   };
 
//   // Start traversal from node "1" (start node)
//   traverseFlow('1');
 
//   const orchestrationData = {
//     steps: steps,
//   };
//   return JSON.stringify(orchestrationData, null, 2);
// };
 
// const FlowCanvas = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([
//     { id: 'e1-2', source: '1', target: '2', label: 'IF' },
//     { id: 'e1-3', source: '1', target: '3', label: 'ELSE' },
    
//     { id: 'e2-5', source: '2', target: '5' },
//     { id: 'e3-14', source: '3', target: '14' },
//     { id: 'e13-4', source: '13', target: '4' },
//     { id: 'e4-6', source: '4', target: '6', label: 'IT' },
//     { id: 'e4-7', source: '4', target: '7', label: 'HR' },
//     { id: 'e4-8', source: '4', target: '8', label: 'Finance' },
//     { id: 'e6-17', source: '6', target: '17' },
//     { id: 'e8-15', source: '8', target: '15' },
//     { id: 'e7-16', source: '7', target: '16' },
//     { id: 'e17-11', source: '17', target: '11', label: 'YES' },
//     { id: 'e17-10', source: '17', target: '10', label: 'NO' },
//     { id: 'e10-12', source: '10', target: '12', label: 'NO' },
//     { id: 'e10-9', source: '10', target: '9', label: 'YES' },
//     { id: 'e12-18', source: '12', target: '18' , label: 'NO'},
//     { id: 'e12-19', source: '12', target: '19' , label: 'YES'},
//     {id:'e1-20',source:'1',target:'20'},
//     {id:'e20-13',source:'20',target:'13'},
//     {id:'e1-21',source:'1',target:'21'},
//     {id:'e21-13',source:'21',target:'13'},
//     {id:'e1-22',source:'1',target:'22'},
//     {id:'e22-13',source:'22',target:'13'},
//   ]);
 
//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges]
//   );
 
//   const handleNodeOptions = (nodeId, action) => {
//     switch (action) {
//       case 'delete':
//         setNodes((nds) => nds.filter((node) => node.id !== nodeId));
//         setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
//         break;
//       case 'copy':
//         const nodeToCopy = nodes.find((node) => node.id === nodeId);
//         if (nodeToCopy) {
//           const newNode = {
//             ...nodeToCopy,
//             id: `${nodeToCopy.id}-copy-${Date.now()}`,
//             position: { x: nodeToCopy.position.x + 50, y: nodeToCopy.position.y + 50 },
//           };
//           setNodes((nds) => nds.concat(newNode));
//         }
//         break;
//       case 'change':
//         // Handle changing the block (e.g., open a modal to select a new type)
//         alert(`Change block for node ${nodeId}`);
//         break;
//       case 'about':
//         // Show info about the node
//         const node = nodes.find((node) => node.id === nodeId);
//         if (node) {
//           alert(`Node ID: ${node.id}\nType: ${node.type}\nPredefined JSON: ${node.data.predefinedJson}`);
//         }
//         break;
//       default:
//         break;
//     }
//   };
 
//   const customNodeTypes = {
//     ...nodeTypes,
//     default: (props) => {
//       const nodeData = { ...props.data, onOptions: handleNodeOptions };
//       return (
//         <div style={{ position: 'relative' }}>
//           {nodeTypes[props.type]({ ...props, data: nodeData })}
//         </div>
//       );
//     },
//   };
 
//   const handleSaveOrchestration = () => {
//     const jsonContent = generateOrchestrationJSON(nodes, edges);
 
//     // Create a Blob and trigger download to save to local system
//     const blob = new Blob([jsonContent], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'orchestration.json'; // File name for download
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
 
//     alert('Orchestration saved as "orchestration.json" to your local system');
//   };
 
//   return (
//     <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={customNodeTypes}
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>
 
//       <button
//         onClick={handleSaveOrchestration}
//         style={{
//           position: 'absolute',
//           top: 10,
//           right: 10,
//           padding: '10px 20px',
//           backgroundColor: '#007bff',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//         }}
//       >
//         Save Orchestration
//       </button>
//     </div>
//   );
// };
 
// export default FlowCanvas;
 
 


// FlowCanvas.jsx
import React, { useCallback, useState } from 'react';
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
import voiceagent from './NodeTypes/voiceAgent.jsx';
import mailagent from './NodeTypes/mailAgent.jsx';
import chatagent from './NodeTypes/chatAgent.jsx';
import Sidebar from './NodeTypes/sidebar.jsx';

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
  voiceagent: voiceagent,
  mailagent: mailagent,
  chatagent: chatagent,
};

const initialNodes = [
  { id: '1', type: 'start', data: { predefinedJson: 'startNode.json', greeting: '', departments: [] }, position: { x: -300, y: 200 } ,description : 'The entry point of the flow, initiating the process and directing the user or system to the next step'},
  { id: '2', type: 'authenticatedNode', data: { predefinedJson: 'authNode.json', greeting: '', departments: [] }, position: { x: 300, y: 40 } ,description : 'If the user is authenticated user, then the flow will be directed to this node'},
  { id: '3', type: 'notAuthenticatedNode', data: { predefinedJson: 'authNode.json', greeting: '', departments: [] }, position: { x: 300, y: 200 } ,description : 'If the user is not authenticated user, then the flow will be directed to this node'},
  { id: '4', type: 'departmentClassifier', data: { predefinedJson: 'deptClassifier.json', greeting: '', departments: [] }, position: { x: 600, y: 350 } ,description : 'The department  is responsible for selecting the department of the user prompt'},
  { id: '5', type: 'greetingMessage', data: { predefinedJson: 'messageNode.json', greeting: 'Hello!', departments: [] }, position: { x: 600, y: 40 } ,description : 'The greeting  is responsible for generating a greeting message to the user'},
  { id: '6', type: 'rag', data: { predefinedJson: 'ragNode.json', greeting: '', departments: [] }, position: { x: 1100, y: 300 } ,description : 'This is responsible for generating a response from milvus based on the user prompt'},
  { id: '7', type: 'rag', data: { predefinedJson: 'ragNode.json', greeting: '', departments: [] }, position: { x: 1100, y: 400 } ,description : 'This is responsible for generating a response from milvus based on the user prompt'},
  { id: '8', type: 'rag', data: { predefinedJson: 'ragNode.json', greeting: '', departments: [] }, position: { x: 1100, y: 500 } ,description : 'This is responsible for generating a response from milvus based on the user prompt'},
  { id: '9', type: 'gladMessage', data: { predefinedJson: 'messageNode.json', greeting: '', departments: [] }, position: { x: 2000, y: 200 } ,description : 'The glad message  is responsible for generating a positive message to the user'},
  { id: '10', type: 'llm', data: { predefinedJson: 'llmNode.json', greeting: '', departments: [] }, position: { x: 1600, y: 300 } ,description : 'The LLM  is responsible for generating a response using the Large Language Model'},
  { id: '11', type: 'gladMessage', data: { predefinedJson: 'messageNode.json', greeting: '', departments: [] }, position: { x: 1600, y: 200 } ,description : 'The glad message  is responsible for generating a positive message to the user'},
  { id: '12', type: 'ticketcreation', data: { predefinedJson: 'ticketNode.json', greeting: '', departments: [] }, position: { x: 2000, y: 400 } ,description : 'The ticket creation  is responsible for creating an incident in the ticketing system'},
  { id: '13', type: 'prompt', data: { predefinedJson: 'promptNode.json', greeting: '', departments: [] }, position: { x: 300, y: 350 } ,description : 'The prompt  is responsible for generating a prompt to the user'},
  { id: '14', type: 'greetingMessage', data: { predefinedJson: 'messageNode.json', greeting: 'Welcome!', departments: [] }, position: { x: 600, y: 200 } ,description : 'The greeting  is responsible for generating a greeting message to the user'},
  { id: '15', type: 'response', data: { predefinedJson: 'responseNode.json', greeting: '', departments: [] }, position: { x: 1300, y: 500 } ,description : 'The response  is responsible for generating a response to the user prompt'},
  { id: '16', type: 'response', data: { predefinedJson: 'responseNode.json', greeting: '', departments: [] }, position: { x: 1300, y: 400 },description : 'The response  is responsible for generating a response to the user prompt' },
  { id: '17', type: 'response', data: { predefinedJson: 'responseNode.json', greeting: '', departments: [] }, position: { x: 1300, y: 300 } ,description : 'The response  is responsible for generating a response to the user prompt'},
  { id: '18', type: 'ticketcreated', data: { predefinedJson: 'ticketcreated.json', greeting: '', departments: [] }, position: { x: 2400, y: 500 },description : 'Ticket has been created successfully ' },
  { id: '19', type: 'gladMessage', data: { predefinedJson: 'messageNode.json', greeting: '', departments: [] }, position: { x: 2400, y: 300 } ,description : 'The glad message  is responsible for generating a positive message to the user'},
  { id: '20', type: 'voiceagent', data: { predefinedJson: 'voiceagent.json', greeting: '', departments: [] }, position: { x: 50, y: 300 } ,description : 'voice agent will be responsible for handling the voice commands'},
  { id: '21', type: 'mailagent', data: { predefinedJson: 'mailagent.json', greeting: '', departments: [] }, position: { x: 50, y: 400 } ,description : ' mail agent will be responsible for handling the mail commands'},
  { id: '22', type: 'chatagent', data: { predefinedJson: 'chatagent.json', greeting: '', departments: [] }, position: { x: 50, y: 500 } ,description : ' chat agent will be responsible for handling the chat commands'},
];

const generateOrchestrationJSON = (nodes, edges) => {
  const steps = [];
  const visited = new Set();
  
  const traverseFlow = (nodeId) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const node = nodes.find(n => n.id === nodeId);
    if (node && node.data.predefinedJson) {
      steps.push(preDefinedJsonFile[node.data.predefinedJson]);
    }

    const nextEdges = edges.filter(e => e.source === nodeId);
    nextEdges.forEach(edge => {
      traverseFlow(edge.target);
    });
  };

  traverseFlow('1');

  const orchestrationData = {
    steps: steps,
  };
  return JSON.stringify(orchestrationData, null, 2);
};

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: 'e1-2', source: '1', target: '2', label: 'IF' },
    { id: 'e1-3', source: '1', target: '3', label: 'ELSE' },
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
    { id: 'e12-18', source: '12', target: '18', label: 'NO' },
    { id: 'e12-19', source: '12', target: '19', label: 'YES' },
    { id: 'e1-20', source: '1', target: '20' },
    { id: 'e20-13', source: '20', target: '13' },
    { id: 'e1-21', source: '1', target: '21' },
    { id: 'e21-13', source: '21', target: '13' },
    { id: 'e1-22', source: '1', target: '22' },
    { id: 'e22-13', source: '22', target: '13' },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onNodeClick = (event, node) => {
    const sidebarNode = {
      id: node.id,
      type: node.type,
      name: node.type.charAt(0).toUpperCase() + node.type.slice(1),
      description: node.description || 'No description available',
      position: node.position,
      data: {
        ...node.data,
        greeting: node.data.greeting || '',
        departments: node.data.departments || [],
        selected: node.data.selected || '',
        onOptions: handleNodeOptions
      }
    };
    setSelectedNode(sidebarNode);
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }
  };

  const handleNodeOptions = (nodeId, action) => {
    switch (action) {
      case 'delete':
        setNodes((nds) => nds.filter((node) => node.id !== nodeId));
        setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
        setSelectedNode(null);
        setIsSidebarOpen(false);
        break;
      case 'copy':
        const nodeToCopy = nodes.find((node) => node.id === nodeId);
        if (nodeToCopy) {
          const newNode = {
            ...nodeToCopy,
            id: `${nodeToCopy.id}-copy-${Date.now()}`,
            position: { x: nodeToCopy.position.x + 50, y: nodeToCopy.position.y + 50 },
          };
          setNodes((nds) => nds.concat(newNode));
        }
        break;
      case 'change':
        alert(`Change block for node ${nodeId}`);
        break;
      case 'about':
        const node = nodes.find((node) => node.id === nodeId);
        if (node) {
          alert(`Node ID: ${node.id}\nType: ${node.type}\nPredefined JSON: ${node.data.predefinedJson}`);
        }
        break;
      default:
        break;
    }
  };

  const customNodeTypes = {
    ...nodeTypes,
    default: (props) => {
      const nodeData = { ...props.data, onOptions: handleNodeOptions };
      return (
        <div style={{ position: 'relative' }}>
          {nodeTypes[props.type]({ ...props, data: nodeData })}
        </div>
      );
    },
  };

  const handleSaveOrchestration = () => {
    const jsonContent = generateOrchestrationJSON(nodes, edges);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'orchestration.json';
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
        nodeTypes={customNodeTypes}
        onNodeClick={onNodeClick}
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
          right: isSidebarOpen ? 620 : 10,
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

export default FlowCanvas;