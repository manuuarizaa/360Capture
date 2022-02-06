import { Injectable } from '@angular/core';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private toast: ToastService) { }

  checkCamName(name: string): boolean{
    let valid: boolean = false;
    if(name.length === 10)
      valid = true;
    else
      this.toast.presentToastError('Invalid Serial Number');
    return valid;
  }

  checkPassword(password: string): boolean{
    let valid: boolean = false;
    if(password.length > 0 && password.length < 30)
      valid = true;
    else
      this.toast.presentToastError('Invalid Password');
    return valid;
  }
}
