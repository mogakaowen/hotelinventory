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

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request Interceptor called', request);
    if (request.method === 'POST') {
      console.log('POST request intercepted');
      const newRequest = request.clone({ headers: new HttpHeaders({ 'token': 'my-auth-token99998888777' }) });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
