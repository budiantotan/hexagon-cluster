import React, { useState, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { callPost } from '../common/fetcher';
import styles from '../styles/Controls.module.css';
import { toast } from 'react-toastify';
import { useRenderGraph } from '../hooks/useRenderGraph';

const ActionInitiateCluster = () => {
  const [name, setName] = useState();
  const { renderGraph } = useRenderGraph();

  const [state, fetch] = useAsyncFn(async () => {
    return await callPost('/api/hexagon/initiate', { name });
  }, [name]);

  const handleBlur = event => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (!state.loading && state.error) {
      toast.error(state.error.message);
    }

    if (!state.loading && state.value && state.value.success) {
      toast.success(state.value.result);
      renderGraph();
    }
  }, [state]);

  return (
    <div className={styles.sections}>
      <h1 className={styles.title}>{'Initiate cluster'}</h1>
      <p className={styles.description}>
        {
          'Create a cluster with an initial hexagon when no hexagon are available'
        }
      </p>
      <input
        className={styles.input}
        onBlur={handleBlur}
        type="text"
        placeholder="Hexagon Name"
      />
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

export default ActionInitiateCluster;
