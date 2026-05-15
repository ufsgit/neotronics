import { Component, OnInit } from '@angular/core';
import { UserData } from '../../services/user-data';
import { Router } from '@angular/router';


declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  Menu_Id:string;
  Save:string;
  Delete:string;
  View:string;
  Edit:string;
  Menu_Type:boolean;
}

declare interface PointerInfo {
 Root_Index:number;
 
 
}
export var ROUTES: RouteInfo[] = [];
export var Pointer_Table: number[] = []
///export var menuItems: any[] = [];

// export var Pointer_Table: PointerInfo[] = [
 
// ]
export function Set_Page_Permission(ROUTES_,POINTER_)
{
  
  ROUTES=ROUTES_;
 
Pointer_Table=POINTER_;  
 
}

export function clear_Route()
{
  ROUTES=[];
  Pointer_Table=[];  
}

export  function Get_Page_Permission(Menu_Id)
{

var RootIndex_Value=Pointer_Table[Menu_Id-1];
if(RootIndex_Value!=undefined)
{
if(RootIndex_Value<=ROUTES.length-1)
return{'View':ROUTES[RootIndex_Value].View,'Save':ROUTES[RootIndex_Value].Save,'Edit':ROUTES[RootIndex_Value].Edit,'Delete':ROUTES[RootIndex_Value].Delete} ;
}
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 
Login_Id:string="0";
menuItems:any[];
uname:string;

Menus:any[];
  private ensurePriceRequestMenuItem() {
    if (!Array.isArray(this.menuItems)) this.menuItems = [];

    const exists = this.menuItems.some((m: any) => (m && (m.path === '/PriceRequest' || m.path === 'PriceRequest')));
    if (exists) return;

    this.menuItems.push({
      path: '/PriceRequest',
      title: 'Price Request',
      icon: 'unarchive',
      class: '',
      Menu_Id: '0',
      View: 'true',
      Save: 'true',
      Edit: 'true',
      Delete: 'true',
      Menu_Type: true,
    });
  }

  private ensurePriceResponseMenuItem() {
    if (!Array.isArray(this.menuItems)) this.menuItems = [];

    const exists = this.menuItems.some((m: any) => (m && (m.path === '/PriceResponse' || m.path === 'PriceResponse')));
    if (exists) return;

    this.menuItems.push({
      path: '/PriceResponse',
      title: 'Price Response',
      icon: 'unarchive',
      class: '',
      Menu_Id: '0',
      View: 'true',
      Save: 'true',
      Edit: 'true',
      Delete: 'true',
      Menu_Type: true,
    });
  }

  private ensureVerticalMenuItem() {
    if (!Array.isArray(this.menuItems)) this.menuItems = [];
    const exists = this.menuItems.some((m: any) => (m && (m.path === '/Vertical' || m.path === 'Vertical')));
    if (exists) return;
    this.menuItems.push({
      path: '/Vertical',
      title: 'Vertical',
      icon: 'layers',
      class: '',
      Menu_Id: '0',
      View: 'true',
      Save: 'true',
      Edit: 'true',
      Delete: 'true',
      Menu_Type: true,
    });
  }

  private ensureDesignationMenuItem() {
    if (!Array.isArray(this.menuItems)) this.menuItems = [];
    const exists = this.menuItems.some((m: any) => (m && (m.path === '/Designation' || m.path === 'Designation')));
    if (exists) return;
    this.menuItems.push({
      path: '/Designation',
      title: 'Designation',
      icon: 'work',
      class: '',
      Menu_Id: '0',
      View: 'true',
      Save: 'true',
      Edit: 'true',
      Delete: 'true',
      Menu_Type: true,
    });
  }

  private ensureSalesOrderMenuItem() {
    if (!Array.isArray(this.menuItems)) this.menuItems = [];

    const exists = this.menuItems.some((m: any) => (m && (m.path === '/SalesOrder' || m.path === 'SalesOrder')));
    if (exists) return;

    this.menuItems.push({
      path: '/SalesOrder',
      title: 'Sales Order',
      icon: 'description',
      class: '',
      Menu_Id: '117',
      View: 'true',
      Save: 'true',
      Edit: 'true',
      Delete: 'true',
      Menu_Type: true,
    });
  }

  constructor(
    public userData: UserData,
    public router: Router,

  ) {
    
    this.menuItems= ROUTES.filter(menuItem => menuItem);
    this.ensurePriceRequestMenuItem();
    this.ensurePriceResponseMenuItem();
    this.ensureVerticalMenuItem();
    this.ensureDesignationMenuItem();
    this.ensureSalesOrderMenuItem();
    // this.router.navigateByUrl('Leads');
   }

  ngOnInit() {
    
    // this.menuItems= ROUTES.filter(menuItem => menuItem);
    // this.router.navigateByUrl('Leads');

this.uname=localStorage.getItem('uname');
var retrievedObject=localStorage.getItem('Routes_Temp');
ROUTES=JSON.parse(retrievedObject);

var retrievedPointer=localStorage.getItem('Pointer_Temp');
Pointer_Table=JSON.parse(retrievedPointer);
this.menuItems= ROUTES.filter(menuItem => menuItem);
this.ensurePriceRequestMenuItem();
this.ensurePriceResponseMenuItem();
this.ensureVerticalMenuItem();
this.ensureDesignationMenuItem();
this.ensureSalesOrderMenuItem();

  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
  Document_Type() {
   
    this.router.navigateByUrl('/Document_Type');
  }

  
  logout() {
    this.userData.logout();

    // localStorage.removeItem("Routes_Temp");
    ROUTES=[];
    Pointer_Table=[];
    localStorage.setItem("Routes_Temp",JSON.stringify(ROUTES));
    localStorage.setItem("Pointer_Temp",JSON.stringify(Pointer_Table));
    //localStorage.removeItem("Pointer_Temp");
     localStorage.removeItem("Login_User");

    
    this.router.navigateByUrl('/auth/login');

//     
//     var retrievedObject=localStorage.getItem('Routes_Temp');
// ROUTES=JSON.parse(retrievedObject);

// var retrievedPointer=localStorage.getItem('Pointer_Temp');
// Pointer_Table=JSON.parse(retrievedPointer);
  }

}
