import React, { useState } from 'react';
import { useAsyncFn } from 'react-use';
import { callPost } from '../common/fetcher';
import styles from '../styles/Controls.module.css';

const ActionInitiateCluster = () => {
  const [name, setName] = useState();

  const [state, fetch] = useAsyncFn(async () => {
    return await callPost('/api/hexagon/initiate', { name });
  }, [name]);

  const handleBlur = event => {
    setName(event.target.value);
  };

  console.log(state);
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