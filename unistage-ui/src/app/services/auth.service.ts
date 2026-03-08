import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

// Clean interfaces for your data
export interface LoginRequest { email: string; password: string; }
export interface AuthResponse { token: string; }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Use 8081 if that's where your Auth Controller is running
  private apiUrl = 'http://localhost:8081/api/auth';

  // BehaviorSubjects allow components to "listen" for changes (like login/logout)
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private roleSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.decodeAndNotify(response.token);
        }
      })
    );
  }

  register(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => {
        // Catch the token from Spring Boot backend!
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.decodeAndNotify(response.token);
        }
      })
    );
  }
// Add these to your AuthService class
isAdmin(): boolean {
  return this.getRole() === 'ADMIN';
}

isEncadrant(): boolean {
  return this.getRole() === 'ENCADRANT';
}

isStudent(): boolean {
  return this.getRole() === 'STUDENT';
}
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }
getUserId(): number | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    // This decodes the middle part of the JWT token
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Return 'id' or 'userId' — check your Spring Boot JWT names
    return payload.id || payload.userId || null;
  } catch (e) {
    console.error("Could not decode token for ID", e);
    return null;
  }
}
  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.roleSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    // If the subject is empty, try to decode the token again just in case
    if (!this.roleSubject.value) {
      this.loadUserFromStorage();
    }
    return this.roleSubject.value;
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodeAndNotify(token);
    }
  }

  private decodeAndNotify(token: string) {
    try {
      // Logic: [Header].[Payload].[Signature] -> we decode index 1 (the payload)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userRole = payload.role; // Make sure your Spring Boot JWT has a "role" field
      const email = payload.sub;

      this.currentUserSubject.next({ email, role: userRole });
      this.roleSubject.next(userRole);
    } catch (error) {
      console.error('Error decoding token', error);
      this.logout();
    }
  }
}
