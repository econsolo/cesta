import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UtilService } from './util.service';

@Injectable()
export class RouteGuard implements CanActivate {

    constructor(private util: UtilService,
        private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.util.isLogged()) {
            this.util.snackMsg('Você não está autorizado à acessar a funcionalidade!');
            this.router.navigate(['/auth/login']);
            return false;
        }

        return true;

    }
}
