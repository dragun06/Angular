import { Component, /*EventEmitter, Output*/ } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignments.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();
  nomDevoir=""
  dateDeRendu?:Date=undefined;
  matiere!:string
  image!: string




  constructor (private assignmentsService:AssignmentsService,
               private router:Router) {}

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random()*10000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = new Date(this.dateDeRendu!);
    newAssignment.rendu = false;
    newAssignment.image = this.image;
    newAssignment.matiere = this.matiere;
    console.log("assignment envoyé au serveur")
    console.log(newAssignment);
    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(
        response => {
          console.log("réponse du serveur")
          console.log(response);
          console.log("réponse du serveur")
          this.router.navigate(["/home"]);
        },
        error => {
          console.log('Erreur lors de l\'ajout de l\'assignment : ', error);
        }
      );
    this.router.navigate(["/home"])
  }
}
