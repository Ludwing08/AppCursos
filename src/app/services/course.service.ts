import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url ="http://localhost:3000/cursos/"
  
  constructor(private http: HttpClient) { }

  cargarCursos(): Observable<any>{
    return this.http.get<any>(this.url)
  }

  cargarCurso(id:string): Observable<any>{
    return this.http.get<any>(this.url + id)
  }

  actualizarFavorito(id:number, curso:Curso):Observable<any>{
    return this.http.put(this.url+id, curso)
  }

}
