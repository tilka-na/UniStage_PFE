import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { InternshipOffer, Internship, Evaluation, Application } from '../models/app-models';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {
  private baseUrl = 'http://localhost:8083/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // ==========================================
  // --- 1. GESTION DES OFFRES (Recruiter/All) ---
  // ==========================================

  getAllOffers(): Observable<InternshipOffer[]> {
    return this.http.get<InternshipOffer[]>(`${this.baseUrl}/internships/offers`);
  }

  getOfferById(id: number): Observable<InternshipOffer> {
    return this.http.get<InternshipOffer>(`${this.baseUrl}/internships/offers/${id}`);
  }

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
  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/applications`);
  }

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

  getInternshipDetails(id: number): Observable<Internship> {
    return this.http.get<Internship>(`${this.baseUrl}/internships/${id}`);
  }

  addEvaluation(internshipId: number, evaluation: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/internships/${internshipId}/evaluations`, evaluation);
  }

  validateMilestone(milestoneId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/internships/milestones/${milestoneId}/validate`, {});
  }
}
