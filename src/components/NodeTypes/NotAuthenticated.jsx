import React from 'react';

const NotAuthenticated = ({ data }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #1a192b', borderRadius: 3, background: '#fff' }}>
      <strong>Not Authenticated</strong>
    </div>
  );
};

export default NotAuthenticated;