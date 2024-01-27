import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignments.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment|undefined;
  nomAssignment!: string;
  dateDeRendu!: Date;
  matiere!: string;
  note!: number;
  remarque!: string;
  image!: string;


  constructor (private assignmentService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      this.getAssignment();
      console.log("Query Params: ");
      console.log(this.route.snapshot.queryParams);
      console.log("Fragment: ");
      console.log(this.route.snapshot.fragment);
    }

    getAssignment() {
      const id = +this.route.snapshot.params['id'];
      this.assignment = undefined;
      this.assignmentService.getAssignment(id).subscribe((assignment) => {
        if(!assignment) return;
        this.assignment = assignment;
        this.nomAssignment = assignment.nom;
        this.dateDeRendu = assignment.dateDeRendu;
        this.matiere = assignment.matiere;
        this.note = assignment.note;
        this.remarque = assignment.remarque;
        this.image = assignment.image;
      });
    }

    onSaveAssignment(){
      if(!this.assignment) return;
      this.assignment.nom = this.nomAssignment;
      this.assignment.dateDeRendu = this.dateDeRendu;
      this.assignment.rendu = this.assignment.rendu
      this.assignment.matiere = this.matiere;
      this.assignment.note = this.note;
      this.assignment.remarque = this.remarque;
      this.assignment.image = this.image;
      this.assignmentService.updateAssignment(this.assignment).subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home'])
      });

    }
}
