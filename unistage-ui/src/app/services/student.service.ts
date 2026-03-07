import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8082/api/v1/students/me';

  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateProfile(profileData: any, cvFile: File | null, letterFile: File | null): Observable<any> {
    const formData = new FormData();

    // Append the JSON data
    formData.append('profile', JSON.stringify(profileData));

    if (cvFile) {
      formData.append('cv', cvFile);
    }
    if (letterFile) {
      formData.append('coverLetter', letterFile);
    }

    return this.http.put(this.apiUrl, formData);
  }
}
