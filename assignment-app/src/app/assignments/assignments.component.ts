import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignments.model';
import { AssignmentsService } from '../shared/assignments.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {bdInitialAssignments} from "../shared/data";
import {PageEvent} from "@angular/material/paginator";

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
  onlyRendu!:boolean;
  displayedColumns: string[] = [ 'nom', 'matiere', 'rendu',    'note', 'remarque', 'image', 'dateDeRendu'];
  searchTerm: string = '';
  filteredAssignments: Assignment[] = [];


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
        this.onlyRendu = false;
        console.log("Donnees recu");
        console.log(data);
        this.filterAssignments();
      }
    );
  }

  filterAssignments() {
    if (this.searchTerm) {
      this.filteredAssignments = this.assignments.filter(assignment =>
        assignment.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredAssignments = [...this.assignments]; // Copy the sorted assignments
    }
  }

  search() {
    this.filterAssignments();
  }

  sortAssignmentsByMatiere() {
    this.assignments.sort((a, b) => a.matiere.localeCompare(b.matiere, 'fr', {sensitivity: 'base'}));
    this.filterAssignments();
  }

  sortAssignmentsByNote() {
    this.assignments.sort((a, b) => {
      const noteA = Number(a.note);
      const noteB = Number(b.note);
      if (a.rendu === b.rendu) {
        if (noteA > noteB) return -1;
        if (noteA < noteB) return 1;
        return 0;
      }
      return a.rendu ? -1 : 1;
    });
    this.filterAssignments();
  }

  sortAssignmentsByDateDeRendu() {
    this.assignments.sort((a, b) => {
      const dateA = new Date(a.dateDeRendu);
      const dateB = new Date(b.dateDeRendu);
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    });
    this.filterAssignments();
  }


  pageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.assignmentService.getAssignmentsPagine(this.page, this.limit).subscribe(
      data => {
        this.assignments = data.docs;
        this.filteredAssignments = [...this.assignments]; // Add this line
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        this.onlyRendu = false;
        console.log("Donnees recu");
        console.log(data);
      }
    );
  }

  onChange(ob: MatCheckboxChange) {
    this.onlyRendu = ob.checked;
    console.log(this.onlyRendu);
  }


  getAssignments() {
    this.assignmentService.getAssignments()
      .subscribe(
        assignments => {
          this.assignments = assignments;
          console.log('Assignments received from server: ', this.assignments);
        },
        error => {
          console.log('Error while fetching assignments: ', error);
        }
      );
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

  displayRow(row: any) {
    console.log(`Value of rendu for row: ${row.rendu}`);
    return row.rendu !== false;
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

  protected readonly bdInitialAssignments = bdInitialAssignments;
}
