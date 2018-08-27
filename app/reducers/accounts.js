// @flow
import { CREATE_ACCOUNT, IMPORT_ACCOUNT } from 'actions/accounts';
import type { Action } from './types';

export default function account(state: number = 0, action: Action) {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return state + 1;
    case IMPORT_ACCOUNT:
      return state - 1;
    default:
      return state;
  }
}
