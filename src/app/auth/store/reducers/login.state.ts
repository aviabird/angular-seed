import { Map, Record } from 'immutable';
import { User } from '../../models/user';

export interface LoginState extends Map<string, any> {
  error: string | null;
  pending: boolean;
}

export const LoginStateRecord = Record({
  error: null,
  pending: false,
});
