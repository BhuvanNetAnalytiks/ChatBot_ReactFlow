import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeOptions from "./NodeOptions";
const StartNode = ({ data }) => {
    return (
        <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>
            <h4>Start</h4>
            <NodeOptions id={data.id} onOptions={data.onOptions} />
            <Handle
                type="source" // This handle is for incoming connections
                position={Position.Right} // Position the handle at the top of the node
                style={{ background: '#555' }} // Customize the handle style
            />
            <Handle
                type="target" // This handle is for incoming connections
                position={Position.Left} // Position the handle at the top of the node
                style={{ background: '#555' }} // Customize the handle style
            />
        </div>
    );
};
 
export default StartNode; 