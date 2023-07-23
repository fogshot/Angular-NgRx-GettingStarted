import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User } from '../user';
import { toggleMaskUserName } from './user.actions';

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: false,
  currentUser: null,
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  (state) => state.maskUserName,
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state) => state.currentUser,
);

export const userReducer = createReducer<UserState>(
  initialState,
  on(toggleMaskUserName, (state): UserState => {
    return { ...state, maskUserName: !state.maskUserName };
  }),
);
