import { Component, OnInit } from '@angular/core';
import { Moments } from 'src/app/Moments';
import { MomentService } from 'src/app/services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.scss']
})
export class EditMomentComponent implements OnInit{

  moment!: Moments
  btnText: string = 'Editar'

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router
    ){}
  ngOnInit(): void { 
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data
    })
   }

   async editHandler(momentData: Moments){
    const id = this.moment.id

    const formData = new FormData()

    formData.append('title', momentData.title)
    formData.append('description', momentData.description)

    if(momentData.image){
      formData.append('image', momentData.image)
    }

    await this.momentService.updateMoment(id!, formData).subscribe()
    
    this.messageService.addMessage(`Moment ${id} foi atualizado com sucesso!`)

    this.router.navigate(['/'])
   }

}
