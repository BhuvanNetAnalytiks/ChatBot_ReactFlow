// src/components/Flow.jsx
import React from 'react';
import { ReactFlow, MiniMap, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const Flow = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, nodeTypes, children, onNodeClick }) => {
  
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {/* Render any children (e.g. a common save button) */}
      {children}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Flow;
