import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignments.model';
import { AssignmentsService } from '../shared/assignments.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  page:number = 1;
  limit:number = 10;
  totalDocs!:number;
  totalPages!:number;
  nextPage!:number;
  prevPage!:number;
  hasPrevPage!:boolean;
  hasNextPage!:boolean;

  titre = "Formulaire d'ajout de devoir";
  color = 'green';
  boutonDesactive = true;
  formVisible = false;

  assignmentSelectionne?:Assignment;

  assignments!: Assignment[];

  constructor (private assignmentService:AssignmentsService,
               private route: ActivatedRoute,
               private authService: AuthService,
               private router: Router) { }

  ngOnInit() : void {
    //this.assignments = this.assignmentService.getAssignments();
    //this.getAssignments();
    this.assignmentService.getAssignmentsPagine(this.page, this.limit).subscribe(
      data => {
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        console.log(data);
      }
    );
  }

  getAssignments() {
    this.assignmentService.getAssignments().subscribe(assignments => this.assignments = assignments);
  }

  getDescription() {
    return 'Je suis un sous composant';
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }


  assignmentClique(a:Assignment) {
    this.assignmentSelectionne = a;
  }

  onAddAssignmentBtnClick() {
  this.formVisible = true;
  }

  /*
  onNouvelAssignment(event:Assignment) {
    //this.assignments.push(event);
    this.assignmentService.addAssignment(event).subscribe(message => console.log(message))
    this.formVisible = false;
  }
  */

  onDeleteAssignment(a:Assignment) {
    const pos = this.assignments.indexOf(a);
    this.assignments.splice(pos, 1);
  }

  isLogged() {
    return this.authService.loggedIn;
  }

  clickDetail(id: number) {
    if (this.authService.loggedIn) {
      this.router.navigate(["/assignment/" + id])
    } else {
      this.router.navigate(["/home"])
    }
  }

  peuplerBD() {
    this.assignmentService.peuplerBDavecForkJoin()
    .subscribe(() => {
      console.log("BD peuplée");
      replaceUrl: true;
      this.router.navigate(["/home"], {replaceUrl: true});
    });
    window.location.reload();
  }
}
