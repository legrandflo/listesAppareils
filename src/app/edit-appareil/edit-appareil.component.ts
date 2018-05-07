import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppareilService } from '../services/appareil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss']
})
export class EditAppareilComponent implements OnInit {

  defaultOnOff="éteint";

  //on injecte le service pour avoir methode addAppareil et le router pour rediriger utilisateur vers la liste quand le formulaire est rempli
  constructor(private appareilService : AppareilService, private router:Router) { }

  ngOnInit() {
  }
  //methode appelé au submit du formulaire...ce qui est récupérer form est de type ngForm
onSubmit(form : NgForm){
  console.log(form.value);
  //on recupere les donnees du formulaire
  const name = form.value['name'];
  const status = form.value['status'];
  //on les transmet au service pour remplir la liste qui est dans le service
  this.appareilService.addAppareil(name,status);
  //on redirige utilisateur vers la liste appareils grace au path /appareil de app.module.ts pour qu'il voit l'ajout
  this.router.navigate(['appareils']);
}
}
