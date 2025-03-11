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

const nodeTypes = {
  inputNode: InputNode,
  authenticatedNode: Authenticated,
  notAuthenticatedNode: NotAuthenticated,
};

const initialNodes = [
  {
    "id": "1",
    "type": "inputNode",
    "data": {  },
    "position": { "x": 100, "y": 600 }
  },
  {
    "id": "2",
    "type": "authenticatedNode",
    "data": {},
    "position": {"x": 300, "y": 200}
  },
  {
    "id": "3",
    "type": "notAuthenticatedNode",
    "data": {},
    "position": {"x": 300, "y": 500}
  }
];

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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