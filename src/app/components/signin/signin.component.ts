import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  signin() {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }
    const signinData = {
      username: this.signinForm.value.username,
      password: this.signinForm.value.password
    };
    this.auth.signin(signinData)
      .subscribe((resp) => {
        this.router.navigate(['/login']);
      });
  }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

}
