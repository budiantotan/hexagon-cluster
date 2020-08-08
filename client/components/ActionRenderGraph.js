import React from 'react';
import styles from '../styles/Controls.module.css';
import { useRenderGraph } from '../hooks/useRenderGraph';

const ActionRenderGraph = () => {
  const { loading, renderGraph } = useRenderGraph();

  return (
    <div className={styles.sections}>
      <h1 className={styles.title}>{'Render graph'}</h1>
      <p className={styles.description}>
        {'Render the graph, which can be seen at the other side'}
      </p>
      <button
        className={styles.button}
        onClick={renderGraph}
        disabled={loading}
      >
        {'Go!'}
      </button>
    </div>
  );
};

export default ActionRenderGraph;
