// @ts-nocheck
import { useMemo } from 'react';
import { RootState, useRematchState } from '../../../store';

/** 加密后的 mobile */
export function useTest() {
  const mapState = (state: RootState) => ({
    mock: state.mock,
  });
  const { mock } = useRematchState(mapState);

  const env = useMemo(() => {
    if (mock==="test") {
      return "test";
    }
    return "prod";
  }, [mock]);

  return env;
}
