import { createAction, props } from '@ngrx/store';
import { Token } from '../../../interfaces/token.interface';

export const signInSuccess = createAction(
    '[Sign In] Sign-in Success',
    props<{ token: Token }>()
);

export const signInFailure = createAction(
    '[Sign In] Sign-in Failure',
    props<{ errorMessage: string }>()
);