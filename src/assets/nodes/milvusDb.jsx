import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeOptions from "./NodeOptions";
const MilvusDb = ({ data }) => {
  // data.selected holds the current selection.
  // data.onChange is called when the user selects a different ticketing system.
  const handleChange = (e) => {
    if (data.onChange) {
      data.onChange(e.target.value);
    }
  };
 
  return (
    <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>
      <h4>VectorDatabase</h4>
      <label>
        Select vector database:{' '}
        <select value={data.selected || 'milvus'} onChange={handleChange}>
          <option value="milvus">Milvus</option>
        </select>
      </label>
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