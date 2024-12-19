import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingSpinnerService {
  counter = 0;
  loadingVisible = false;

  constructor() { }

  start(){
    this.counter++;
    if (this.counter > 0) {
      this.loadingVisible = true;
    }
  }

  stop(){
    this.counter--;
    if (this.counter < 0) {
      this.counter = 0;
    }
    if (this.counter == 0) {
      this.loadingVisible = false;
    }
  }
}
