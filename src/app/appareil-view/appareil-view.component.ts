import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {
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
  /* mis dans service
  appareils=[
    {
      name:"Machine à laver",
    status : 'éteint'
  },
  {
    name:"Télévision",
  status : 'allumé'
  },
  {
    name:"Ordinateur",
  status : 'éteint'
  }
  ]
  */
  //remplacer par la variable appareils et la methode dans ngonInit pour le remplir
  appareils: any[];

  //utilisation du subject crée dans appareil.service
  appareilSubscription : Subscription;

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
    //this.appareils = this.appareilService.appareils;
    //OU
    //avec le subject appareilSubscription ca donne
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(//on rempli appareils
      (appareils:any[]) =>{ this.appareils = appareils; });//appareils blanc vient du service avec subject, le rouge est celui du fichier ou on est
    this.appareilService.emitAppareilSubject();//on emet le subject, la copie des appareils du service
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

  //methode pour declencher enregistrement dans BDD en appelent la methode du service qui le fait
  onSave(){
    this.appareilService.saveAppareilsToServer();
  }

  //methode pour recuperer les appareils de la BDD en appelant getAppareilsFromServer qui utilise get
  onFetch(){
    this.appareilService.getAppareilsFromServer();

  }
}

