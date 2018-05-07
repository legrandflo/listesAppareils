//Le service est utilisé dans app.module pour autentifier les utilisateurs avant affichage des appareils
//le service AuthGuard verifie si isAuth (modifier dans auth.component quand il y a connexion ou non) est true
//si true  alors canActivate est true 
//sinon il redirige vers route /auth le composant de connexion

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

constructor(private authService:AuthService, private router:Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        if(this.authService.isAuth){
            return true;
        }else {
            this.router.navigate(['/auth']);
        }

    }
}