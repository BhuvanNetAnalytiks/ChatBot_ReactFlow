import React from 'react';
import { Handle, Position } from '@xyflow/react';

const ChatbotNode = ({ data }) => {
    return (
        <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>
            <h4>Initialize ChatBot</h4>
            <Handle
                type="target" // This handle is for incoming connections
                position={Position.Top} // Position the handle at the top of the node
                style={{ background: '#555' }} // Customize the handle style
            />
            <Handle
                type="target" // This handle is for incoming connections
                position={Position.Right} // Position the handle at the top of the node
                style={{ background: '#555' }} // Customize the handle style
            />
            <Handle
                type="target" // This handle is for incoming connections
                position={Position.Bottom} // Position the handle at the top of the node
                style={{ background: '#555' }} // Customize the handle style
            />
        </div>
    );
};

export default ChatbotNode;