import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingStatus {

  private isLoading: BehaviorSubject<boolean>;

  constructor() {
    this.isLoading = new BehaviorSubject(false);
  }

  public set(isVisible: boolean): void {
    this.isLoading.next(isVisible);
  }

  public get(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}
