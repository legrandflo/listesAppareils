import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//pour utiliser une BDD
import { HttpClientModule} from '@angular/common/http'


import { AppComponent } from './app.component';
import { AppareilComponent } from './appareil/appareil.component';
//FormsModule pour utiliser le two way binding
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppareilService } from './services/appareil.service';
import { AuthComponent } from './auth/auth.component';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuard } from './services/auth-guard.service';
import { EditAppareilComponent } from './edit-appareil/edit-appareil.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './services/user.service';
import { NewUserComponent } from './new-user/new-user.component';

const appRoutes: Routes = [
  //L'app demarre par AuthCompnent  grace a canActivate de 1ere path et AuthGuard qui redirige utilisateur vers AuthComponent(connexion) car au depart isAuth est false
  //il faut proteger avec canActivate les 3 routes principales de l'app 
  {path:'appareils', canActivate:[AuthGuard], component: AppareilViewComponent},//canActivate redirige vers service AuthGuard pour authentification, lien dans navbar de app.component.html
  {path:'appareils/:id',canActivate:[AuthGuard], component: SingleAppareilComponent},//lien utilisé dans appareil.component.html
  {path: 'edit', canActivate:[AuthGuard], component : EditAppareilComponent},//route pour formulaire template, lien dans navbar de app.component.html
  {path:'auth', component: AuthComponent},//lien dans navbar de app.component.html
  {path:'users', component: UserListComponent},//lien dans navbar de app.component.html
  {path:'new-user', component: NewUserComponent},//route pour formulaire Reactive, utilisé dans user-list.component.html
  {path:'', canActivate:[AuthGuard], component: AppareilViewComponent},
  {path:'not-found', component: FourOhFourComponent},//notfound est une page 404
  {path:'**', redirectTo: '/not-found'}//pour rediriger vers notfound qd on rentre une url qui existe pas, une autre que celle ecrite au dessus
];


@NgModule({
  declarations: [
    AppComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent,
    SingleAppareilComponent,
    FourOhFourComponent,
    EditAppareilComponent,
    UserListComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [AppareilService,AuthService, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
