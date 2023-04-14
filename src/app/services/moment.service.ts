import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Response } from '../Response';
import { Moments } from '../Moments';

import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})

export class MomentService{

  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/moments`
  
  constructor(private http: HttpClient) {}

  getMoments(): Observable<Response<Moments[]>>{
    return this.http.get<Response<Moments[]>>(this.apiUrl)
  }

  createMoment(formData: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.apiUrl, formData)
  }

  getMoment(id: number): Observable<Response<Moments>> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Response<Moments>>(url)
  }
  removeMoment(id: number){
    const url = `${this.apiUrl}/${id}`
    return this.http.delete(url)
  }
  updateMoment(id: number, formData:FormData): Observable<FormData>{
    const url = `${this.apiUrl}/${id}`
    return this.http.put<FormData>(url, formData)
  }
}
