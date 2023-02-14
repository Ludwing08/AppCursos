import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/models/course.interface';
import { CourseService } from 'src/app/services/course.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  cursos = [];

  option = {
    loop: true,    
    autoplay: true
  } 


  constructor(private courseService: CourseService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.cargarCursos()
  }

  cargarCursos(){
    this.courseService.cargarCursos()
    .subscribe(data => {
      this.cursos=data
    })
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['']);
  }


  activarFiltros(){}

  nextSlide(){}

  aumentarFavorito(imagen:string, titulo:string, subtitulo:string, categoria:string, favoritos:number, id:number){
    let curso:Curso = {
      id: id,
      imagen: imagen,
      titulo: titulo,
      subtitulo: subtitulo,
      categoria: categoria,
      favoritos: favoritos + 1
    }
    this.courseService.actualizarFavorito(id, curso).subscribe();
    this.cargarCursos();
  }

}
