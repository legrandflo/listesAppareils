import { Subject } from 'rxjs/Rx';
//pour le serveur HttpClient et injectable
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {
    //creation du subject...on va l'utiliser dans appareil-view.component
    appareilSubject = new Subject<any[]>();
    
    //UTILE SI PAS APPEL A BDD ET AU SERVEUR
    //creation tableau d'objets d'appareils pour le ngFor
    //private pour subject
    private appareils = [
        {
            id : 1,
            name: "Machine à laver",
            status: 'éteint'
        },
        {
            id:2,
            name: "Télévision",
            status: 'allumé'
        },
        {
            id:3,
            name: "Ordinateur",
            status: 'éteint'
        }
    ];
    


constructor(private httpClient :HttpClient){}
//Methode pour emettre le subject
    emitAppareilSubject(){
        //slice pour faire une copie de array appareils
        this.appareilSubject.next(this.appareils.slice());
    }

    //pour retourner id du tableau appareils, find le cherche dans le tableau
    getAppareilByid(id:number) {
        const appareil = this.appareils.find(
            (appareilObject) => {
                return appareilObject.id === id;
            }
        );
        return appareil;
    }
    //2 methodes qui vont etre appeler dans app.component.html
    //methode pour allumer tous les appareils
    switchOnAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'allumé';
        }
        //a ajouter si on utilise le subject appareilSubject
        this.emitAppareilSubject();
    }
    //methode pour éteindre tous les appareils
    switchOffAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'éteint';
        }
        //a ajouter si on utilise le subject appareilSubject
        this.emitAppareilSubject();
    }
//2 méthodes pour eteindre ou allumé un appareil grace a son index recuperer dans app.component.html et passer par input
    switchOnOne(index:number){
        this.appareils[index].status = 'allumé';
        //a ajouter si on utilise le subject appareilSubject
        this.emitAppareilSubject();
    }
    switchOffOne(index:number){
        this.appareils[index].status = 'éteint';
        //a ajouter si on utilise le subject appareilSubject
        this.emitAppareilSubject();
    }

    //methode pour recuperer donnees du formulaire
    addAppareil(name:string, status:string){
        //creation d'un objet pour integrer apres dans la liste
        const appareilObject = {
            id:0,
            name:'',
            status:''
        }
        //remplissage de l'objet
        appareilObject.name = name;
        appareilObject.status = status;
        //pour id on recupere le dernier id de la liste en se positionnant dessus grace a la longueur de la liste -1
        //quand on a id on lui ajoute 1
        appareilObject.id = this.appareils[(this.appareils.length -1)].id + 1;
        //on ajoute l'appareil a la liste 
        this.appareils.push(appareilObject);
        //on va emettre le subject parce que la liste appareils est private et passe par le subject
        this.emitAppareilSubject();
    }
    //methode pour enregistrer les appareils sur serveur
    saveAppareilsToServer(){
        this.httpClient
        //utiliser l'url de la base donnée apr firebase, y ajouter le path ou les appareils seront enregistrés /appareils.json
        //puis 2iem argument ce qu'on veut ajouter this.appareils
        //put a la place de post sinon le contenu est ajouter automatiquement...put permet d'écraser les donnees si ce qu'on envoie existe déjà
        //si on modifie allumage ca modifie dans la base
        .put('https://httpclient-demo-b396a.firebaseio.com/appareils.json',this.appareils)
        //httpClient est une observable donc subscribe
        .subscribe(
            () => {console.log('Enregistrement terminé !');},
            (error) => { console.log('Erreur de sauvegarde !' + error);}
        )
    }
    ///methode pour recuperer les donnees de la BDD du serveur
    getAppareilsFromServer(){
        this.httpClient
            .get<any[]>('https://httpclient-demo-b396a.firebaseio.com/appareils.json')
            .subscribe(
                (response) => {
                                //on met la reponse du serveur dans la liste des appareils, il faut preciser au get que c'est un tableau d'objet avec any[]
                               this.appareils = response;
                               console.log('Données récupérées !',response);
                               this.emitAppareilSubject();//on emet le subject pour lié avec le service et pour voir le changement
                                },
                (error) => { console.log('Erreur de chargement !' + error);}
            );
        }
}