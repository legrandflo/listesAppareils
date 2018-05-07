import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  //variable qui recupere isAuth du service
  authStatus: boolean;

  //Router pour utiliser navigate
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }
//methode pour la connexion
  onSignIn() {
        //utilise la methode crée dans service pour modifier isAuth
    this.authService.signIn().then(
      () => {
        console.log('Connexion réussie!!');
        //recupere isAuth est le met dans authSatus pour utiliser dans auth.component.html
        this.authStatus = this.authService.isAuth;
        //navigation vers la route appareils quand on est connecté
        this.router.navigate(['appareils'])
      }
    )
  }
//methode pour la deconnexion
  onSignOut() {
    //utilise la methode crée dans service pour modifier isAuth
    this.authService.signOut();
    console.log('Déconnexion réussie!!');
    //recupere isAuth est le met dans authSatus pour utiliser dans auth.component.html
    this.authStatus = this.authService.isAuth;
  }
}
