import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    addressStreet: new FormControl('', {
      validators: [Validators.required],
    }),
    addressCity: new FormControl('', {
      validators: [Validators.required],
    }),
    addressNumber: new FormControl('', {
      validators: [Validators.required],
    }),
    addressPostalCode: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
  });

  ngOnInit(): void {
    const savedForm = localStorage.getItem('signup-form');
    if (savedForm) {
      this.signupForm.patchValue(JSON.parse(savedForm));
    }
    const subscription = this.signupForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        localStorage.setItem('signup-form', JSON.stringify(value));
      });
  }

  onReset() {
    this.signupForm.reset();
  }
  onSubmit() {
    console.log(this.signupForm.value.email);
    console.log(this.signupForm.value.password);
  }
}
