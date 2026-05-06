import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class payment_term_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_payment_term(payment_term_)
{
return this.http.post(environment.BasePath +'payment_term/Save_payment_term/',payment_term_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_payment_term(payment_term_Name):Observable<any>
{
var Search_Data={'payment_term_Name':payment_term_Name}
 return this.http.get(environment.BasePath +'payment_term/Search_payment_term/',{params:Search_Data});}
 
Delete_payment_term(payment_term_Id)
{
 return this.http.get(environment.BasePath +'payment_term/Delete_payment_term/'+payment_term_Id);}
Get_payment_term(payment_term_Id)
{
 return this.http.get(environment.BasePath +'payment_term/Get_payment_term/'+payment_term_Id);}

 /** Added on 30-10-2024 */
 
 Load_Payment_Term()
{
    return this.http.get(environment.BasePath +'payment_term/Load_Payment_Term/');
}
}

