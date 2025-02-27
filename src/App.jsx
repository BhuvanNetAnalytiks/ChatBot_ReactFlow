import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import CombinedFlow from './assets/nodes/combinedFlow';

const App = () => {
  return (
      <ReactFlowProvider>
          <CombinedFlow />
      </ReactFlowProvider>
  );
};

export default App;

