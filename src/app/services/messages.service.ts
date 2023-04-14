import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message: string = ''

  constructor() { }

  //Adicionar mensagem
  addMessage(message: string){
    this.message = message

    setTimeout(()=>{
      this.clear()
      
    }, 4000)
  }

  //Limpar mensagem
  clear(){
    this.message = ''
  }

}
