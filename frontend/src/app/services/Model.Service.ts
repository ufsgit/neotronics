import { Component, OnInit, Input, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Model_Service {
    constructor(private http: HttpClient) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    Save_Model(Model_) {
        return this.http.post(environment.BasePath + 'Model/Save_Model/', Model_);
    }

    Search_Model(Model_Name): Observable<any> {
        if (Model_Name == undefined)
            Model_Name = "";

        var Search_Data = {
            'Model_Name': Model_Name
        }
        return this.http.get(environment.BasePath + 'Model/Search_Model/', { params: Search_Data });
    }
}
