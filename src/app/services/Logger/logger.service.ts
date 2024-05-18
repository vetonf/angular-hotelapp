import { Injectable } from '@angular/core';

/** removes registering of the service raises an ExceptionError
 * this can be solved by either registering the service as usual OR use the @Optional identifier/decorator in the component which introduces the service in its constructor
 * here: look at the contructor of app.components.ts
{
  providedIn: 'root'
}
*/

@Injectable()
export class LoggerService {

  constructor() { }

  log(msg: string): void {
    console.log("LoggerService message:", msg);
  }
}
