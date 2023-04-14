import { Component, OnInit } from '@angular/core';
import { Moments } from 'src/app/Moments';
import { MomentService } from 'src/app/services/moment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { Coments } from 'src/app/Coments';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ComentService } from 'src/app/services/coment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss']
})
export class MomentComponent implements OnInit{
  
  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup

  moment?: Moments;

  baseApiUrl = environment.baseApiUrl
  messagesService: any;
  
  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private message: MessagesService,
    private router: Router,
    private comentService: ComentService,
    ){}


  ngOnInit(): void {
    //Id que está na URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService

      .getMoment(id)
      .subscribe((item) => (this.moment = item.data))

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required])
    })
  }

  get text(){
    return this.commentForm.get('text')!
  }

  get username(){
    return this.commentForm.get('username')!
  }

  async removeHandler(id: number){
    await this.momentService.removeMoment(id).subscribe()

    this.message.addMessage("Momento excluido com sucesso")

    this.router.navigate(['/'])
  }

  async onSubmit(formDirective: FormGroupDirective){
   
    if(this.commentForm.invalid){
      return
    }

    const data: Coments = this.commentForm.value

    data.momentId = Number(this.moment!.id)

    await this.comentService.createComment(data).subscribe((comment)=> this.moment!.comments!.push(comment.data))

    this.messagesService.addMessage("Comentário adicionado!")

    this.commentForm.reset()

    formDirective.resetForm()
  }
}
