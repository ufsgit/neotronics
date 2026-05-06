import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RequirementWorkflowService {
  constructor(private http: HttpClient) {}

  List(status: string): Observable<any> {
    const params: any = { status: status || 'all' };
    return this.http.get(environment.BasePath + 'requirementworkflow/List/', { params });
  }

  InitiatePriceRequest(requirementMasterId: number): Observable<any> {
    return this.http.get(environment.BasePath + 'requirementworkflow/InitiatePriceRequest/' + requirementMasterId);
  }

  LinkQuotation(requirementMasterId: number, salesQuotationMasterId: number): Observable<any> {
    return this.http.get(environment.BasePath + 'requirementworkflow/LinkQuotation/' + requirementMasterId + '/' + salesQuotationMasterId);
  }

  LinkPriceRequest(requirementMasterId: number, priceRequestMasterId: number): Observable<any> {
    return this.http.get(environment.BasePath + 'requirementworkflow/LinkPriceRequest/' + requirementMasterId + '/' + priceRequestMasterId);
  }
}

