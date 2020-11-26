import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as SignInPageActions from './state/actions/signInPage.actions';
import { SignInState, getError } from './state';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public signInForm: FormGroup;
  public errorMessage$: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<SignInState>
  ) { 
    this.signInForm = this.formBuilder.group({
      username: [],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.errorMessage$ = this.store.select(getError);

  }

  public onSignIn() {
    if (this.signInForm.invalid) {
      return;
    }

    this.store.dispatch(SignInPageActions.signIn({ user: this.signInForm.value }))
  }

}
