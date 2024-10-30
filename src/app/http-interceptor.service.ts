import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CommonService } from './shared/services/common.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(public router: Router, private commonService: CommonService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.commonService.getToken();
    let request = req;
    if (token) {
      request = request.clone({
        setHeaders: {
          authorization: token,
        },
      });
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (
              event.body.status == false &&
              event.body.message == 'Invalid Token'
            ) {
              localStorage.clear();
              this.router.navigate(['/login']);
            }
          }
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }
}
