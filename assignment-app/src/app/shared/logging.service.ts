import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(assignementName: string, action: string) {
    console.log("assignment " + assignementName + " " + action);
  }

}
