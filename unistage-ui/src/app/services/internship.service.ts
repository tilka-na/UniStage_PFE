import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { InternshipOffer, Internship, Evaluation, Application } from '../models/app-models';
=======
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InternshipOffer, Internship, Milestone, Evaluation, Application } from '../models/app-models'; 
>>>>>>> origin/feat-last-push

@Injectable({
  providedIn: 'root'
})
export class InternshipService {
<<<<<<< HEAD
  private baseUrl = 'http://localhost:8083/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // ==========================================
  // --- 1. GESTION DES OFFRES (Recruiter/All) ---
=======

  private baseUrl = 'http://localhost:8083/api';
  // src/app/services/internship.service.ts
private apiUrl = 'http://localhost:8083/api/internships'; // <--- T-ekdi mn 8084

  constructor(private http: HttpClient) { }

  // ==========================================
  // --- 1. GESTION DES OFFRES ---
>>>>>>> origin/feat-last-push
  // ==========================================

  getAllOffers(): Observable<InternshipOffer[]> {
    return this.http.get<InternshipOffer[]>(`${this.baseUrl}/internships/offers`);
  }

  getOfferById(id: number): Observable<InternshipOffer> {
    return this.http.get<InternshipOffer>(`${this.baseUrl}/internships/offers/${id}`);
  }

<<<<<<< HEAD
  createOffer(offer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/internships/offers`, offer);
  }

  updateOffer(id: number, offer: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/internships/offers/${id}`, offer);
  }

  deleteOffer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/internships/offers/${id}`);
  }

  // ==========================================
  // --- 2. APPLICATIONS / CANDIDATURES ---
  // ==========================================

  // For Recruiter
=======
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

>>>>>>> origin/feat-last-push
  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/applications`);
  }

<<<<<<< HEAD
  // For Student - Linked to your ID automatically
  getMyApplications(): Observable<Application[]> {
    const studentId = this.authService.getUserId();
    return this.http.get<Application[]>(`${this.baseUrl}/applications/student/${studentId}`);
  }

  // Links Student ID when applying
  postuler(offerId: number, application: any): Observable<Application> {
    const applicationWithId = { ...application, studentId: this.authService.getUserId() };
    return this.http.post<Application>(`${this.baseUrl}/applications/postuler/${offerId}`, applicationWithId);
  }

  updateCandidatureStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/applications/${id}/status?newStatus=${status}`, {});
  }

  // ==========================================
  // --- 3. INTERNSHIP & EVALUATIONS ---
  // ==========================================

=======
  getStudentApplications(studentId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/applications/student/${studentId}`);
  }

 // Ila kan l-backend fih /applications/{id}/status
updateCandidatureStatus(id: number, status: string): Observable<any> {
  return this.http.put(`${this.baseUrl}/applications/${id}/status?newStatus=${status}`, {});
}

  

  // Jib ga3 l-ma3loumat dyal l-internship (Details + Milestones + Evaluations)
>>>>>>> origin/feat-last-push
  getInternshipDetails(id: number): Observable<Internship> {
    return this.http.get<Internship>(`${this.baseUrl}/internships/${id}`);
  }

<<<<<<< HEAD
  addEvaluation(internshipId: number, evaluation: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/internships/${internshipId}/evaluations`, evaluation);
=======
  // Zid Evaluation jdida (Nnota o Remarque)
  addEvaluation(internshipId: number, evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(`${this.baseUrl}/internships/${internshipId}/evaluations`, evaluation);
>>>>>>> origin/feat-last-push
  }

  validateMilestone(milestoneId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/internships/milestones/${milestoneId}/validate`, {});
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/feat-last-push
