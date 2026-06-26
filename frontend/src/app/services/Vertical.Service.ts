import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.js';

@Injectable({
  providedIn: 'root'
})
export class Vertical_Service {
  constructor(private http: HttpClient) { }

  Save_Vertical(Vertical_) {
    return this.http.post(environment.BasePath + 'Vertical/Save_Vertical/', Vertical_);
  }

  Search_Vertical(Vertical_Name): Observable<any> {
    let params = new HttpParams();
    if (Vertical_Name) {
      params = params.set('Vertical_Name_', Vertical_Name);
    }
    return this.http.get(environment.BasePath + 'Vertical/Search_Vertical/', { params: params });
  }

  Get_All_Industries(): Observable<any> {
    return this.http.get(environment.BasePath + 'Vertical/Get_All_Industries/');
  }

  Delete_Vertical(Vertical_Id) {
    return this.http.get(environment.BasePath + 'Vertical/Delete_Vertical/' + Vertical_Id);
  }

  Get_Vertical(Vertical_Id) {
    return this.http.get(environment.BasePath + 'Vertical/Get_Vertical/' + Vertical_Id);
  }
}
