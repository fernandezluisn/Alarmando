import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;
  
  constructor(private servicio:AuthServiceService, private router:Router, public alertController: AlertController ) { 
    this.email="";
    this.password="";
  }

  ngOnInit() {
  }

  async alertar(mensaje:string){
    const alert= this.alertController.create({
      cssClass: 'danger-alert-btn',
      header: 'Error',
      subHeader: 'Subtitle',
      message: mensaje,
      buttons: ['OK']
    });

    (await alert).present();
  }

  login(){
    this.servicio.loginUser(this.email, this.password).then(res=>{
      this.router.navigate(['home']);
    }).catch(error=>{
      this.alertar(error.message);      
    });
  }

  registrar(){
    this.servicio.registrarUsuario(this.email, this.password).then(res=>{
      this.router.navigate(['home']);
    }).catch(error=>{
      this.alertar(error.message);     
    });
  }

}
