import { createAction, props } from '@ngrx/store';
import { UserInterface } from 'src/app/interfaces/user.interface';

export const signIn = createAction(
    '[Sign In API] Signing-in',
    props<{ user: UserInterface}>()
);