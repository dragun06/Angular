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

  constructor (private assignmentsService:AssignmentsService,
               private router:Router) {}

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random()*1000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = new Date(this.dateDeRendu!);
    newAssignment.rendu = false;

    console.log(newAssignment);
    //this.assignments.push(newAssignment);
    //this.nouvelAssignment.emit(newAssignment);
    this.assignmentsService.addAssignment(newAssignment).subscribe(message =>console.log(message));
    this.router.navigate(["/home"])
  }
}
