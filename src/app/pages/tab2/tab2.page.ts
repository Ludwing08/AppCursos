import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  valor:number = 1;
  cursos=[]
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.cargarCursos()
  }

  cargarCursos(){
    this.courseService.cargarCursos()
    .subscribe(data => {
      this.cursos=data
    })
  }

  filtrar(){
    this.courseService.cargarCursos()
    .subscribe(data=>{
      this.cursos=data.filter(data=>data.favoritos >=100)
    })
  }

  desfiltrar(){
    this.cargarCursos();
  }
  
}
