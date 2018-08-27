// @flow
import type { GetState, Dispatch } from 'reducers/types';
import { CREATE_ACCOUNT, IMPORT_ACCOUNT } from "./types";

export function increment() {
  return {
    type: CREATE_ACCOUNT
  };
}

export function decrement() {
  return {
    type: IMPORT_ACCOUNT
  };
}

export function incrementIfOdd() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { account } = getState();

    if (account % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
