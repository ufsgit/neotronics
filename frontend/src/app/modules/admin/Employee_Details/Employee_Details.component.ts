import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

// import { Employee_Details_Service } from '../../../services/Employee_Details.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Employee_Details } from '../../../models/Employee_Details';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { Location } from '../../../models/Location';
import { Employee_Master } from '../../../models/Employee_Master';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
parse: {
     dateInput: 'DD/MM/YYYY',
    },
  display: {dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY',  dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',},
};
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';import { Employee_Details_Service } from 'app/services/Employee_Details.Service';
@Component({
selector: 'app-Employee_Details',
templateUrl: './Employee_Details.component.html',
styleUrls: ['./Employee_Details.component.css'],
providers: [
{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})

export class Employee_DetailsComponent implements OnInit {
Employee_Details_Data:Employee_Details[]

Employee_Details_:Employee_Details= new Employee_Details();
Employee_Master_:Employee_Master= new Employee_Master();
Client_Accounts_Data:Client_Accounts[]
Client_Accounts_:Client_Accounts= new Client_Accounts();

Location_Data:Location[];
Edit_Location_Data:Location[];
Location_Data_Temp:Location[];
Location_:Location= new Location();

Under_Employee_Data:Client_Accounts[]
Under_Employee_:Client_Accounts= new Client_Accounts();
Under_Employee_Temp:Client_Accounts= new Client_Accounts();


Employee_Details_Name_Search="";
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Employee_Details_Edit:boolean;
Employee_Details_Save:boolean;
Employee_Details_Delete:boolean;
year:any;
month:any;
day:any;
date:any;
Client_Id:number=0;
Search_Name:string="";
constructor(public Employee_Details_Service_:Employee_Details_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Permissions = Get_Page_Permission(8);
     
    if(this.Permissions==undefined || this.Permissions==null)
    {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login');
    }
    else
    {
        this.Employee_Details_Edit=this.Permissions.Edit;
        this.Employee_Details_Save=this.Permissions.Save;
        this.Employee_Details_Delete=this.Permissions.Delete;
        this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    
    this.Employee_Details_.DateOfBirth=new Date();
  //  this.Employee_Details_.DateOfBirth=this.New_Date(new Date());
    // this.Client_Accounts_.Opening_Type=1;
    this.Clr_Employee_Details();
    this.Clr_Client_Accounts();
    this.Employee_Details_.WorkingStatus=0;
    this.Load_Location();
    this.Search_Employee_Details();
    this.Entry_View=false;
}
Load_Location()
{
 
   // this.issLoading = true;
    this.Employee_Details_Service_.Load_Location().subscribe(Rows =>
     {
         
        if (Rows != null) {
        this.Location_Data = Rows[0];
        //this.issLoading = false;
    }
    },
        Rows => 
        {
        //this.issLoading = false;
    }); 
}
New_Date(Date)
{
     
    this.date=Date;
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    if (this.month < 10)
    {
         this.month = "0" + this.month;
    }
        this.day = this.date.getDate().toString();
        if (Number.parseInt(this.day) <10) {
        this.day = "0" + this.day;
    }
        this.date = this.year + "-" + this.month + "-" + this.day;
        return this.date;
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Employee_Details();
    this.Clr_Client_Accounts();
    // this.Clr_Location();
    }
Close_Click()
{
    this.Entry_View = false;
    this.Clr_Employee_Details();
    this.Clr_Client_Accounts();
    this.Search_Employee_Details();
}

Clr_Client_Accounts()
{
    this.Client_Accounts_.Client_Accounts_Id=0;
    this.Client_Accounts_.Account_Group_Id=2;
    this.Client_Accounts_.Client_Accounts_Code="";
    this.Client_Accounts_.Client_Accounts_Name="";
    this.Client_Accounts_.Client_Accounts_No="";
    this.Client_Accounts_.Address1="";
    this.Client_Accounts_.Address2="";
    this.Client_Accounts_.Address3="";
    this.Client_Accounts_.Address4="";
    this.Client_Accounts_.PinCode="";
    this.Client_Accounts_.State="";
    this.Client_Accounts_.GSTNo="";
    this.Client_Accounts_.Country="";
    this.Client_Accounts_.Phone="";
    this.Client_Accounts_.Mobile="";
    this.Client_Accounts_.Email="";
    this.Client_Accounts_.Opening_Balance=0;
    // this.Client_Accounts_.Description1="";
    // this.Client_Accounts_.Entry_Date="";
    // this.Client_Accounts_.UserId=0;
    // this.Client_Accounts_.LedgerInclude="";
    // this.Client_Accounts_.CanDelete="";
    // this.Client_Accounts_.Commision=0;
    this.Under_Employee_=null;
}
 Clr_Employee_Details()
 {
    this.Employee_Details_.Employee_Details_Id=0;
    this.Employee_Details_.Client_Accounts_Id=0;
    this.Employee_Details_.Level_Id=0;
    this.Employee_Details_.DesigId=0;
    this.Employee_Details_.DateOfBirth=new Date();
    this.Employee_Details_.DateOfBirth=this.New_Date(this.Employee_Details_.DateOfBirth);
    this.Employee_Details_.DateOfJoin=new Date();
    this.Employee_Details_.DateOfJoin=this.New_Date(this.Employee_Details_.DateOfJoin);
    this.Employee_Details_.ReleiveDate=new Date();
    this.Employee_Details_.ReleiveDate=this.New_Date(this.Employee_Details_.ReleiveDate);
    this.Employee_Details_.WorkingStatus=0;
    this.Employee_Details_.Locations="";
    this.Employee_Details_.Manager_Id=0;
    this.Employee_Details_.Is_SalesMan=false;
    this.Employee_Details_.Can_Delete=false;
        if(this.Location_Data!=null && this.Location_Data!=undefined && this.Location_Data.length>0)
        for(var m=0;m<this.Location_Data.length;m++)
        {
        this.Location_Data[m].Check_Box= false;
        }

}
Clr_Location()
{
    
}
Search_Under_Employee_(event: any)
{
     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;

    else
        Value = event.target.value;
         
        //if(this.Under_Employee_Data==undefined || this.Under_Employee_Data.length==0)
        {
        this.issLoading = true;
    this.Employee_Details_Service_.Search_Under_Employee(2,Value).subscribe(Rows => {
 
        if (Rows != null) {
            this.Under_Employee_Data = Rows[0];
         
        }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
    }
       
}
display_Search_Under_Employee_(Under_Employee_: Client_Accounts) {

    if (Under_Employee_) { return Under_Employee_.Client_Accounts_Name; }
}
Search_Employee_Details()
{
    if(this.Search_Name==null || this.Search_Name==undefined)
    this.Search_Name="";
this.issLoading=true; 
this.Employee_Details_Service_.Search_Employee_Details(this.Search_Name).subscribe(Rows => {
     
 this.Employee_Details_Data=Rows[0];
this.issLoading=false;
this.Total_Entries=this.Employee_Details_Data.length;
if(this.Employee_Details_Data.length==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
}
this.issLoading = false;
 },
 Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type: "2" }});
 });
}
Delete_Employee_Details(Employee_e:Employee_Details,index)
{
     
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
// this.issLoading=true;
 
this.Employee_Details_Service_.Delete_Employee_Details(Employee_e.Client_Accounts_Id).subscribe(Delete_status => {
     
    Delete_status=Delete_status[0];
    Delete_status=Delete_status[0].DeleteStatus_.data[0];
 if(Delete_status==1){
    this.Employee_Details_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
this.Search_Employee_Details();
}
else
{
    // this.Employee_Details_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Deleted',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
     this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
 });
}
Save_Employee_Details()
{

     
//     var Location_Check=false;
//     this.Location_Data_Temp=[];
//     for (var j = 0; j < this.Location_Data.length; j++)
//     {
//         if(this.Location_Data[j].Check_Box== true)
//         Location_Check=true
//     }
//     if (Location_Check==false)
//     {
//    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Atleast one Location', Type: "3" } });
//    }
//   else if (this.Under_Employee_==undefined || this.Under_Employee_==null || this.Under_Employee_.Client_Accounts_Id==undefined || this.Under_Employee_.Client_Accounts_Id==null || this.Under_Employee_.Client_Accounts_Id==0 )
//    {
//   const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Under Employee', Type: "3" } });
//   }
//    else 
   if (this.Client_Accounts_.Client_Accounts_Name==undefined || this.Client_Accounts_.Client_Accounts_Name==null || this.Client_Accounts_.Client_Accounts_Name=="" )
   {
  const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Name', Type: "3" } });
  }

  else
  {
        

this.Employee_Details_.Manager_Id=0
//if(this.Client_Accounts_!=undefined && this.Client_Accounts_!=null) 
//this.Client_Accounts_.Client_Accounts_Id=this.Client_Id;
this.Client_Accounts_.Employee_Id=0

// if( this.Location_Data_Temp==undefined ||  this.Location_Data_Temp==null)
// this.Location_Data_Temp=[];
// for (var m = 0; m < this.Location_Data.length; m++)
//     {
//         if ( Boolean(this.Location_Data[m].Check_Box) == true)
//         {
//             this.Location_Data_Temp.push(this.Location_Data[m]);
//         }
//     }
    console.log("Before Employee Details Save API call");
    this.issLoading = true;

    this.Employee_Details_.DateOfBirth = this.New_Date(new Date(moment(this.Employee_Details_.DateOfBirth).format('YYYY-MM-DD')));
    this.Employee_Details_.DateOfJoin = this.New_Date(new Date(moment(this.Employee_Details_.DateOfJoin).format('YYYY-MM-DD')));
    this.Employee_Details_.ReleiveDate = this.New_Date(new Date(moment(this.Employee_Details_.ReleiveDate).format('YYYY-MM-DD')));

    this.Employee_Master_.Employee_Details = this.Employee_Details_;
    this.Employee_Master_.ClientAccounts = this.Client_Accounts_;

    this.Employee_Details_Service_.Save_Employee_Details(this.Employee_Master_)
    .pipe(
      finalize(() => {
        console.log("Employee Details Save Finalize executed");
        this.issLoading = false;
        const saveButton = document.getElementById("Save_Button");
        if (saveButton) saveButton.hidden = false;
      })
    )
    .subscribe({
      next: (Save_status) => {
        console.log("Employee Details Save API Response:", Save_status);
        
        if (!Save_status || !Save_status[0]) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Invalid server response', Type: "2" }
          });
          return;
        }

        const resultId = Number(Save_status[0].Client_Accounts_Id_);
        if (resultId > 0) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Saved Successfully', Type: "false" }
          });
          this.Close_Click();
        } else if (resultId == -1) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Employee Name Already Exists', Type: "2" }
          });
        } else {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Error Occured', Type: "2" }
          });
        }
      },
      error: (error) => {
        console.error("Employee Details Save API ERROR:", error);
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" }
        });
      }
    });

}
}
Edit_Employee_Details(Employee_Details_e:Employee_Details,index)
{
     
    this.Entry_View=true;
    this.Employee_Details_Service_.Get_Employee_Details(Employee_Details_e.Client_Accounts_Id).subscribe(Rows =>
        {
             
            this.Employee_Details_=Rows.returnvalue.Employee_Details[0];
            this.Client_Accounts_=Rows.returnvalue.Client_Accounts[0];
            //this.Edit_Location_Data=Rows.returnvalue.Employee_Location;
            // this.Location_Data=Rows.returnvalue.Employee_Location;
            // for (var m = 0; m <this.Location_Data.length; m++) {
            //     if ( Boolean(this.Edit_Location_Data[m].Check_Box) == true){
            //         this.Location_Data[m].Check_Box=true;
            //     }
            //     else
            //     this.Location_Data[m].Check_Box=false;
            //     }
            // this.Under_Employee_Temp.Client_Accounts_Id= this.Employee_Details_.Manager_Id;
            // this.Under_Employee_Temp.Client_Accounts_Name= this.Employee_Details_.Manager;
            // this.Under_Employee_=this.Under_Employee_Temp;
             
            //this.Client_Id= this.Client_Accounts_.Client_Accounts_Id;
            this.issLoading=false;
        },
        Rows => 
        { 
        this.issLoading=false;
        });
}
}

