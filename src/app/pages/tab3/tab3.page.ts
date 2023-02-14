import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {


  cursos=[]

  numero:Number = 0

  filtros:boolean = false;

  constructor(private courseService:CourseService) { }

  ngOnInit() {
    this.cargarCursos()
    
  }

  cargarCursos(){
    this.courseService.cargarCursos()
    .subscribe(data => {
      this.cursos=data      
      this.numero=this.cursos.length
    })
  }

  filtrarCategoria(categoria:string){
    this.courseService.cargarCursos()
    .subscribe(data=>{
      this.cursos=data.filter(data=>data.categoria.includes(categoria))
      this.numero=this.cursos.length
    })

  }
  
}
