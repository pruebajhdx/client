import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  token: string = '';
  user!: void;

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
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (data) => {
        console.log(data);
        // Guardar token de autenticación en localStorage o en una cookie
        this.token = data.token;
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', this.token);
        localStorage.setItem('user_id', data.user.id);
        this.router.navigate(['/home']);
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }
}
