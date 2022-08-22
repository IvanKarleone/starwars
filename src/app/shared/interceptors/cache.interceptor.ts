import { Inject, Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of, tap } from "rxjs";
import { CHARACTER_FILMOGRAPHY_URL } from "../helpers/urls";
import { STORAGE_TOKEN } from "../tokens/storage.token";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private readonly cachedUrls = [
    CHARACTER_FILMOGRAPHY_URL
  ];

  constructor(@Inject(STORAGE_TOKEN) private storage: Storage) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedItem = this.storage.getItem(request.url);
    if (cachedItem) {
      // метод intercept обязательно должен возвращать Observable<HttpEvent<any>>
      const response = this.createHttpResponse(JSON.parse(cachedItem));
      return of(response);
    }

    return next.handle(request).pipe(
      tap((response) => {
        if (this.isCached(request, response)) {
          const cachedItem = JSON.stringify(response);
          this.storage.setItem(request.url, cachedItem);
        }
      })
    );
  }

  private isCached(request: HttpRequest<any>, response: HttpEvent<any>): boolean {
    const isCachedUrl = this.cachedUrls.some((url: string) => request.url.includes(url));
    return isCachedUrl && response instanceof HttpResponse;
  }


  private createHttpResponse(object: Object): HttpResponse<any> {
    return new HttpResponse<any>(object);
  }
}

