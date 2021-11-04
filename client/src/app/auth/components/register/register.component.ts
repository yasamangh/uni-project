import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  loading = false;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.errorMessage = '';
    if (this.fullName && this.password && this.email && this.confirmPassword) {
      if(this.password.length < 6 ){
        this.errorMessage = 'رمز عبور نمی تواند کمتر از 6 کارکتر باشد';
        console.log(this.password.length);
        
      }
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'رمز عبور منطبق نمی باشد';
      } else {
        this.loading = true;
        this._auth
          .register({
            fullName: this.fullName,
            email: this.email,
            password: this.password,
          })
          .subscribe(
            (res) => {
              console.log(res);
              this.loading = false;
              this._router.navigate(['/login']);
            },
            (err) => {
              this.errorMessage = err.error.message;
              this.loading = false;
            }
          );
      }
    } else {
      this.errorMessage = 'مجددا اطلاعات را بررسی کنید';
    }
  }

  canSubmit(): boolean {
    return this.fullName && this.email && this.password && this.confirmPassword
      ? true
      : false;
  }
}
