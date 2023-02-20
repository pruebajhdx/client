import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading!: boolean;
  errorMessage: string = '';
  token: string = '';
  user!: void;
  email: string = '';
  password: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.isLoading = true;
    this.userService.login(this.email, this.password).subscribe(
      (data) => {
        this.isLoading = false;
        // Guardar token de autenticación en localStorage o en una cookie
        this.token = data.token;
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', this.token);
        localStorage.setItem('user_id', data.user.id);
        this.router.navigate(['/home']);
      },
      (err) => {
        alert(err.error.message);
        this.isLoading = false;
      }
    );
  }
}
