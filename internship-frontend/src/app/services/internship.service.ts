import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InternshipOffer, Internship, Milestone, Evaluation, Application } from '../models/app-models'; 

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  private baseUrl = 'http://localhost:8084/api';
  // src/app/services/internship.service.ts
private apiUrl = 'http://localhost:8084/api/internships'; // <--- T-ekdi mn 8084

  constructor(private http: HttpClient) { }

  // ==========================================
  // --- 1. GESTION DES OFFRES ---
  // ==========================================

  getAllOffers(): Observable<InternshipOffer[]> {
    return this.http.get<InternshipOffer[]>(`${this.baseUrl}/internships/offers`);
  }

  getOfferById(id: number): Observable<InternshipOffer> {
    return this.http.get<InternshipOffer>(`${this.baseUrl}/internships/offers/${id}`);
  }

  createOffer(offer: InternshipOffer): Observable<InternshipOffer> {
    return this.http.post<InternshipOffer>(`${this.baseUrl}/internships/offers`, offer);
  }

  updateOffer(id: number, offer: InternshipOffer): Observable<InternshipOffer> {
    return this.http.put<InternshipOffer>(`${this.baseUrl}/internships/offers/${id}`, offer);
  }

  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/internships/offers/${id}`);
  }

 
  postuler(offerId: number, application: any): Observable<Application> {
    return this.http.post<Application>(`${this.baseUrl}/applications/postuler/${offerId}`, application);
  }

  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/applications`);
  }

  getStudentApplications(studentId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/applications/student/${studentId}`);
  }

 // Ila kan l-backend fih /applications/{id}/status
updateCandidatureStatus(id: number, status: string): Observable<any> {
  return this.http.put(`${this.baseUrl}/applications/${id}/status?newStatus=${status}`, {});
}

  

  // Jib ga3 l-ma3loumat dyal l-internship (Details + Milestones + Evaluations)
  getInternshipDetails(id: number): Observable<Internship> {
    return this.http.get<Internship>(`${this.baseUrl}/internships/${id}`);
  }

  // Zid Evaluation jdida (Nnota o Remarque)
  addEvaluation(internshipId: number, evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(`${this.baseUrl}/internships/${internshipId}/evaluations`, evaluation);
  }

  validateMilestone(milestoneId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/internships/milestones/${milestoneId}/validate`, {});
  }
}