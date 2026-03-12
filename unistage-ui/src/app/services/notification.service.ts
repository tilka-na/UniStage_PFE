import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../models/app-models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // HER MOCK DATA
  private notifications: Notification[] = [
    {
      id: 1, title: 'Bienvenue', message: 'Bienvenue sur uniStage!',
      date: new Date(), isRead: false, type: 'INFO'
    }
  ];

  private notificationsSubject = new BehaviorSubject<Notification[]>(this.notifications);

  constructor() { }

  getNotifications(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }

  addNotification(title: string, message: string, type: 'INFO' | 'SUCCESS' | 'WARNING'): void {
    const newNotif: Notification = {
      id: Date.now(),
      title: title,
      message: message,
      date: new Date(),
      isRead: false,
      type: type
    };
    this.notifications.unshift(newNotif);
    this.notificationsSubject.next(this.notifications);
  }
}
