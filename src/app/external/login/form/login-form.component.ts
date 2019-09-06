import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/common/utils/util.service';
import { LoginService } from 'src/app/common/services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestResponse } from 'src/app/common/models/rest-response.model';
import { User } from 'src/app/common/models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public form: FormGroup;
  public hide = true;

  constructor(private builder: FormBuilder,
    private util: UtilService,
    private service: LoginService,
    private router: Router) {

    this.form = this.createForm();
  }

  ngOnInit() {
  }

  public login(user: User): void {
    this.service.post(user).subscribe((res: RestResponse) => {
      this.util.setAuth(res.data);
      this.util.snackMsg(res.message);
      this.util.goTo(this.router, 'app/products');
    });
  }

  private createForm(): FormGroup {
    return this.builder.group({
      email: ['', [
        Validators.email,
        Validators.required,
        Validators.maxLength(200)
      ]],
      password: ['', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(6)
      ]]
    });
  }

}
