import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Token } from '../interfaces/token.interface';

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient
    ) {}

    public register(user: UserInterface) {
        console.log('API called', `${environment.apiUrl}/auth/signUp`);

        return this.http.post(`${environment.apiUrl}/auth/signUp`, user);

    }

    public login(user: UserInterface): Observable<Token> {
        console.log('API called', `${environment.apiUrl}/auth/signIn`);
        console.log('User', user);

        return this.http.post<Token>(`${environment.apiUrl}/auth/signIn`, user)
            .pipe(
                catchError(this.handleError)
            );

    }

    private handleError(err: any) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
      }
}