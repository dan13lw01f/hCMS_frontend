import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const loginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.auth.login(loginData)
      .subscribe((resp) => {
        this.router.navigate(['/admin']);
      });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


}
