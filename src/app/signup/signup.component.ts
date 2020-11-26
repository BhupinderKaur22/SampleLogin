import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { HttpError } from '../interfaces/error.interface'
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signUpForm: FormGroup;
  public message$: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: [],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public onSignUp(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    this.userService.register(this.signUpForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.message$ = of('Registration successful!!!');
          console.log('Registration successful!!!');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000);
        },
        (error: HttpError) => {
          this.message$ = of(error.error.message[0]);
          console.log('Error ', error.error.message[0]);
        });
  }

}
