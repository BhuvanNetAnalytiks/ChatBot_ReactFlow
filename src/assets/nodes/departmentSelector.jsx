// src/components/DepartmentSelector.jsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeOptions from "./NodeOptions";
const DepartmentSelector = ({ data,selected }) => {
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
    
      <h4>Department Node</h4>
      <ul>
        {data.departments.map((dept, index) => (
          <li key={index}>
            {dept}{' '}
            {/* <button onClick={() => data.removeDepartment(index)}>Remove</button> */}
          </li>
        ))}
      </ul>
      {/* <input
        type="text"
        value={data.newDepartment}
        onChange={(e) => data.setNewDepartment(e.target.value)}
        placeholder="New department"
      /> */}
      {/* <button onClick={data.addDepartment}>Add</button> */}
      <NodeOptions id={data.id} onOptions={data.onOptions} />
      <Handle
        type="source" // This handle is for incoming connections
        position={Position.Bottom} // Position the handle at the top of the node
        style={{ background: '#555' }} // Customize the handle style
      />
    </div>
  );
};

export default DepartmentSelector;