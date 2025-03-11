import React from 'react';

const authenticated = ({ data }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #1a192b', borderRadius: 3, background: '#fff' }}>
      <strong>Authenticated</strong>
    </div>
  );
};

export default authenticated;