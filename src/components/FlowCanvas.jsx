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
import Authenticated from './NodeTypes/Authenticated.jsx'
import NotAuthenticated from './NodeTypes/NotAuthenticated.jsx';
import DepartmentClassifier from './NodeTypes/DepartmentClassifier.jsx';
import GladMessage from './NodeTypes/GladMessage.jsx';
import RAG from './NodeTypes/Rag.jsx';
import Response from './NodeTypes/Response.jsx';
import GreetingMessage from './NodeTypes/GreetingNode.jsx';
import ticketcreation from './NodeTypes/TicketCreation.jsx';
import LLM from './NodeTypes/LLM.jsx';
import Prompt from './NodeTypes/prompt.jsx';

const nodeTypes = {
  start: InputNode,
  authenticatedNode: Authenticated,
  notAuthenticatedNode: NotAuthenticated,
  departmentClassifier: DepartmentClassifier,
  gladMessage: GladMessage,
  rag: RAG,
  response: Response,
  greetingMessage: GreetingMessage,
  ticketcreation: ticketcreation,
  llm: LLM,
  prompt: Prompt,
};

const initialNodes = [
  {
    "id": "1",
    "type": "start",
    "data": {  },
    "position": { "x": 100, "y": 200 }

  },
  {
    "id": "2",
    "type": "authenticatedNode",
    "data": {},
    "position": {"x": 300, "y": 40}
  },
  {
    "id": "3",
    "type": "notAuthenticatedNode",
    "data": {},
    "position": {"x": 300, "y": 200}
  },
  {
    "id": "4",
    "type": "departmentClassifier",
    "data": {},
    "position": {"x": 600, "y": 350}
  },

  {
    "id": "5",
    "type": "greetingMessage",
    "data": {},
    "position": {"x": 600, "y": 40}
  },

  {
    "id": "6",
    "type": "rag",
    "data": {},
    "position": {"x": 1100, "y": 300}
  },
  {
    "id": "7",
    "type": "rag",
    "data": {},
    "position": {"x": 1100, "y": 400}
  },
  {
    "id": "8",
    "type": "rag",
    "data": {},
    "position": {"x": 1100, "y": 500},
   
  },
  {
    "id": "9",
    "type": "gladMessage",
    "data": {},
    "position": { x: 2000, y: 200 },
  },
  {
    "id": '10',
    "type": 'llm',
    "data": {},
    "position": { x: 1600, y: 300 },
  },
  {
    "id": '11',
    "type": 'gladMessage',
    "data": {},
    "position": { x: 1600 , y: 200 },

  },
  {
    "id": '12', 
    "type": 'ticketcreation',
    "data": {},
    "position": { x: 2000, y: 400 },
  },
  {
    "id": '13',
    "type": 'prompt',
    "data": {},
    "position": { x: 300, y: 350 },
  },
  {
    "id": "14",
    "type": "greetingMessage",
    "data": {},
    "position": {"x": 600, "y": 200}
  },
  {
    "id": "15",
    "type": "response",
    "data": {},
    "position": {"x": 1300, "y": 500}
  },
  {
    "id": "16",
    "type": "response",
    "data": {},
    "position": {"x": 1300, "y": 400}
  },
  {
    "id": "17",
    "type": "response",
    "data": {},
    "position": {"x": 1300, "y": 300}
  }
];

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      "id" : "e1-2",
      "source" : "1",
      "target" : "2",
      "label" : "Yes"
    },
    {
      "id" : "e1-3",
      "source" : "1",
      "target" : "3",
    },
    {
      "id" : "e1-13",
      "source" : "1",
      "target" : "13",
    },
    {
      "id" : "e1-13",
      "source" : "1",
      "target" : "13",
    },
    {
      "id" : "e2-5",
      "source" : "2",
      "target" : "5",
    },
    {
      "id" : "e3-14",
      "source" : "3",
      "target" : "14",
    },
    {
      "id" : "e13-4",
      "source" : "13",
      "target" : "4",
    },
    {
      "id" : "e13-4",
      "source" : "13",
      "target" : "4",
    },
    {
      "id" : "e4-6",
      "source" : "4",
      "target" : "6",
      "label":"IT",
    },
    {
      "id" : "e4-7",
      "source" : "4",
      "target" : "7",
      "label":"HR"
    },
    {
      "id" : "e4-8",
      "source" : "4",
      "target" : "8",
      "label":"Finance"
    },
    {

      "id" : "e6-17",
      "source" : "6",
      "target" : "17",
    },
    {

      "id" : "e8-15",
      "source" : "8",
      "target" : "15",
    },
    {

      "id" : "e7-16",
      "source" : "7",
      "target" : "16",
    },
    {

      "id" : "e8-15",
      "source" : "8",
      "target" : "15",
    },
    {

      "id" : "e17-11",
      "source" : "17",
      "target" : "11",
      "label":"Yes",
    },
    {

      "id" : "e17-10",
      "source" : "17",
      "target" : "10",
      "label":"No",
    },
    {

      "id" : "e10-12",
      "source" : "10",
      "target" : "12",
      "label":"No",
    },
    {

      "id" : "e9-12",
      "source" : "9",
      "target" : "12",
      "label":"Yes",
    },

    

    

   
    
  ]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
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
    </div>
  );
};

export default FlowCanvas;

