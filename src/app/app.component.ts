import { Component } from '@angular/core';
import 'rxjs/add/observable/interval';
import * as io from "socket.io-client";
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  instruccion: number;
  progress;
  countDown;
  count;

  private url = 'http://ec2-18-188-150-180.us-east-2.compute.amazonaws.com:8080';
  private socket: SocketIOClient.Socket;

  instrucciones = ["Aprieta botón rojo", 
                  "Aprieta botón verde", 
                  "Aprieta botón azul", 
                  "Aprieta botón amarillo",
                  "Aprieta botón blanco",
                  "Aprieta botón morado",
                  "Eleva la temperatura del sensor",
                  "Tapa el sensor de luz",
                  "Mueve el servo a 0 grados",
                  "Mueve el servo a 90 grados",
                  "Mueve el servo a 180 grados",
                  "LED central a rojo",
                  "LED central a verde",
                  "LED central a azul",
                  "LED central a amarillo (rojo y verde)",
                  "LED central a morado (rojo y azul",
                  "LED central a cyan (verde y azul)"
                  ];

  constructor() {
  
  }

  ngOnInit(): void {
    this.resetTimer();
    this.socket = io.connect(this.url);
    this.socket.on('news', (data) => {
      console.log('news: '+ JSON.stringify(data));
      this.instruccion = parseInt(data.id);
      this.progress = data.progress;
      console.log(this.instruccion);
      this.resetTimer();
    });
  }

  randomInt(min, max){
    this.progress =  Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getProgress(){
    return(this.progress + "%");
  }

  resetTimer(){
    this.count=11;
    this.countDown=11;
    this.countDown = timer(0,1000).pipe(
      take(this.count),
      map(() => {
         if(this.count==1){
            this.makePetition();
            this.resetTimer();
         }
          return --this.count;
        })
    );
  }

  makePetition(){
    this.socket.emit('timeOuta',true);
  }

}
