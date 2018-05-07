import { Subject } from 'rxjs/Subject';
import { User } from '../models/User.model';

export class UserService {
    //creation d'un users (contient un tableau de type User) grace au modele User de User.model
    //on le rempli au depart pour verifier que ca fonctionne
    
    private users : User[] = [
        {
            firstName: 'James',
            lastName: 'Smith',
            email : 'james@smith.com',
            drinkPreference : 'Coca',
            hobbies: ['coder','la degustation de café']
        }
    ];
/* OU
    private users: User[] = [
        new User('Will', 'Alexander', 'will@will.com', 'jus d\'orange', ['coder', 'boire du café'])
    ];
*/

    //on crée un subject qui emettra des arrays d'objets de type User
    userSubject = new Subject<User[]>();

    //methode qui va utiliser le subject et le next pour emettre une copie (slice) du tableau users
    emitUsers(){
        this.userSubject.next(this.users.slice())
    }

    //methode qui permet d'ajouter un user et qui emet ajout dans le tableau
    addUser (user: User){
        this.users.push(user);
        this.emitUsers();
    }
}