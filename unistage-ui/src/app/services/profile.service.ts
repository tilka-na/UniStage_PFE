import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Company,
  EncadrantProfile,
  RecruiterProfile,
  StudentProfile,
  TutorProfile
} from '../models/app-models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // Pointing to your API Gateway
  private baseUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) { }

  // ==========================================
  // --- 1. STUDENT PROFILES (/api/students)
  // ==========================================

  getMyStudentProfile(): Observable<StudentProfile> {
    return this.http.get<StudentProfile>(`${this.baseUrl}/students/me`);
  }
  updateMyStudentProfile(profileData: StudentProfile, cvFile?: File, coverLetterFile?: File): Observable<StudentProfile> {
    const formData = new FormData();
    formData.append('profile', new Blob([JSON.stringify(profileData)], {
      type: 'application/json'
    }));

    if (cvFile) formData.append('cv', cvFile);
    if (coverLetterFile) formData.append('coverLetter', coverLetterFile);

    return this.http.put<StudentProfile>(`${this.baseUrl}/students/me`, formData);
  }

  deleteMyStudentProfile(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/students/me`);
  }

  // ==========================================
  // --- 2. RECRUITER PROFILES (/api/recruiters)
  // ==========================================

  getMyRecruiterProfile(): Observable<RecruiterProfile> {
    return this.http.get<RecruiterProfile>(`${this.baseUrl}/recruiters/me`);
  }

  getRecruiterById(id: number): Observable<RecruiterProfile> {
    return this.http.get<RecruiterProfile>(`${this.baseUrl}/recruiters/${id}`);
  }

  updateMyRecruiterProfile(profileData: RecruiterProfile): Observable<RecruiterProfile> {
    return this.http.put<RecruiterProfile>(`${this.baseUrl}/recruiters/me`, profileData);
  }

  deleteMyRecruiterProfile(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/recruiters/me`);
  }

  // ==========================================
  // --- 3. TUTOR PROFILES (/api/tutors)
  // ==========================================

  getMyTutorProfile(): Observable<TutorProfile> {
    return this.http.get<TutorProfile>(`${this.baseUrl}/tutors/me`);
  }

  getTutorById(id: number): Observable<TutorProfile> {
    return this.http.get<TutorProfile>(`${this.baseUrl}/tutors/${id}`);
  }

  updateMyTutorProfile(profileData: TutorProfile): Observable<TutorProfile> {
    return this.http.put<TutorProfile>(`${this.baseUrl}/tutors/me`, profileData);
  }

  deleteMyTutorProfile(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tutors/me`);
  }

  // ==========================================
  // --- 4. ENCADRANT PROFILES (/api/encadrants)
  // ==========================================

  getMyEncadrantProfile(): Observable<EncadrantProfile> {
    return this.http.get<EncadrantProfile>(`${this.baseUrl}/encadrants/me`);
  }

  updateMyEncadrantProfile(profileData: EncadrantProfile): Observable<EncadrantProfile> {
    return this.http.put<EncadrantProfile>(`${this.baseUrl}/encadrants/me`, profileData);
  }

  deleteMyEncadrantProfile(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/encadrants/me`);
  }

  // ==========================================
  // --- 5. COMPANIES (/api/companies)
  // ==========================================

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}/companies`);
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/companies/${id}`);
  }

  createCompany(companyData: Company): Observable<Company> {
    return this.http.post<Company>(`${this.baseUrl}/companies`, companyData);
  }

  updateCompany(id: number, companyData: Company): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}/companies/${id}`, companyData);
  }

  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/companies/${id}`);
  }

  // ==========================================
  // --- 6. PUBLIC ENDPOINTS (/api/public)
  // ==========================================

  getPublicStudentProfile(userId: number): Observable<StudentProfile> {
    return this.http.get<StudentProfile>(`${this.baseUrl}/public/students/${userId}`);
  }

  getPublicRecruiterProfile(userId: number): Observable<RecruiterProfile> {
    return this.http.get<RecruiterProfile>(`${this.baseUrl}/public/recruiters/${userId}`);
  }

  // ==========================================
  // --- 7. ADMIN ENDPOINTS (/api/admin)
  // ==========================================

  getAllRecruitersForAdmin(): Observable<RecruiterProfile[]> {
    return this.http.get<RecruiterProfile[]>(`${this.baseUrl}/admin/recruiters`);
  }

  validateRecruiter(id: number): Observable<RecruiterProfile> {
    return this.http.put<RecruiterProfile>(`${this.baseUrl}/admin/recruiters/${id}/validate`, {});
  }

  deleteRecruiterByAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/recruiters/${id}`);
  }

  deleteTutorByAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/tutors/${id}`);
  }
}
