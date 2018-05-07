import { Component, OnInit, OnDestroy } from '@angular/core';
//import { AppareilService } from './services/appareil.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  //secondes correspond aux nombres de seconde depuis que utilisateur est connecté
  secondes : number;
  //cette propriété servira a eviter les comportements infini comme notre compteur qui ne fini jamais
  counterSubscription : Subscription;

  constructor(){}

  ngOnInit(){
    //creation d'un observable qui émet un chiffre toutes les secondes
    const counter = Observable.interval(1000);
    //souscription a observable, le compteur fonctionne mais est infini
    /*
    counter.subscribe(
          (value:number) =>{ this.secondes = value;},
          (error:any) => { console.log('Une erreur a été rencontrée !');},
          () => { console.log('Observable complétée')}
          //ici on aura ni erreur ni complete car notre observable va compter jusqu'a infini
    )
    */
   //OU
   //avec une subscription ca donne en ajoutant aussi ngOnDestroy
   this.counterSubscription = counter.subscribe(
    (value:number) =>{ this.secondes = value;},
    (error:any) => { console.log('Une erreur a été rencontrée !');},
    () => { console.log('Observable complétée')}
   );
  }
  ngOnDestroy () {
    this.counterSubscription.unsubscribe();
  }

//TOUT LE CONTENU EST PASSER DANS appareil-view.component.ts
  /*
  isAuth = false;

  lastUpdate = new Date();
  //avec async
  lastUpdate2 = new Promise(
    (resolve, reject) => {
      const date = new Date();
      setTimeout(
        () => {
          resolve(date);
        }, 2000
      );
    }
  )
  //creation tableau d'objets d'appareils pour le ngFor
  // mis dans service
  //appareils=[
  //  {
  //    name:"Machine à laver",
  //  status : 'éteint'
  //},
  //{
  //  name:"Télévision",
  //status : 'allumé'
  //},
  //{
  //  name:"Ordinateur",
  //status : 'éteint'
  //}
  //]
  
  //remplacer par la variable appareils et la methode dans ngonInit pour le remplir
  appareils: any[];


  //sans ngFor 
  //variable appelée dans app.component.html et lié à appareilName de appareilComponent grace a balise app-appareil
  appareilOne = "Machine à laver";
  appareilTwo = "Télévision";
  appareilThree = "Ordinateur";

  constructor(private appareilService: AppareilService) {

    //creation timeOut pour modifier isAuth, desactivé au depart, activé au bout de 4s
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }
  ngOnInit() {
    //initialisation de appareils avec le tableau qui est dans le service
    this.appareils = this.appareilService.appareils;
  }
  //2 methodes qui utilisent les methodes switchOnAll et switchOffAll du service
  onAllumer() {
    //console.log('On allume tout!');
    this.appareilService.switchOnAll();
  }
  onEteindre() {
    //console.log('On allume tout!');
    this.appareilService.switchOffAll();

  }
  */
}
