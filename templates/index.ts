// @ts-nocheck
import IState from './types';
import { createModel } from '@rematch/core';
 /** State:数据初始*/
const initialState: IState = {
  mock:"test"
};
export const mobileState = createModel<RootModel>()({
    state: { ...initialState },
    reducers: {
        /** Mobile:数据交互*/
      _update: (state:IState, payload: Partial<IState>) => {
        return {
          ...state,
          ...payload,
        };
      },
    },
    effects: (/* dispatch */) => ({}),
  });
  
  export const mobileController = createModel<RootModel>()({
    state: null,
    effects: (dispatch) => ({
      /** Controlle:操作行为*/
   
    }),
  });
  