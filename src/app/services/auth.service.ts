export class AuthService {
    isAuth = false;
    //2 methodes pour modifier isAuth
//methode pour mettre isAuth a true au bout de 2s
    signIn() {
        return new Promise(
            (resolve) => {
                setTimeout(
                    () => {
                        this.isAuth = true;
                        resolve(true);
                    }, 2000
                );
            }
        );
    }
    signOut(){
        this.isAuth=false;
    }
}