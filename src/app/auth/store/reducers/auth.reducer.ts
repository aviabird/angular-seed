import * as auth from '../actions/auth.actions';
import { User } from '../../models/user';
import { AuthState as State, AuthStateRecord } from './auth.state';
export { State as AuthState };

export const initialState: State = new AuthStateRecord() as State;

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN_SUCCESS: {
      return state.merge({
        loggedIn: true,
        user: action.payload.user,
      }) as State;
    }

    case auth.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
