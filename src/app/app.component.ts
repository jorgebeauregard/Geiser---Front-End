import { Component } from '@angular/core';
import 'rxjs/add/observable/interval';
import * as io from "socket.io-client";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  instruccion_actual: number;
  data2;
  private url = 'http://ec2-18-188-150-180.us-east-2.compute.amazonaws.com:8080';
  private socket: SocketIOClient.Socket;

  instrucciones = ["Aprieta botón rojo", 
                  "Aprieta botón azul", 
                  "Aprieta botón verde", 
                  "Aprieta botón amarillo",
                  ];

  ngOnInit(): void {
    this.socket = io.connect(this.url);
    this.socket.on('news', (data) => {
      console.log('news: '+ JSON.stringify(data));
      this.data2 = data.id;
    });
  }

  randomInt(min, max){
    this.instruccion_actual =  Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(this.instruccion_actual);
  }


}
