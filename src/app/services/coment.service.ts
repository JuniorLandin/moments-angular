import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Coments } from '../Coments';
import { environment } from 'src/environments/environment';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root'
})
export class ComentService implements OnInit{

  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/moments`

  constructor(private http: HttpClient) { }

  createComment(data: Coments): Observable<Response<Coments>>{
    const url = `${this.apiUrl}/${data.momentId}/comments`
    return this.http.post<Response<Coments>>(url, data)
  }

  ngOnInit(): void {  }
}
