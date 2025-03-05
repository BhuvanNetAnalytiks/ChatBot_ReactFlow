import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeOptions from "./NodeOptions";
const MilvusDb = ({ data,selected }) => {
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
  // data.selected holds the current selection.
  // data.onChange is called when the user selects a different ticketing system.
  const handleChange = (e) => {
    if (data.onChange) {
      data.onChange(e.target.value);
    }
  };
 
  return (
    <div style={nodeStyle}>
      <h4>VectorDatabase</h4>
      <p>Selected vectorDb : {data.selected}</p>
      <NodeOptions id={data.id} onOptions={data.onOptions} />
      <Handle
        type="target" // This handle is for incoming connections
        position={Position.Left} // Position the handle at the top of the node
        style={{ background: '#555' }} // Customize the handle style
      />
      <Handle
                type="source" // This handle is for incoming connections
                position={Position.Right} // Position the handle at the top of the node
                style={{ background: '#555' }} // Customize the handle style
            />  
    </div>
  );
};
 
export default MilvusDb;