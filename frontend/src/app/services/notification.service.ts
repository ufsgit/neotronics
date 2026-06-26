import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, interval } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  private unreadCountSubject = new BehaviorSubject<number>(0);
  private pollSubscription: Subscription;
  private activeStaffId = 0;

  notifications$ = this.notificationsSubject.asObservable();
  unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private http: HttpClient) { }

  startPolling(staffId: number) {
    const parsedStaffId = Number(staffId || 0);
    if (!parsedStaffId) return;

    this.activeStaffId = parsedStaffId;
    this.refresh();

    if (this.pollSubscription) this.pollSubscription.unsubscribe();
    this.pollSubscription = interval(30000).subscribe(() => this.refresh());
  }

  stopPolling() {
    if (this.pollSubscription) this.pollSubscription.unsubscribe();
    this.pollSubscription = null;
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
