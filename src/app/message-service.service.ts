import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  constructor() { }

  private message: string = ''; // Message Store

  // Message Set 
  setMessage(value: string) {
    this.message = value;
  }

  // Message Get 
  getMessage(): string {
    return this.message;
  }

  // Message Clear 
  clearMessage() {
    this.message = '';
  }
}
