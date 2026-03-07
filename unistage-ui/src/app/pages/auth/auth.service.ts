import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: 'STUDENT' | 'COMPANY';
}

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private roleSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }


  register(data: RegisterRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, data, { responseType: 'text' });
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);

        this.decodeAndNotify(response.token);
      })
    );
  }
forgotPassword(email: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/forgot-password`, { email });
}
  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.roleSubject.next(null);
    this.router.navigate(['/']);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getRole(): string | null {
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
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userRole = payload.role;
      const email = payload.sub;
      this.currentUserSubject.next({ email, role: userRole });
      this.roleSubject.next(userRole);

    } catch (error) {
      console.error('Error decoding token', error);
      this.logout();
    }
  }
}



