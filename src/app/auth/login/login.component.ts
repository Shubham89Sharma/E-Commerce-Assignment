import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  subscribedObj: any;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.subscribedObj = this.apiService
        .commonPost('auth/login', this.loginForm.value)
        .subscribe({
          next: (res: any) => {
            if (res) {
              localStorage.setItem('userinfo', JSON.stringify(res));
              this.router.navigateByUrl('home');
              this.toastr.success('LoggedIn Successfully!', 'Success', {
                timeOut: 3000,
              });
            } else {
              this.toastr.error(res.message, 'Error', {
                timeOut: 3000,
              });
            }
          },
          error: (err) => {
            this.toastr.error(err.message, 'Error', {
              timeOut: 3000,
            });
          },
          complete() {},
        });
    } else {
      this.toastr.error('Invalid Form', 'Error', {
        timeOut: 3000,
      });
    }
  }
}
