import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { RouteStack } from '../models/route-stack';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';

declare var swal: any;

@Injectable()
export class UtilService {

  private routeStack = [] as RouteStack[];
  private key: string = environment.login_key;

  constructor(private snackBar: MatSnackBar) { }

  static validateProductCode(control: AbstractControl): ValidationErrors | null {
    const returnError = {productcode: true};
    const value = control.value;

    if (!value) return returnError;

    if (value.length !== 6) return returnError;

    if (!value.match(/[a-zA-Z]{1}[0-9]{1}-[0-9]{3}/g)) return returnError;

    return null;
  }

  public isLogged(): boolean {
    const auth = localStorage.getItem(this.key);
    return !!auth;
  }

  public setAuth(auth: Auth): void {
    localStorage.clear();
    localStorage.setItem(this.key, JSON.stringify(auth));
  }

  public getAuth(): Auth {
    return JSON.parse(localStorage.getItem(this.key));
  }

  public showErrors(form: any): void {
    if (!form) {
      throw new Error('[showErrors] O FormGroup não deve estar nulo!');
    }
    Object.keys(form.controls).forEach(key => {
      const field = form.get(key);

      // if the FormGroup has another FormGroup inside, instead of AbstractControl
      if (field['controls']) {
        this.showErrors(field);
      } else {
        field.markAsTouched();
      }
    });
  }

  public errorDialog(msg: string = 'Ocorreu um erro não esperado :(',
    callback: Function = () => { }): void {
    swal({
      title: 'Erro',
      text: msg,
      icon: 'error',
      button: 'Roger that',
    }).then(callback);
  }

  public successDialog(msg: string, callback: Function = () => { }): void {
    this.validateMsg(msg);
    swal({
      title: 'Success!',
      text: msg,
      icon: 'success',
      button: 'Done',
    }).then(callback);
  }

  public promptDialog(msg: string, title: string, callback: Function = () => { }): void {
    this.validateMsg(msg);
    swal({
      title: title,
      text: msg,
      icon: 'success',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'E-mail address',
          type: 'email',
        },
      },
      button: 'Done',
    }).then(callback);
  }

  public snackMsg(msg: string): Observable<MatSnackBarDismiss> {
    this.validateMsg(msg);
    const sb = this.snackBar.open(msg, null, {
      duration: 3000
    });
    return sb.afterDismissed();
  }

  public confirmDialog(msg: string, title: string, callback: Function): void {
    this.validateMsg(msg);
    this.validarCallback(callback);
    swal({
      title: title,
      text: msg,
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'Cancel',
          value: false,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: 'Roger that',
          value: true,
          visible: true,
          closeModal: true
        }
      }
    }).then(callback);
  }

  private validateMsg(msg: string): void {
    if (!msg) {
      throw new Error('É obrigatório definir uma mensagem');
    }
  }

  private validarCallback(callback: Function): void {
    if (!callback) {
      throw new Error('É obrigatório definir um callback');
    }
  }

  public goTo(router: Router, route: string, ...params: any[]): void {
    if (params && params.length) {
      router.navigate(this.separateArray(route, params));
    } else {
      router.navigate([route]);
    }
    this.routeStack.push({
      route: route,
      caller: router.url,
      params: params ? params : []
    } as RouteStack);
  }

  private separateArray(route: string, params): string[] {
    const array = [];

    array.push(route);

    if (typeof params === 'string') {
      array.push(params);
      return array;
    }

    for (let i = 0; i < params.length; i++) {
      array.push(params[i]);
    }

    return array;
  }

  public backToCaller(router: Router, defaultBackRoute: any[]): void {
    if (!this.isStackEmpty()) {
      const unstacked = this.routeStack.pop();
      router.navigate([decodeURI(unstacked.caller)]);
    } else {
      router.navigate(defaultBackRoute);
    }
  }

  private isStackEmpty(): boolean {
    return !this.routeStack || !this.routeStack.length;
  }

}
