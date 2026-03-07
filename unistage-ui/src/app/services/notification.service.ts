import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../models/app-models'; // 👈 Drna l-import s7i7 hna

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // Mock Data (Data dyal tajriba)
  private notifications: Notification[] = [
    { 
      id: 1, title: 'Bienvenue', message: 'Bienvenue sur uniStage!', 
      date: new Date(), isRead: false, type: 'INFO' 
    }
  ];

  // BehaviorSubject bach n-diffusiw l-data f l-waqt l-7aqiqi (Real-time)
  private notificationsSubject = new BehaviorSubject<Notification[]>(this.notifications);

  constructor() { }

  // Bach l-composants y-qraw l-notifications
  getNotifications(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }

  // Fonction bach n-zido notification jdida (Success, Info, or Warning)
  addNotification(title: string, message: string, type: 'INFO' | 'SUCCESS' | 'WARNING'): void {
    const newNotif: Notification = {
      id: Date.now(), 
      title: title,
      message: message,
      date: new Date(),
      isRead: false,
      type: type
    };

    // Zidha f l-owl d l-lista (unshift)
    this.notifications.unshift(newNotif);
    
    // 3lem ga3 les composants li m-abonnyin (Subscribed)
    this.notificationsSubject.next(this.notifications);
  }
}