import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Token session storage
    let token: any = localStorage.getItem('token');
    let request = req;
    // Validate if token exist
    if (token) {
      // Token clone
      request = req.clone({
        setHeaders: {
          // Bearer + token
          authorization: `Bearer ${ token }`
        }
      });
    }
    return next.handle(request);
  }
}


