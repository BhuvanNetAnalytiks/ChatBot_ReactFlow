import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeOptions from "./NodeOptions";

const GladMessage = ({ data, selected }) => {
    const nodeStyle = {
        padding: 10,
        border: selected
            ? '3px solid #3b82f6'  // Blue border when selected 
            : '1px solid #ddd',    // Default border
        borderRadius: 5,
        backgroundColor: 'white',
        boxShadow: selected
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            : 'none'
    };
    return (
        <div style={nodeStyle}>
            <h4>Glad to assist you</h4>
            <NodeOptions id={data.id} onOptions={data.onOptions} />

            {/* Target Handle for Incoming Connections */}
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
            />

            {/* Source Handle for Outgoing Connections */}
            <Handle
                type="source"
                position={Position.Right}
                style={{ background: '#555' }}
            />
        </div>
    );
};

export default GladMessage;