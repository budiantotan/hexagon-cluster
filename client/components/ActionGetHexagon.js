import React, { useState, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { callGet } from '../common/fetcher';
import styles from '../styles/Controls.module.css';
import { toast } from 'react-toastify';

const ActionGetHexagon = () => {
  const [name, setName] = useState();

  const [state, fetch] = useAsyncFn(async () => {
    return await callGet(`/api/hexagon/${decodeURIComponent(name)}`);
  }, [name]);

  const handleBlur = event => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (!state.loading && state.error) {
      toast.error(state.error.message);
    }
  }, [state]);

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

      {state.value &&
        state.value.result &&
        state.value.result.name &&
        state.value.result.neighbours && (
          <p className={styles.description}>
            {`Hexagon ${state.value.result.name} has neighbour: ${state.value.result.neighbours}`}
          </p>
        )}
    </div>
  );
};

export default ActionGetHexagon;
