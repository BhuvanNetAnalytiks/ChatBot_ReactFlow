import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeOptions from "./NodeOptions";
const TicketingNode = ({ data }) => {
  // data.selected holds the current selection.
  // data.onChange is called when the user selects a different ticketing system.
  const handleChange = (e) => {
    if (data.onChange) {
      data.onChange(e.target.value);
    }
  };
 
  return (
    <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>
      <h4>Ticketing System Node</h4>
      <label>
        Select Ticketing System:{' '}
        <select value={data.selected || 'ServiceNow'} onChange={handleChange}>
          <option value="ServiceNow">ServiceNow</option>
          <option value="Jira">Jira</option>
          <option value="Zendesk">Zendesk</option>
        </select>
      </label>
      <NodeOptions id={data.id} onOptions={data.onOptions} />
      <Handle
        type="source" // This handle is for incoming connections
        position={Position.Bottom} // Position the handle at the top of the node
        style={{ background: '#555' }} // Customize the handle style
      />
    </div>
  );
};
 
export default TicketingNode;