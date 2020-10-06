import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../servicios/auth-service.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  ishidden=true;
  pepe;
  x;
  a:string;
  rojo=false;
  password:string;
  user;
  

  private hurtando= new Audio("../assets/audio/Hurtando.mp3");
  private Epa= new Audio("../assets/audio/Epa.mp3");
  private buenas= new Audio("../assets/audio/Descanso.mp3");
  private lobo= new Audio("../assets/audio/wolf.mp3");

  constructor(public alertController: AlertController, private service:AuthServiceService, private router:Router, private vibra:Vibration,
    private flashlight: Flashlight) {
      this.service.tomarUsuario().then(element=>
        {
          this.user=element;
        })

      window.addEventListener("orientationchange", ()=> {
        this.x = window.screen.orientation.angle;  
        if(this.rojo){
          if(this.rojo && (this.x==90 || this.x==-90)){
            this.buenas.play();            
            this.vibra.vibrate(5000);
            if(this.flashlight.isSwitchedOn)
            flashlight.switchOff();
          }          
          else if(this.rojo && (this.x==0 || this.x==180)){
            this.Epa.play();            
            this.flashlight.switchOn();
          }
        }else{
           
            if(this.flashlight.isSwitchedOn){
              this.flashlight.switchOff();
            }
              
          }
           
        
             
      })
  }  
  
  apagarAlarma(){
    
    this.service.tomarUsuario().then(element=>
      {
        
        this.user=element;        
        this.service.loginUser(this.user.email, this.password).then(res=>{
          this.rojo=false;
          this.lobo.play();
          this.pepe.style.backgroundColor = 'black';
          this.rojo=false;  
          this.ishidden=true; 
        }).catch(error=>{
          this.vibra.vibrate(600);
          this.hurtando.play();   
          this.ishidden=true;    
          this.alertar("Esa no es la contraseña"); 
        });
      })

   
    
  }

  activar(){
    this.pepe=document.getElementById("pepe");
    if(this.rojo){
      this.ishidden=false;         
    }else{
      this.pepe.style.backgroundColor = 'red';   
      this.rojo=true;       
      this.Epa.play();
    }    
    
  }

  async alertar(mensaje:string){
    const alert= this.alertController.create({
      cssClass: 'danger-alert-btn',
      header: 'Error',
      subHeader: 'Datos mal ingresados',
      message: mensaje,
      buttons: ['OK']
    });

    (await alert).present();
  }

  

 
  salir(){
    this.rojo=false;  
    if(this.flashlight.isSwitchedOn)
        this.flashlight.switchOff();
    this.service.logOutUser();    
    this.router.navigate(['login']);
    
  }

 



}
