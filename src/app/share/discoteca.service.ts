import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IDiscoteca } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class DiscotecaService {
  private discotecaUrl = 'api/discotecas';

  constructor(private http: HttpClient) { }

  getDiscotecas(): Observable<IDiscoteca[]> {
    return this.http.get<IDiscoteca[]>(this.discotecaUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getMaxDiscotecaId(): Observable<IDiscoteca> {
    return this.http.get<IDiscoteca[]>(this.discotecaUrl)
    .pipe(
      // Get max value from an array
      map(data => Math.max.apply(Math, data.map(function(o) { return o.id; }))   ),
      catchError(this.handleError)
    );
  }

  getDiscotecaById(id: string): Observable<IDiscoteca> {
    const url = `${this.discotecaUrl}/${id}`;
    return this.http.get<IDiscoteca>(url)
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createDiscoteca(discoteca: IDiscoteca): Observable<IDiscoteca> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   // discoteca.id = null;
    return this.http.post<IDiscoteca>(this.discotecaUrl, discoteca, { headers: headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteDiscoteca(id: string): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.discotecaUrl}/${id}`;
    return this.http.delete<IDiscoteca>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  updateDiscoteca(discoteca: IDiscoteca): Observable<IDiscoteca> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.discotecaUrl}/${discoteca.id}`;
    return this.http.put<IDiscoteca>(url, discoteca, { headers: headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + discoteca.id)),
        // Return the disco on an update
        map(r => discoteca = r),
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