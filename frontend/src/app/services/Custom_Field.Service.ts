import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Custom_Field } from '../models/Custom_Field';

@Injectable({
    providedIn: 'root'
})
export class Custom_Field_Service {
    constructor(private http: HttpClient) {}

    Save_Custom_Field(Custom_Field_: Custom_Field): Observable<any> {
        return this.http.post(environment.BasePath + 'Custom_Field/Save_Custom_Field/', Custom_Field_);
    }

    Search_Custom_Field(Field_Group_: string): Observable<any> {
        return this.http.get(environment.BasePath + 'Custom_Field/Search_Custom_Field/');
    }

    Delete_Custom_Field(Custom_Field_Id: number): Observable<any> {
        return this.http.get(environment.BasePath + 'Custom_Field/Delete_Custom_Field/' + Custom_Field_Id);
    }

    Get_Field_Types(): Observable<any> {
        return this.http.get(environment.BasePath + 'Custom_Field/Get_Field_Types/');
    }
}
