import React, { useState } from 'react';
import { useAsyncFn } from 'react-use';
import { callGet } from '../common/fetcher';
import styles from '../styles/Controls.module.css';

const ActionGetHexagon = () => {
  const [name, setName] = useState();

  const [state, fetch] = useAsyncFn(async () => {
    return await callGet(`/api/hexagon/${decodeURIComponent(name)}`);
  }, [name]);

  const handleBlur = event => {
    setName(event.target.value);
  };

  console.log(state);
  return (
    <div className={styles.sections}>
      <h1 className={styles.title}>{`Get hexagon's neighbours`}</h1>
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
        {'Find'}
      </button>
    </div>
  );
};

export default ActionGetHexagon;
