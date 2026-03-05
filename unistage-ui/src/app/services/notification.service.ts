import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Linked your AuthService
import { Notification } from '../models/app-models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8084/api';
  private notifications: Notification[] = [];
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadUserNotifications();
  }

  // Automatically fetches notifications for the logged-in student/candidate
  loadUserNotifications(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.http.get<Notification[]>(`${this.baseUrl}/user/${userId}`).subscribe({
        next: (data) => {
          this.notifications = data;
          this.notificationsSubject.next(this.notifications);
        }
      });
    }
  }

  getNotifications(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }

  // Kept her manual add function for internal app alerts
  addNotification(title: string, message: string, type: 'INFO' | 'SUCCESS' | 'WARNING'): void {
    const newNotif: Notification = {
      id: Date.now(),
      title,
      message,
      date: new Date(),
      isRead: false,
      type
    };
    this.notifications.unshift(newNotif);
    this.notificationsSubject.next(this.notifications);
  }
}
