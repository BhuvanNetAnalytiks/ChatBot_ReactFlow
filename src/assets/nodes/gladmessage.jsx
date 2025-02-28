import React from 'react';

import { Handle, Position } from '@xyflow/react';

import NodeOptions from "./NodeOptions";
 
const GladMessage = ({ data }) => {

    return (
<div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>
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

 