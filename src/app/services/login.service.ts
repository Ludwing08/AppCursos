import { Injectable } from '@angular/core';
import { User } from '../models/users.interface';

import {AngularFireAuth} from '@angular/fire/compat/auth'

//Google y Facebook
import { getAuth, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth'
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user$ : Observable<any> = null;


  constructor(private afAuth : AngularFireAuth, private afs: AngularFirestore) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap( (user) =>{
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null)
      } )
    )
  }

  async register(email : string , password : string) : Promise<User>{
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log('Error -->' , error)
    }
  }

  async sendVerificationEmail() : Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error -->' , error)
    }
  }

  isEmailVerified( user : User){
    return user.emailVerified === true ? true : false
  }

  async logout(): Promise<void>{
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error->' , error)
    }

  }

  async login(email : string , password : string): Promise<User>{

    try {
      const {user} = await this.afAuth.signInWithEmailAndPassword(email, password)
      return user;
    } catch (error) {
      console.log('Error->' , error)
    }

  }
  
  async loginGoogle(): Promise<User>{
    try {
      const {user} = await this.afAuth.signInWithPopup(new GoogleAuthProvider())
      this.updateUserData(user)
      return user
    } catch (error) {
      console.log('Error->' , error)
    }
  }

  async loginFacebook(): Promise<User>{
    try {
      const {user} = await this.afAuth.signInWithPopup(new FacebookAuthProvider())
      this.updateUserData(user)
      return user
    } catch (error) {
      console.log('Error->' , error)
    }

  }

  private updateUserData( user : User){
    const userRef : AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)

    const data : User = {
      uid : user.uid,
      email : user.email,
      emailVerified : user.emailVerified,
      displayName: user.displayName
    };

    return userRef.set(data, {merge : true})
  }

}
