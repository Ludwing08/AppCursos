import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  async loginFacebook(){
    try {
      const user = await this.loginService.loginFacebook()
      if(user){
        //Check Email
        console.log('User ->', user)
        console.log('Verificado' , user.emailVerified)
        this.validar(true)
      }
    } catch (error) {
      console.log('Error =>', error )
    }
  } 
  
  async loginGoogle(){
    try {
      const user = await this.loginService.loginGoogle()
      if(user){
        //Check Email
        console.log('User ->', user)
        console.log('Verificado' , user.emailVerified)
        this.validar(user.emailVerified)

      }
    } catch (error) {
      console.log('Error =>', error )
    }
  }

  validar(dato:Boolean){
    if(dato){
      this.router.navigate(['tabs/tab1'])
    }else{
      this.router.navigate(['login'])
    }
  }



}
