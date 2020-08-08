import React from 'react';
import { useAsyncFn } from 'react-use';
import { callGet } from '../common/fetcher';
import styles from '../styles/Controls.module.css';

const ActionRenderGraph = () => {
  const [state, fetch] = useAsyncFn(async () => {
    return await callGet('/api/hexagon');
  }, []);

  console.log(state);
  return (
    <div className={styles.sections}>
      <h1 className={styles.title}>{'Render graph'}</h1>
      <p className={styles.description}>
        {'Render the graph, which can be seen at the other side'}
      </p>
      <button
        className={styles.button}
        onClick={fetch}
        disabled={state.loading}
      >
        {'Go!'}
      </button>
    </div>
  );
};

export default ActionRenderGraph;
