import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TermsAndCondition_Service {
    constructor(private http: HttpClient) {}

    Save_TermsAndCondition(Term_: any) {
        return this.http.post(environment.BasePath + 'TermsAndCondition/Save_TermsAndCondition/', Term_);
    }

    Search_TermsAndCondition(Caption): Observable<any> {
        if (Caption == undefined) Caption = '';
        const Search_Data = {
            Caption: Caption
        };
        return this.http.get(environment.BasePath + 'TermsAndCondition/Search_TermsAndCondition/', { params: Search_Data });
    }
}
