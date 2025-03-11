import React from 'react';
import { Handle, Position } from '@xyflow/react';
const GladMessage = ({ data }) => {
    return (
        <div style={{ padding: 10, border: '1px solid #1a192b', borderRadius: 3, background: '#fff' }}>
            <strong>Glad I could assist you</strong>
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

export default GladMessage;