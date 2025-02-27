// src/components/DepartmentSelector.jsx
import React from 'react';

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
    </div>
  );
};

export default DepartmentSelector;
