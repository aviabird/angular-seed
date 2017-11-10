import { Map, Record } from 'immutable';
import { User } from '../../models/user';

export interface AuthState extends Map<string, any> {
  loggedIn: boolean;
  user: User | null;
}

export const AuthStateRecord = Record({
  loggedIn: false,
  user: null,
});
