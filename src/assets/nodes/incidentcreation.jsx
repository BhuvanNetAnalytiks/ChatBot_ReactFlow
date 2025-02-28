import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeOptions from "./NodeOptions";
const incident= ({ data }) => {
    return (
        <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>
            <h4>Do you want to create ticket?</h4>
            <NodeOptions id={data.id} onOptions={data.onOptions} />
            <Handle
                type="target" // This handle is for incoming connections
                position={Position.Left} // Position the handle at the top of the node
                style={{ background: '#555' }} // Customize the handle style
            /> 
            <Handle
                type="target"
                id="targetBottomCreateTicket" // This handle is for incoming connections
                position={Position.Bottom} // Position the handle at the top of the node
                style={{ background: '#555' }} // Customize the handle style
            />  

        </div>
    );
};

export default incident;