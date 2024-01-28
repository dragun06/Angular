import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignments.model';
import { Observable, forkJoin, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  constructor (private loggingService:LoggingService,
               private http:HttpClient) {}

  url = "http://localhost:8010/api/assignments"

  getAssignments():Observable<Assignment[]> {
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.url);
  }

  getAssignment(id:number):Observable<Assignment> {
   // const a:Assignment|undefined = this.assignments.find(a => a.id === id)
    //return of(a);
    return this.http.get<Assignment>(this.url + "/" + id).pipe(
      map(a=> {
      return a;
      }),
      tap(_ => {
        console.log("tap: assingment avec ID: " + id + " requete Get envoyé sur mongodb cloud")
      }),
      catchError(this.handleError<Assignment>('getAssignment(id=${id})'))
    )
  }



  private handleError<T>(operation = 'operation', result?:T) {
    return (error:any):Observable<T> => {
      console.log(error);
      console.log(operation + " a échoué " + error.message);
      return of(result as T);
    }
  }

  addAssignment(assignment: Assignment): Observable<any> {
    /*this.assignments.push(assignment);
    this.loggingService.log(assignment.nom, 'Ajouté')
    return of('assignement ajouté')*/
    console.log("assignment recu de la fonction")
    console.log(assignment)
    return this.http.post<Assignment>(this.url, assignment);
  }


  updateAssignment(assignment: Assignment): Observable<any> {
    //return of('assignement modifié')
    console.log("assignment recu l'update")
    console.log(assignment)
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    /*¨const pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);
    return of("Assignment supprimé")*/
    let deleteURI = this.url + '/' + assignment._id;
    return this.http.delete(deleteURI);
  }

  peuplerBDavecForkJoin():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];

    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.note = a.note;
      nouvelAssignment.matiere = a.matiere;
      nouvelAssignment.remarque = a.remarque;
      nouvelAssignment.image = a.image;
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
    });
    return forkJoin(appelsVersAddAssignment);
  }

  getAssignmentsPagine(page:number, limit:number):Observable<any> {
    return this.http.get(this.url + "?page=" + page + "&limit=" + limit);
  }




}
