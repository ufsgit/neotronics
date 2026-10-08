import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fallback',
  templateUrl: './fallback.component.html',
  styleUrls: ['./fallback.component.scss']
})
export class FallbackComponent implements OnInit {
  userName: string = '';
  role: string = '';
  department: string = '';
  hasPermissions: boolean = false;
  requestedPage: string = 'the requested page';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['page']) {
        this.requestedPage = 'the ' + params['page'] + ' page';
      }
    });
    this.userName = localStorage.getItem('Login_User_Name') || 'User';
    this.role = localStorage.getItem('Role_Name') || 'No Role Assigned';
    this.department = localStorage.getItem('Department_Name') || 'N/A';
    
    try {
      const pointers = JSON.parse(localStorage.getItem('Pointer_Temp') || '[]');
      this.hasPermissions = pointers.some((val: number) => val > -1);
    } catch (e) {
      this.hasPermissions = false;
    }
  }

}
