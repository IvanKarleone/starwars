import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class NotFoundInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 404) {
          this.router.navigateByUrl('/not-found');
        }

        return throwError(() => new Error(errorResponse.message));
      })
    );
  }
}

