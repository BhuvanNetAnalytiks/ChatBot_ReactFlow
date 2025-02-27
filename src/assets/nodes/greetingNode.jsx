// src/components/GreetingNode.jsx
import React from 'react';
import NodeOptions from "./NodeOptions";
import { Handle, Position } from '@xyflow/react';
const GreetingNode = ({ data }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>
      <h4>Greeting Node</h4>
      <label>
        What greeting?{' '}
        <input
          type="text"
          value={data.greeting}
          onChange={(e) => data.onChange(e.target.value)}
          style={{ marginLeft: 5 }}
        />
      </label>
      <NodeOptions id={data.id} onOptions={data.onOptions} /> 
      <Handle
                type="source" // This handle is for incoming connections
                position={Position.Bottom} // Position the handle at the top of the node
                style={{ background: '#555' }} // Customize the handle style
            />
    </div>
  );
};

export default GreetingNode;
