import * as auth from '../actions/auth.actions';
import { LoginState as State, LoginStateRecord } from './login.state';
export { LoginState } from './login.state';

export const initialState: State = new LoginStateRecord() as State;

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN: {
      return state.merge({
        error: null,
        pending: true,
      }) as State;
    }

    case auth.LOGIN_SUCCESS: {
      return state.merge({
        error: null,
        pending: false,
      }) as State;
    }

    case auth.LOGIN_FAILURE: {
      return state.merge({
        error: action.payload,
        pending: false,
      }) as State;
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
