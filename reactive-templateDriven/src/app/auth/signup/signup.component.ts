import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

function equalValues(controlOne: string, controlTwo: string) {
  return (controls: AbstractControl) => {
    const val1 = controls.get(controlOne)?.value;
    const val2 = controls.get(controlTwo)?.value;
    if (val1 === val2) {
      return null;
    }
    return { notEqual: true };
  };
}

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
      updateOn: 'change',
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
          updateOn: 'change',
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
          updateOn: 'change',
        }),
      },
      {
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),
    firstName: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    addressStreet: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    addressCity: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    addressNumber: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    addressPostalCode: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] }),

    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),

    agree: new FormControl(false, {
      validators: [Validators.required],
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
    if (this.signupForm.invalid) {
      console.log(this.signupForm);
      console.log('invalid form - please check your inputs');

      return;
    }
    console.log(this.signupForm.value.email);
    console.log(this.signupForm.controls.passwords.value.password);
  }
}
