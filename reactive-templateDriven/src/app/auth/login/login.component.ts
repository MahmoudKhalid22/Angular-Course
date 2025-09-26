import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounce, debounceTime, of } from 'rxjs';

function mustContainQuestionMark(controls: AbstractControl) {
  if (controls.value.includes('?')) {
    return null;
  }
  return { mustContainQuestionMark: true };
}

function emailIsUnique(controls: AbstractControl) {
  if (controls.value !== 'test@example.com') {
    return of(null);
  }
  return of({ emailIsUniqus: true });
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'change',
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
      ],
      updateOn: 'change',
    }),
  });

  get emailError() {
    return this.form.controls.email.touched && this.form.controls.email.invalid;
  }
  get passwordError() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }
  ngOnInit() {
    const savedForm = JSON.parse(localStorage.getItem('loginForm')!);
    if (savedForm) {
      this.form.patchValue({
        email: savedForm.email,
        password: savedForm.password,
      });
    }
    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        localStorage.setItem(
          'loginForm',
          JSON.stringify({ email: value.email, password: value.password })
        );
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  onSubmit() {
    if (this.emailError || this.passwordError) {
      return;
    }
    const value = this.form.value;
    const enteredEmail = value.email;
    const enteredPassword = value.password;
    console.log(enteredEmail, enteredPassword);
  }
}
