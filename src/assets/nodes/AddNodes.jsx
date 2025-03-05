import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeOptions from "./NodeOptions";

const NewNode = ({ data }) => {
    console.log('NewNode data:', data);
    return (
        <div className="node" style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>
            <h4>{data.name || 'Hello New Node Here!!'}</h4>
            <NodeOptions id={data.id} onOptions={data.onOptions} />
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
            />
            <Handle
                type="source"
                position={Position.Right}
                style={{ background: '#555' }}
            />
        </div>
    );
};

export default NewNode;