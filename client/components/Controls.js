import React from 'react';
import ActionRenderGraph from './ActionRenderGraph';
import ActionAddHexagon from './ActionAddHexagon';
import ActionDeleteHexagon from './ActionDeleteHexagon';
import ActionGetHexagon from './ActionGetHexagon';
import ActionInitiateCluster from './ActionInitiateCluster';

const Controls = () => {
  return (
    <div>
      <ActionInitiateCluster />
      <ActionRenderGraph />
      <ActionAddHexagon />
      <ActionDeleteHexagon />
      <ActionGetHexagon />
    </div>
  );
};

export default Controls;
