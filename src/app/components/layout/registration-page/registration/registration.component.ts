import { GetDataService } from './../../../../services/get-data.service';
import { RegistrationPageComponent } from './../registration-page.component';
import { Component } from '@angular/core';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(public data: GetDataService, public parent: RegistrationPageComponent) { }

  registration(): void {
    if (this.parent.formReg.invalid) {
      return;
    }

    if (!this.data.userRegData) {
      this.data.userRegData = [{
        email: this.parent.formReg.value.email,
        password: this.parent.formReg.value.password,
        'first-name': this.parent.formReg.value['first-name'],
        'last-name': this.parent.formReg.value['last-name']
      }];

      localStorage.userRegData = JSON.stringify(this.data.userRegData);

    } else if (this.data.userRegData) {
      this.data.userRegData.push(this.parent.formReg.value);
      localStorage.userRegData = JSON.stringify(this.data.userRegData);
    }

    this.parent.formReg.reset();
    this.parent.isReg = false;

  }

  backToLogging(): void {
    console.log(this.parent.isReg, this.parent.formReg);
    this.parent.isReg = false;
  }

}
