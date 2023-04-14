import { Component, OnInit } from '@angular/core';

import { Moments } from 'src/app/Moments';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { environment } from 'src/environments/environment';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

  allMoments: Moments[] = []
  moments: Moments[] = []
  baseApiUrl = environment.baseApiUrl

  //todo search
  faSearch = faSearch
  serachTerm: string = ''

  constructor(private momentSevice: MomentService){}
  
  ngOnInit(): void {
    this.momentSevice.getMoments().subscribe((items) => {
      const data = items.data

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
          )
      })
        this.allMoments = data
        this.moments = data
    })
  }

  search(e: Event): void{
    const target = e.target as HTMLInputElement
    const value = target.value

    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value)
    })
  }
}
