
import { IDiscoteca } from '../share/interfaces';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class DiscosdbService {
  private discosUrl = 'http://localhost:8000/discotecas';

  constructor(
    private http: HttpClient
  ) { }
  
  read_discos(): Observable<IDiscoteca[]>{
    return this.http.get<IDiscoteca[]>(this.discosUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  read_discosById(id: any): Observable<IDiscoteca> {
    const url = this.discosUrl + "/" + id;
    return this.http.get<IDiscoteca>(url)
      .pipe(
        tap(data => {
          console.log('getDiscoteca: ' + JSON.stringify(data))
        }),
        catchError(this.handleError)
      );
  }

  create_discos(discoteca): Observable<IDiscoteca> {
    return this.http.post<IDiscoteca>(this.discosUrl, discoteca)
      .pipe(
        tap(data => console.log('createDiscoteca: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  delete_discos(id: string): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.discosUrl + "/"+ id;
    return this.http.delete(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteDiscoteca: ' + id)),
        catchError(this.handleError)
      );
  }

  update_discos(discoteca: IDiscoteca, id: string): Observable<IDiscoteca> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.discosUrl}/${id}`;
    return this.http.put<IDiscoteca>(url, discoteca, { headers: headers })
      .pipe(
        tap(() => console.log('updateDiscoteca: ' + id)),
        // Return the product on an update
        map(() => discoteca),
        catchError(this.handleError)
      );
  }


  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}




