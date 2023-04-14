import { Component, OnInit } from '@angular/core';
import { Moments } from 'src/app/Moments';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.scss']
})
export class NewMomentComponent implements OnInit{
  btnText = 'Compartilhar!'

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router 
     ){}
  ngOnInit(): void { }

  async createHandler(moment: Moments){
    const formData = new FormData()

    formData.append("title", moment.title)
    formData.append("description", moment.description)

    if(moment.image){
      formData.append('image', moment.image)
    }

    //Todo

    await this.momentService.createMoment(formData).subscribe();

    //Exibir msg
    this.messagesService.addMessage("Momento adicionado com sucesso!")

    // Redirect
    this.router.navigate(['/'])
  }

}
