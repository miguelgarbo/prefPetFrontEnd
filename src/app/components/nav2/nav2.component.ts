import { Component, inject } from '@angular/core';
import { Tutor } from '../../models/tutor';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TutorService } from '../../services/tutor.service';


@Component({
  selector: 'app-nav2',
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './nav2.component.html',
  styleUrl: './nav2.component.scss'
})
export class Nav2Component {

  tutor: Tutor = new Tutor();
  tutorService = inject(TutorService)


  findById(id:number){
    this.tutorService.findById(id).subscribe({
        
      next:(value) => {
        console.log("Pessoa Encontrada",value);
        this.tutor = value

      },error(err) {
        console.log("Erro Ao pegar animal", err)
      },
    })
  }

  ngOnInit(){
   this.findById(1)
  
  }

}
