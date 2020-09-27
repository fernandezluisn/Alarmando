import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../servicios/auth-service.service';
import { Vibration } from '@ionic-native/vibration/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  pepe;
  x;
  a:string;
  rojo=false;

  private hurtando= new Audio("../assets/audio/Hurtando.mp3");
  private Epa= new Audio("../assets/audio/Epa.mp3");
  private buenas= new Audio("../assets/audio/Descanso.mp3");

  constructor(public alertController: AlertController, private nativeAudio: NativeAudio
    , private service:AuthServiceService, private router:Router, private vibra:Vibration) {
      window.addEventListener("orientationchange", ()=> {
        this.x = window.screen.orientation.angle;  
        if(this.rojo){
          if(this.rojo && (this.x==90 || this.x==-90)){
            this.hurtando.play();
            this.Epa.pause();
            this.Epa.currentTime=0;
            this.vibra.vibrate(5000);
          }          
          else if(this.rojo && (this.x==0 || this.x==180)){
            this.Epa.play();
            this.hurtando.pause();
            this.hurtando.currentTime=0;
            this.vibra.vibrate(5000);
          }
        }else{
            this.hurtando.pause();
            this.hurtando.currentTime=0;
            this.Epa.pause();
            this.Epa.currentTime=0;
            this.buenas.pause();
            this.buenas.currentTime=0;
          }
           
        
             
      })
  }   
  


  activar(){
    this.pepe=document.getElementById("pepe");
    if(this.rojo){
      this.pepe.style.backgroundColor = 'black';
      this.rojo=false;      
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
      subHeader: 'Error en el audio',
      message: mensaje,
      buttons: ['OK']
    });

    (await alert).present();
  }

  

  IonViewWillLeave(){
    this.nativeAudio.unload('lobo');
    this.nativeAudio.unload('alarma');
    this.nativeAudio.unload('hola');
  }

  salir(){
    this.rojo=false;  
    this.service.logOutUser();    
    this.router.navigate(['login']);

  }

}
