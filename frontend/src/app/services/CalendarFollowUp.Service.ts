import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarFollowUp_Service {
  constructor(private http: HttpClient) { }

  Get_Calendar_FollowUps(ViewType: string, CurrentDate: string): Observable<any> {
    return this.http.get(environment.BasePath + 'CalendarFollowUp/GetCalendarFollowUps', {
      params: {
        User_Id: localStorage.getItem('Login_User') || '0',
        ViewType: ViewType,
        CurrentDate: CurrentDate,
        _t: Date.now().toString()
      }
    });
  }
}
