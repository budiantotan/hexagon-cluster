import React, { useState } from 'react';
import { useAsyncFn } from 'react-use';
import { callPost } from '../common/fetcher';
import styles from '../styles/Controls.module.css';

const ActionAddHexagon = () => {
  const [name, setName] = useState();
  const [targetName, setTargetName] = useState();
  const [side, setSide] = useState();

  const [state, fetch] = useAsyncFn(async () => {
    return await callPost('/api/hexagon', {
      name,
      targetName,
      side,
    });
  }, [name, targetName, side]);

  const handleBlur = event => {
    const fieldName = event.target.name;
    const value = event.target.value;

    if (fieldName === 'name') {
      setName(value);
    } else if (fieldName === 'targetName') {
      setTargetName(value);
    } else if (fieldName === 'side') {
      setSide(Number(value));
    }
  };

  console.log(state);

  return (
    <div className={styles.sections}>
      <h1 className={styles.title}>{'Add new hexagon to cluster'}</h1>
      <input
        className={styles.input}
        onBlur={handleBlur}
        name="name"
        type="text"
        placeholder="New hexagon Name"
      />
      <input
        className={styles.input}
        onBlur={handleBlur}
        name="targetName"
        type="text"
        placeholder="Target hexagon Name"
      />
      <input
        className={styles.input}
        onBlur={handleBlur}
        name="side"
        type="text"
        placeholder="Side"
      />
      <button
        className={styles.button}
        disabled={state.loading}
        onClick={fetch}
      >
        {'Add'}
      </button>
    </div>
  );
};

export default ActionAddHexagon;