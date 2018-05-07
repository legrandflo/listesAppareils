import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/User.model';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
//on crée un tableau de type users avec User de User.model
  users : User[];
  //on crée une variable pour subscription
  userSubscription : Subscription;
//on importe le service UserService
  constructor(private userService: UserService) { }

  ngOnInit() {
    //creation de la subscription en souscrivant (subscribe) au subject crée dans la service
    this.userSubscription = this.userService.userSubject.subscribe(
      (users: User[]) => { this.users = users; }//il emet un array de type users et on rempli le tableau crée ci dessus
    );
    this.userService.emitUsers();//puis on emet le subject

  }
  //on detruit la subscription (unsubscribe) quand le composant est detruit (ngOnDestroy)
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
