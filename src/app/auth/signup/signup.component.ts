import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  subscribedObj: any;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      avatar: ['https://i.imgur.com/LDOO4Qs.jpg']
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.signupForm)
    if (this.signupForm.valid) {
      // let payload = {
      //       name: this.signupForm.value.name,
      //       email: this.selectedFilterData?.filterType
      //         ? this.selectedFilterData?.filterType
      //         : 1,
      //       searchValue: this.selectedFilterData?.filterValue
      //         ? this.selectedFilterData?.filterValue
      //         : '',
      // };
      this.subscribedObj = this.apiService
        .commonPost('users', this.signupForm.value)
        .subscribe({
          next: (res: any) => {
            if (res) {
              this.router.navigateByUrl('home/auth/login');
              this.toastr.success('Successfully Registered!', 'Success', {
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
