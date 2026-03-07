import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {
  private apiUrl = 'http://localhost:8083/api/v1/internships';

  constructor(private http: HttpClient) { }

  getOffres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/offres`);
  }
  
  postuler(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, data, { responseType: 'text' });
  }
  getCandidatures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/candidatures`); 
  }
updateStatus(id: number, decision: string): Observable<any> {
  return this.http.put(
    `${this.apiUrl}/candidatures/${id}?statut=${decision}`,
    {}, 
    { responseType: 'text' }
  );
}
getOffreById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/offres/${id}`);
  }
}