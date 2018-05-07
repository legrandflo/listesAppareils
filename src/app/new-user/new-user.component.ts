import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  
  // objet formulaire qui correspondra au formulaire du template
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,//pour creation du nouvel utilisateur
    private router: Router)//pour rediriger utilisateur apres creation du user
     { }

  ngOnInit() {
    this.initForm();
  }
  //methode pour initialiser le formulaire en creant l'objet userForm de type FormBuilder qui est une methode qui retourne un FormGroup
  initForm() {
    this.userForm = this.formBuilder.group(
      //validators pour obliger le remplissage des champs avec required et avec email pour verifier que c'est de la forme adresse mail
      //on peut ne pas mettre de validators exemple : firstName: '',
      { 
        firstName : ['', Validators.required],
        lastName : ['', Validators.required],
        email : ['',[Validators.required, Validators.email]],
        drinkPreference : ['', Validators.required],
        hobbies : this.formBuilder.array([])//initialisation avec array vide
      }
    );
  }
  //methode appelé au submit du formulaire...sans argument
  onSubmitForm() {
    //on recupere le contenu d'un champ grace a userForm.value['firstName'] pour firstName PAS userForm.firstName.value
    //recuperation de la valeur du formulaire dans formValue frace au formControlName
    const formValue = this.userForm.value;
    //creation du nouvel utilisateur, avec l'objet formValue
    const newUser = new User(
      formValue['firstName'],//ESSAI AVEC formValue.firstName????????
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference'],
      formValue['hobbies'] ? formValue['hobbies'] : []//on rempli hobbies avec donnees du formuliare si existe on met formValue['hobbies'] sinon array vide []
    );
    //on ajoute utilisateur dans users du service avec addUser
    this.userService.addUser(newUser);
    //on redirige l'utilisateur vers /users le composant UserListComponent
    this.router.navigate(['users']);
  }
//methode qui permet de retourner la forme array sous forme de forma array: typage
  getHobbies(){
    return this.userForm.get('hobbies') as FormArray;//retourne  le tableau de hobbies rempli dans newUser ci dessus
  }
//methode pour ajouter le tableau au formBuilder 
  onAddHobby(){
    const newHobbyControl = this.formBuilder.control(null,Validators.required);//validators pour obliger a remplir le champ
    this.getHobbies().push(newHobbyControl);
  }

}
