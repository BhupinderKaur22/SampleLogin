import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import * as SignInPageActions from './actions/signInPage.actions';
import * as SignInApiActions from './actions/signInApi.actions';
import { UserService } from 'src/app/services/user.service';
import { exhaustMap, catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SignInEffects {

    @Effect()
    public signIn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SignInPageActions.signIn),
            exhaustMap(action => {
                return this.userService.login(action.user).pipe(
                    map(token => SignInApiActions.signInSuccess({ token })),
                    catchError(errorMessage => of(SignInApiActions.signInFailure({ errorMessage })))
                )
            })
        )
    });

    @Effect({dispatch: false})
    public signInSuccess$ = createEffect(() => this.actions$.pipe(
            ofType(SignInApiActions.signInSuccess),
            tap(() => this.router.navigate(['/home'])),
        ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private router: Router
    ) { }
}