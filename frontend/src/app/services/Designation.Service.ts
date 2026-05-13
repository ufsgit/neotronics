import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.js';

@Injectable({
  providedIn: 'root'
})
export class Designation_Service {
  constructor(private http: HttpClient) { }

  Save_Designation(Designation_) {
    return this.http.post(environment.BasePath + 'Designation/Save_Designation/', Designation_);
  }

  Search_Designation(Designation_Name): Observable<any> {
    let params = new HttpParams();
    if (Designation_Name) {
      params = params.set('Designation_Name_', Designation_Name);
    }
    return this.http.get(environment.BasePath + 'Designation/Search_Designation/', { params: params });
  }

  Delete_Designation(Designation_Id) {
    return this.http.get(environment.BasePath + 'Designation/Delete_Designation/' + Designation_Id);
  }

  Get_Designation(Designation_Id) {
    return this.http.get(environment.BasePath + 'Designation/Get_Designation/' + Designation_Id);
  }
}
