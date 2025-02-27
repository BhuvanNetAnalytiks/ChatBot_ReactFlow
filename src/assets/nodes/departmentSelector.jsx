// src/components/DepartmentSelector.jsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeOptions from "./NodeOptions";
const DepartmentSelector = ({ data }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>
      <h4>Department Node</h4>
      <ul>
        {data.departments.map((dept, index) => (
          <li key={index}>
            {dept}{' '}
            <button onClick={() => data.removeDepartment(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={data.newDepartment}
        onChange={(e) => data.setNewDepartment(e.target.value)}
        placeholder="New department"
      />
      <button onClick={data.addDepartment}>Add</button>
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