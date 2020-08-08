import { useSetCluster } from '../context/ClusterContext';
import { useAsyncFn } from 'react-use';
import { callGet } from '../common/fetcher';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useRenderGraph = () => {
  const setCluster = useSetCluster();
  const [state, fetch] = useAsyncFn(async () => {
    return await callGet('/api/hexagon');
  }, []);

  useEffect(() => {
    if (!state.loading && state.error) {
      toast.error(state.error.message);
    }

    if (!state.loading && state.value && state.value.success) {
      setCluster(state.value.result);
    }
  }, [state]);

  return { loading: state.loading, renderGraph: fetch };
};
