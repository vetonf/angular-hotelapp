import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request Interceptor:', request);

    if(request.method === 'POST') {
      // don't mutate initial value
      const newRequest = request.clone({
        headers: new HttpHeaders({ 'token': '135jk35hlk5o3j5' })
      });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
