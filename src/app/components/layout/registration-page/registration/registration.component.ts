import { GetDataService } from './../../../../services/get-data.service';
import { RegistrationPageComponent } from './../registration-page.component';
import { Component } from '@angular/core';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../registration-page.component.scss']
})
export class RegistrationComponent {

  constructor(public data: GetDataService, public parent: RegistrationPageComponent) { }

  registration(): void {
    if (this.parent.formReg.invalid) {
      return;
    }
    const sub = this.data.registration(this.parent.formReg.value).subscribe(reqData => reqData);
    this.parent.formReg.reset();
    this.parent.isReg = false;
    sub.unsubscribe();
  }

  backToLogging(): void {
    this.parent.isReg = false;
  }

}
