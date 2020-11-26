import { UserState } from '../../interfaces/user-state.interface'
import { createReducer, on} from '@ngrx/store';
import * as SignInApiActions from './actions/signInApi.actions';

const initialState: UserState = {
    token: '',
    errorMessage: ''
};


export const SignInReducer = createReducer<UserState>(
    initialState,
    on(SignInApiActions.signInSuccess, (state, action) => {
        return {
            ...state,
            token: action.token.accessToken,
            errorMessage: ''
        }
    }),
    on(SignInApiActions.signInFailure, (state, action) => {
        return {
            ...state,
            token: null,
            errorMessage: action.errorMessage
        }
    })
);