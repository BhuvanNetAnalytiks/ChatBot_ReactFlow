// src/components/GreetingNode.jsx
import React from 'react';

const GreetingNode = ({ data }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>
      <h4>Greeting Node</h4>
      <label>
        What greeting?{' '}
        <input
          type="text"
          value={data.greeting}
          onChange={(e) => data.onChange(e.target.value)}
          style={{ marginLeft: 5 }}
        />
      </label>
    </div>
  );
};

export default GreetingNode;
