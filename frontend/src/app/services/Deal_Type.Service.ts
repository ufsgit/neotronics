import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Deal_TypeService {
  private apiUrl = environment.BasePath;

  constructor(private http: HttpClient) { }

  Save_Deal_Type(Deal_Type_: any): Observable<any> {
    return this.http.post(this.apiUrl + 'Deal_Type/Save_Deal_Type/', Deal_Type_);
  }

  Search_Deal_Type(Deal_Type_Name: string = ''): Observable<any> {
    let params = new HttpParams();
    if (Deal_Type_Name) {
      params = params.set('Deal_Type_Name_', Deal_Type_Name);
    }
    return this.http.get(this.apiUrl + 'Deal_Type/Search_Deal_Type/', { params });
  }

  Delete_Deal_Type(Deal_Type_Id: number): Observable<any> {
    return this.http.get(this.apiUrl + 'Deal_Type/Delete_Deal_Type/' + Deal_Type_Id);
  }

  Get_Deal_Type(Deal_Type_Id: number): Observable<any> {
    return this.http.get(this.apiUrl + 'Deal_Type/Get_Deal_Type/' + Deal_Type_Id);
  }
}
