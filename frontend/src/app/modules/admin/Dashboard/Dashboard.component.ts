import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { Stock_Add_Details } from '../../../models/Stock_Add_Details';
 
import { User_Details } from '../../../models/User_Details';
 
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import {FormControl} from '@angular/forms';
 
import { DialogBox_Component } from "../DialogBox/DialogBox.component";
import { Payment_Voucher } from "../../../models/Payment_Voucher";
import { Purchase_Payment } from "../../../models/Purchase_Payment";
import { Client_Accounts } from "../../../models/Client_Accounts";
import { Company } from "../../../models/Company";
import { PaymentMode } from "../../../models/PaymentMode";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";
import { Document } from "../../../models/Document";
import { Stock_Add_Details_Service } from '../../../services/Stock_Add_Details.Service';
import { Dashboard_Service } from '../../../services/Dashboard.Service';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
	parse: {
		dateInput: "DD/MM/YYYY",
	},
	display: {
		dateInput: "DD/MM/YYYY",
		monthYearLabel: "MMM YYYY",
		dateA11yLabel: "DD/MM/YYYY",
		monthYearA11yLabel: "MMMM YYYY",
	},
};
@Component({
selector: 'app-Dashboard',
templateUrl: './Dashboard.component.html',
styleUrls: ['./Dashboard.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})

export class DashboardComponent   {
    
Branch_Data:Client_Accounts[]
 
Branch_: Client_Accounts = new Client_Accounts();
Branch_Search: Client_Accounts = new Client_Accounts();
Branch_Data_Temp: Client_Accounts = new Client_Accounts();

Branch_Mode_: Client_Accounts = new Client_Accounts();
Branch_Data_: Client_Accounts = new Client_Accounts();
    Dashboard_Edit:boolean;
    Dashboard_Save:boolean;
    Dashboard_Delete:boolean;
    Search_FromDate: Date = new Date();
    Search_ToDate: Date = new Date();
    missedfollowup_count: number = 1;

    followup_count: number = 1;

     
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
myInnerHeight: number;
    issLoading: boolean;
 
    Login_User: string = "0";
    Menu_Id: number = 9;

    myTotalHeight:number;
    Look_In_Date:Boolean=true;
    Dashboard_Count:number;
    Dashboard_Count1: number;
    Dashboard_Count2:number;
    Dashboard_Count3:number; 
    Dashboard_Count4:number;
    Dashboard_Count5:number;
    Dashboard_Count6:number;
    Dashboard_Count7:number;
    Dashboard_Count8:number;
 
    Edit_Page_Permission: any;
 
  a:number;
    Graph_Button: boolean = false;

    Enquiry_Source_title = '';
    Enquiry_Source_type = 'PieChart';
    Enquiry_Source_data = [
      
    ];
    Enquiry_Source_columnNames = [];
    Enquiry_Source_options = {
      is3D: true,
    };
    width = 550;
    height = 400;
  
type1 = 'ColumnChart';


//  barColors = ['red', 'blue', 'green', 'yellow','blue','black'];
series = ['red', 'blue', 'green', 'yellow','blue','black'];
options = {
  height: 200,

  is3D: true,
  fontSize: 9,
  //  barColors:['red', 'blue', 'green', 'yellow','blue','black']

  barColors: function(series) {
    return series.color;
  }
};
    

    Title_Bar = '';
 
  data221 = [
   
  ];
  columnNames_Bar = ['Source',  'Count'];
  options_Bar = {
    is3D: true,
  };

  Permissions: any;
 
constructor( public Stock_Add_Details_Service_:Stock_Add_Details_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog,public Dashboard_service_ :Dashboard_Service) { }

ngOnInit() 
{
    debugger
    this.Login_User = localStorage.getItem("Login_User");
    this.Permissions = Get_Page_Permission(34);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('Home_Page');
    }
    else
    {
    this.Dashboard_Edit=this.Permissions.Edit;
    this.Dashboard_Save=this.Permissions.Save;
    this.Dashboard_Delete=this.Permissions.Delete;
    debugger
    this.Search_Dashboard()
    if(Number(this.Login_User)>0)
     this.Page_Load()
    }
} 

Page_Load()
{
    debugger
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 250;
 
    debugger
    this.Get_Document_Dropdowns();
    // this.Get_Dashboard_Count();

}

 

Get_Document_Dropdowns() {
    debugger
    this.Stock_Add_Details_Service_.Get_ItemGroup_Load_Data().subscribe(
      (Rows) => {     
        debugger
  
    
 
        this.Branch_Data = Rows[1].slice();
        this.Branch_Data_Temp.Client_Accounts_Id = 0;
        this.Branch_Data_Temp.Client_Accounts_Name = "Select";
        this.Branch_Data.unshift(Object.assign({}, this.Branch_Data_Temp));
        this.Branch_Data_ = this.Branch_Data[0];
        this.Branch_Search = this.Branch_Data[0];
        
 
   
      },
      (Rows) => {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: "2" },
        });
      }
    );
  }

// Get_Dashboard_Count()
// {
//     {
//             this.issLoading = true;
            
//             this.Dashboard_service_.(this.Login_User)
//         .subscribe(Rows => 
//         {
            
//             //log(Rows)
//             this.Dashboard_Count =Rows.returnvalue.Leads[0].Data_Count;  
//             this.Dashboard_Count1=Rows.returnvalue.Leads[1].Data_Count; 
//             this.Dashboard_Count2=Rows.returnvalue.Leads[2].Data_Count; 
//             this.Dashboard_Count3=Rows.returnvalue.Leads[3].Data_Count; 
//             this.Dashboard_Count4=Rows.returnvalue.Leads[4].Data_Count;
//             this.Dashboard_Count5=Rows.returnvalue.Leads[5].Data_Count; 
//             this.Dashboard_Count7=Rows.returnvalue.Leads[6].Data_Count; 
//             this.Dashboard_Count8=Rows.returnvalue.Leads[7].Data_Count; 

//             // this.Dashboard_Count6=Rows.returnvalue.Leads[6].Data_Count; 
            
//             // log(this.Dashboard_Count)    
            
//              var Enquiry_Source_data_temp = Rows.returnvalue.Enquiry_Source_data;            
//             var result = [];
//              this.Enquiry_Source_columnNames=[];
//             for (var i in Enquiry_Source_data_temp)
//             {
//                 result.push([Enquiry_Source_data_temp[i].Enquiry_Source_Name, Enquiry_Source_data_temp[i].Data_Count]);
      
//             }
//            // var data_temp = new google.visualization.DataTable(result);
//             this.Enquiry_Source_columnNames.push('Source')
//             this.Enquiry_Source_columnNames.push('Count')
//             this.Enquiry_Source_data = result;  
//             this.Data_Bar=result;     
//             this.issLoading = false;
//         },
//         Rows => 
//         {   
//             const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//             this.issLoading = false;
//         });
//         }
// }
Click_No1()
{
    this.router.navigateByUrl('/Enquiry_Source_Summary');
}
Click_No2()
{
      this.router.navigateByUrl('/Registration_Summary');  
}
Click_No3()
{
    this.router.navigateByUrl('/Pending_FollowUp');
   
}
Click_No4()
{
    this.router.navigateByUrl('/Receipt_Summary_Report');
   
}
Click_No5()
{
    this.router.navigateByUrl('/Enquiry_Source_Summary');
   
}
 
Click_No6()
{
    this.router.navigateByUrl('/Application_Report');
   
}

Click_No7()
{
    this.router.navigateByUrl('/Student_Task');
   
}

Click_No8()
{
    this.router.navigateByUrl('/Student');
   
}

Search_Dashboard()
{
    debugger
    var  Branch = 0;
 var look_In_Date_Value=0;

if (this.Look_In_Date == true )
look_In_Date_Value = 1;


if (this.Branch_Search != undefined && this.Branch_Search != null)
if (
    this.Branch_Search.Client_Accounts_Id != undefined &&
    this.Branch_Search.Client_Accounts_Id != null
)
    Branch = this.Branch_Search.Client_Accounts_Id;

this.issLoading=true;
// if(this.Employee_.Client_Accounts_Id==undefined ||  this.Employee_==undefined || this.Employee_==null)
// Employee_Id=0
// else
// Employee_Id=this.Employee_.Client_Accounts_Id;
debugger
this.Dashboard_service_.Search_Dashboard_Details(moment(this.Search_FromDate).format('YYYY-MM-DD'),moment(this.Search_ToDate).format('YYYY-MM-DD'),look_In_Date_Value,Branch,this.Login_User).subscribe(Rows => {
    debugger
                this.Dashboard_Count =Rows[0][0].Data_Count;  
            this.Dashboard_Count1= Rows[0][1].Data_Count;  
            this.Dashboard_Count2= Rows[0][2].Data_Count;  
            this.Dashboard_Count3= Rows[0][3].Data_Count;  
            this.Dashboard_Count4=Rows[0][4].Data_Count;  
            this.Dashboard_Count5=Rows[0][5].Data_Count;  
 
 this.issLoading=false;
 

 // this.Dashboard_Count6=Rows.returnvalue.Leads[6].Data_Count; 
 
 // log(this.Dashboard_Count)    
 debugger
//   var Enquiry_Source_data_temp = Rows[0];          
//  var result = [];
//   this.Enquiry_Source_columnNames=[];
//  for (var i in Enquiry_Source_data_temp)
//  {
//      result.push([Enquiry_Source_data_temp[i].Purchase, Enquiry_Source_data_temp[i].Data_Count]);

//  }
// // var data_temp = new google.visualization.DataTable(result);
//  this.Enquiry_Source_columnNames.push('Source')
//  this.Enquiry_Source_columnNames.push('Count')
//  this.Enquiry_Source_data = result;  
//  this.data221=result; 
 
 
},
Rows => { 
        this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}
 
 
 
}

