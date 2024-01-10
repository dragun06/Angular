import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Assignment } from '../assignments.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignement-detail.component.html',
  styleUrls: ['./assignement-detail.component.css']
})
export class AssignmentDetailComponent {
  /*@Input()*/  assignmentTransmis?:Assignment;
  @Output() deleteAssignment = new EventEmitter<Assignment>();

  constructor (private assignmentService: AssignmentsService,
               private route: ActivatedRoute,
               private router: Router,
               private authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignement();
  }

  getAssignement() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id).subscribe(assignment => this.assignmentTransmis = assignment);
  }

  onAssignmentRendu() {
    this.assignmentTransmis!.rendu = true;
    console.log(this.assignmentTransmis!);
    this.assignmentService.updateAssignment(this.assignmentTransmis!).subscribe(message => {
      console.log(message);
      this.router.navigate(["/home"])
    });
  }

  onDeleteAssignment() {
    this.assignmentService.deleteAssignment(this.assignmentTransmis!).subscribe(message => {
      console.log(message);
      this.router.navigate(["/home"])
    });
    //this.assignmentTransmis = undefined;

  }

  onEditAssignment() {
    this.router.navigate(['assignment', this.assignmentTransmis?.id, 'edit']
    ,{queryParams:{nom:this.assignmentTransmis?.nom}, fragment:'edition'});
  }

  isAdmin() {
    return this.authService.admin;
  }
}
