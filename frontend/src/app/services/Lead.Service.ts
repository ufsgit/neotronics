import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Lead_Service {
  constructor(private http: HttpClient) { }

  Save_Lead(Lead_): Observable<any> {
    return this.http.post(environment.BasePath + 'Lead/Save_Lead/', Lead_);
  }

  Get_Leads(): Observable<any> {
    return this.http.get(environment.BasePath + 'Lead/Get_Leads/');
  }

  Get_Dropdowns_Lead(): Observable<any> {
    return this.http.get(environment.BasePath + 'Lead/Get_Dropdowns_Lead/');
  }

  Delete_Lead(Lead_Id): Observable<any> {
    return this.http.get(environment.BasePath + 'Lead/Delete_Lead/' + Lead_Id);
  }

  Get_Lead_FollowUp_History(Lead_Id): Observable<any> {
    return this.http.get(environment.BasePath + 'Lead/Get_Lead_FollowUp_History/' + Lead_Id);
  }
}
