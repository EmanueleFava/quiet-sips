import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-signup-form',
  standalone: false,
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent {
  error = false;
  isLogged = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private auth: AuthService
  ) {}

  registrationForm = new FormGroup(
    {
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        this.gmailValidator,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: this.passwordMatchValidator }
  );

  submitted = false;

  get nome() {
    return this.registrationForm.get('nome');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      //  aggiungere hash della password poi
      const formValues = this.registrationForm.value;
      const user: User = {
        id: crypto.randomUUID(),
        username: formValues.nome ?? '',
        email: formValues.email ?? '',
        password: formValues.password ?? '',
        role: 'user',
        imgUrl: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
        bookIds: [],
        reviewIds: [],
      };

      this.userService.addUser(user).subscribe((success) => {
        if (success) {
          this.submitted = true;
          this.error = false;
          setTimeout(() => this.router.navigate(['/login']), 3000);
        } else {
          this.error = true;
        }
      });
    }
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  gmailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (email && !email.endsWith('@gmail.com')) {
      return { gmail: true };
    }
    return null;
  }
}
