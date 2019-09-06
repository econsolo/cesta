import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { LoadingStatus } from './loading.status';
import { catchError, finalize, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { UtilService } from './util.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private loadingStatus: LoadingStatus,
        public utilService: UtilService) { }

    // intercet all http requests
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.loadingStatus.set(true);

        return next.handle(request).pipe(
            map(event => {
                return event;
            }),
            catchError(err => {
                const msg = 'Ocorreu um erro não esperado.';
                this.utilService.snackMsg(msg);
                return throwError(err);
            }),
            finalize(() => {
                this.loadingStatus.set(false);
            })
        );
    }
}