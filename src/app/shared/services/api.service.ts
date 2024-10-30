import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
    } else {
    }
    return throwError(error.error);
  }

  commonGet(url: string): Observable<any> {
    return this.http
      .get(this.baseUrl + `${url}`)
      .pipe(catchError(this.handleError));
  }

  commonGetWithParam(url: any, param: any) {
    return this.http
      .get(this.baseUrl + `${url}`, { params: param })
      .pipe(catchError(this.handleError));
  }

  commonPost(url: string, body: any): Observable<any> {
    return this.http
      .post(this.baseUrl + `${url}`, body)
      .pipe(catchError(this.handleError));
  }
}
