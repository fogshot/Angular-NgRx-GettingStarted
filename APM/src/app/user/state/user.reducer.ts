import { createReducer, on } from '@ngrx/store';
import { toggleMaskUserName } from './user.actions';
import { UserState } from './index';

const initialState: UserState = {
  maskUserName: false,
  currentUser: null,
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(toggleMaskUserName, (state): UserState => {
    return { ...state, maskUserName: !state.maskUserName };
  }),
);
