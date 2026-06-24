import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Master_Refresh_Service {
  private masterUpdatedSource = new Subject<string>();

  // Observable string stream
  masterUpdated$ = this.masterUpdatedSource.asObservable();

  // Service message commands
  refreshMaster(masterName: string) {
    this.masterUpdatedSource.next(masterName);
  }
}
