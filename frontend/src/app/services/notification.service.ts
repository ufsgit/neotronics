import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, interval } from 'rxjs';
import { environment } from '../../environments/environment';

import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  private unreadCountSubject = new BehaviorSubject<number>(0);
  private socket: any;
  private activeStaffId = 0;

  notifications$ = this.notificationsSubject.asObservable();
  unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private http: HttpClient) { }

  startPolling(staffId: number) {
    const parsedStaffId = Number(staffId || 0);
    if (!parsedStaffId) return;

    this.activeStaffId = parsedStaffId;
    this.refresh();

    if (this.socket) {
      this.socket.disconnect();
    }
    
    // Connect to the backend socket
    const socketUrl = environment.BasePath.replace('/api/', ''); 
    const token = localStorage.getItem('Access_Token') || '';
    this.socket = io(socketUrl, {
      query: { token: token },
      withCredentials: true
    });
    
    this.socket.on('connect', () => {
      this.socket.emit('register', this.activeStaffId);
    });

    this.socket.on('lead_assigned', (notif: any) => {
      const currentNotifications = this.notificationsSubject.value;
      const updatedNotifications = [notif, ...currentNotifications];
      this.setNotifications(updatedNotifications);
    });
  }

  stopPolling() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.activeStaffId = 0;
    this.setNotifications([]);
  }

  refresh() {
    if (!this.activeStaffId) return;
    this.getUnread(this.activeStaffId).subscribe(
      rows => this.setNotifications(Array.isArray(rows) ? rows : []),
      () => this.setNotifications([])
    );
  }

  getUnread(staffId: number): Observable<any> {
    return this.http.get(environment.BasePath + 'Notification/' + staffId);
  }

  markAsRead(notificationId: number): Observable<any> {
    return this.http.patch(environment.BasePath + 'Notification/' + notificationId + '/read', {});
  }

  markReadAndRefresh(notificationId: number) {
    this.markAsRead(notificationId).subscribe(() => this.refresh());
  }

  private setNotifications(notifications: any[]) {
    this.notificationsSubject.next(notifications);
    this.unreadCountSubject.next(notifications.length);
  }
}
