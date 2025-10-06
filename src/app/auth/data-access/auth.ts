import { Injectable, inject} from '@angular/core';
import { Auth as FirebaseAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from '@angular/fire/auth';

export interface User
{
  email: string;
  password: string;
}

@Injectable
({
  providedIn: 'root'
})

export class Auth
{
  private _auth =  inject(FirebaseAuth);

  signUp(user: User)
  {
    return createUserWithEmailAndPassword
    (
      this._auth, 
      user.email,
       user.password
    );
  }

  signIn(user: User)
  {
    return signInWithEmailAndPassword(this._auth, user.email, user.password); 

  }

  signInWithGoogle()
  {
    const provaider = new GoogleAuthProvider();
    provaider.setCustomParameters({prompt: 'select_account'});
    return signInWithPopup(this._auth, provaider);
  }
}
