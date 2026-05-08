import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Client_Accounts_Service } from '../../../services/Client_Accounts.Service';
import { Journal_Entry_Service } from '../../../services/Journal_Entry.Service';
import { Account_Group_Service } from '../../../services/Account_Group.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Client_Accounts } from '../../../models/Client_Accounts';
import {Account_Group } from '../../../models/Account_Group';

import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Customer',
templateUrl: './Customer.component.html',
styleUrls: ['./Customer.component.css']
})
export class CustomerComponent implements OnInit {
Client_Accounts_Data:Client_Accounts[]
Employee_Details_Data:Client_Accounts[]
Employee_:Client_Accounts=new Client_Accounts();
Employee_Search:Client_Accounts=new Client_Accounts();
Client_Accounts_:Client_Accounts= new Client_Accounts();
Client_Accounts_Name_Search:string;
Account_Group_Data:Account_Group[]
Search_Client_Accounts_:string;
Account_Group_Temp:Account_Group=new Account_Group();
Employee_Details_Temp:Client_Accounts=new Client_Accounts();
Account_Group_:Account_Group=new Account_Group();
Client_Accounts_Id:number;
//Account_Group_Temp:Account_Group=new Account_Group();
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;

color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Client_Accounts_Edit:boolean;
Client_Accounts_Save:boolean;
Client_Accounts_Delete:boolean;
Employee_Name:string;
Employee_Id:number;
User_Type:number;
Employee_Edit:boolean=false;
Group_Edit:boolean=false;
Login_User:string="0";
constructor(public Client_Accounts_Service_:Client_Accounts_Service,public Journal_Entry_Service_:Journal_Entry_Service, public Account_Group_Service_:Account_Group_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
     
    
    this.User_Type=Number(localStorage.getItem('User_Type'));
    this.Employee_Name=localStorage.getItem('Employee_Name');
    this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
    this.Login_User=localStorage.getItem("Login_User");
    localStorage.removeItem('token');
this.Permissions = Get_Page_Permission(26);
if(this.Permissions==undefined || this.Permissions==null)
{
this.router.navigateByUrl('/auth/login');
}
else
{
this.Client_Accounts_Edit=this.Permissions.Edit;
this.Client_Accounts_Save=this.Permissions.Save;
this.Client_Accounts_Delete=this.Permissions.Delete;
this.Page_Load()
}
}

    


Page_Load()
{
    debugger
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 300;
   this.Group_Edit=true;
    if (this.User_Type==2){
        this.Employee_Search.Client_Accounts_Id=this.Employee_Id;
        this.Employee_Search.Client_Accounts_Name=this.Employee_Name;
        this.Employee_Edit=true;
    }
    
// this.Client_Accounts_.Opening_Type=1;
this.Clr_Client_Accounts();
debugger 
this.Search_Client_Accounts();
//this.Get_Account_Group();
this.Entry_View=false;

}
Create_New()
{
this.Entry_View = true;
this.Clr_Client_Accounts();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}



// Edit_Account_Group() 
//         {
//              
//  this.Account_Group_Service_.Get_Account_Group(this.Client_Accounts_.Account_Group_Id).subscribe(Rows => {
//   
//         this.Account_Group_Data = Rows[0];
//         this.Account_Group_Temp.Under_Group=this.Account_Group_Data[0].Under_Group;
//         this.Account_Group_Temp.Group_Name=this.Account_Group_Data[0].Group_Name;
  
//      this.Account_Group_=this.Account_Group_Temp;
//         },
//         Rows => 
//         {
//         //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//         });
//         }
 Clr_Client_Accounts()
 {
this.Client_Accounts_.Client_Accounts_Id=0;
this.Client_Accounts_.Account_Group_Id=0;
this.Client_Accounts_.Client_Accounts_Code="";
this.Client_Accounts_.Client_Accounts_Name="";
this.Client_Accounts_.Client_Accounts_No="";
//this.Account_Group_=null;

this.Account_Group_.Account_Group_Id=3;
this.Account_Group_.Group_Name='Sundry Debtors';


if (this.User_Type==2){
    this.Employee_.Client_Accounts_Id=this.Employee_Id;
    this.Employee_.Client_Accounts_Name=this.Employee_Name;
    this.Employee_Edit=true;
}
else{
    this.Employee_=null;
}
this.Client_Accounts_.Address1="";
this.Client_Accounts_.Address2="";
this.Client_Accounts_.Address3="";
this.Client_Accounts_.Address4="";
this.Client_Accounts_.PinCode="";
this.Client_Accounts_.State="";
this.Client_Accounts_.Country="";
this.Client_Accounts_.Phone="";
this.Client_Accounts_.Mobile="";
this.Client_Accounts_.Email="";
this.Client_Accounts_.GSTNo="";
// this.Client_Accounts_.PanNo="";
// this.Client_Accounts_.StateCode="";
// this.Client_Accounts_.Opening_Balance=0;
// this.Client_Accounts_.Description1="";
// this.Client_Accounts_.Entry_Date="";
// this.Client_Accounts_.UserId=0;
// this.Client_Accounts_.LedgerInclude="";
// this.Client_Accounts_.CanDelete="";
// this.Client_Accounts_.Commision=0;
// this.Client_Accounts_.User_Details_Name="";
// this.Client_Accounts_.Password="";

}
Get_Account_Group(event: any) 
{
            var Value = "";
            if (event.target.value == "")
            Value = undefined;
            else
            Value = event.target.value;
            this.issLoading=true;
       this.Account_Group_Service_.Search_Account_Group_Typeahead(Value).subscribe(Rows => {
                   
        if (Rows != null) {
       this.Account_Group_Data = Rows[0];
        }
        this.issLoading=false;
        },
        Rows => 
        {
            this.issLoading=false;
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
}
Get_Employee(event: any)
 {          
        var Value = "";
        if (event.target.value == "")
        Value = undefined;
        else
        Value = event.target.value;
        this.issLoading=true;
         
        this.Journal_Entry_Service_.Accounts_Typeahead(2,Value).subscribe(Rows => {
             
        if (Rows != null) {
        this.Employee_Details_Data = Rows[0];
        }
        this.issLoading=false;
        },
        Rows => {
            this.issLoading=false;
        });
        }
display_Employee(Client_Accounts_e: Client_Accounts) 
{
              
        if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
}
Search_Client_Accounts()
{  
    debugger
    var  Employee_Id=0,Search_Client_Accounts=""; 
this.issLoading=true;

//  if(this.Search_Client_Accounts_==undefined)
//  this.Search_Client_Accounts_="";

 if (this.Search_Client_Accounts_ == undefined || this.Search_Client_Accounts_ == null || this.Search_Client_Accounts_ == "")
 Search_Client_Accounts = undefined;
 else
 Search_Client_Accounts=this.Search_Client_Accounts_ ;

if(this.Employee_Search.Client_Accounts_Id==undefined ||  this.Employee_Search==undefined || this.Employee_Search==null)
Employee_Id=0
else
Employee_Id=this.Employee_Search.Client_Accounts_Id;




this.Client_Accounts_Service_.Search_Customer(Search_Client_Accounts ,3).subscribe(Rows => {
     
 this.Client_Accounts_Data=Rows[0];

this.Total_Entries=this.Client_Accounts_Data.length;
if(this.Client_Accounts_Data.length==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
}
this.issLoading=false;
 },
 
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
 });
}
Delete_Client_Accounts(Client_Accounts_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Client_Accounts_Service_.Delete_Client_Accounts(Client_Accounts_Id).subscribe(Delete_status => {
if(Delete_status[0][0].Client_Accounts_Id_>0){
this.Client_Accounts_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
}
else
{
//this.Client_Accounts_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'Error',Type:"2"}});
 });
this.issLoading=false;
}
 });
}



// Get_Account_Group_Data() 
//         {
//              
//  this.Account_Group_Service_.Get_Account_Group(this.Account_Group_.Account_Group_Id).subscribe(Rows => {
//   
//         this.Account_Group_Data = Rows[0];
//         this.Account_Group_Temp.Under_Group=this.Account_Group_Data[0].Under_Group;
//         this.Account_Group_Temp.Group_Name=this.Account_Group_Data[0].Group_Name;
  
//      this.Account_Group_=this.Account_Group_Temp;
//         },
//         Rows => 
//         {
//         //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//         });
//         }

display_Item_Group(Account_Group_: Account_Group)
        {
             
        if (Account_Group_) { return Account_Group_.Group_Name; 
        }
        }
Save_Client_Accounts()
{
     

 if(this.Account_Group_==null||this.Account_Group_==undefined||this.Account_Group_.Account_Group_Id==0||this.Account_Group_==undefined)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'select Account group',Type: "3" }});
}
else if(this.Client_Accounts_.Client_Accounts_Name==null||this.Client_Accounts_.Client_Accounts_Name=="")
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the Name ',Type: "3" }});
}
// else if(this.Client_Accounts_.User_Details_Name==null||this.Client_Accounts_.User_Details_Name=="")
// {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the User Name ',Type: "3" }});
// }
// else if(this.Client_Accounts_.Password==null||this.Client_Accounts_.Password=="")
// {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the Password ',Type: "3" }});
// }
else
{ 
    console.log("Before Customer Save API call");
    this.issLoading = true;

    this.Client_Accounts_.Employee_Id = 0;
    this.Client_Accounts_.Account_Group_Id = this.Account_Group_.Account_Group_Id;

    this.Client_Accounts_Service_.Save_Client_Accounts(this.Client_Accounts_)
    .pipe(
      finalize(() => {
        this.issLoading = false;
        const saveButton = document.getElementById("Save_Button");
        if (saveButton) saveButton.hidden = false;
      })
    )
    .subscribe({
      next: (res: any) => {
        console.log("Customer Save API Response:", res);
        
        if (res && res.success) {
          const data = res.data;
          const rows = Array.isArray(data) ? data : (data && data.rows ? data.rows : []);
          const result = rows && rows[0] ? rows[0] : (Array.isArray(data) ? data[0] : null);

          const resultId = result ? Number(result.Client_Accounts_Id_) : 0;
          if (resultId > 0) {
            this.dialogBox.open(DialogBox_Component, {
              panelClass: 'Dialogbox-Class',
              data: { Message: 'Saved Successfully', Type: "false" }
            });
            this.Search_Client_Accounts();
          } else if (resultId == -1) {
            this.dialogBox.open(DialogBox_Component, {
              panelClass: 'Dialogbox-Class',
              data: { Message: 'Customer Name Already Exists', Type: "2" }
            });
          } else {
            this.dialogBox.open(DialogBox_Component, {
              panelClass: 'Dialogbox-Class',
              data: { Message: 'Error: ' + (res.message || 'Save failed'), Type: "2" }
            });
          }
        } else {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Error: ' + (res && res.message ? res.message : 'Save failed'), Type: "2" }
          });
        }
      },
      error: (error: any) => {
        console.error("Customer Save API ERROR:", error);
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" }
        });
      }
    });
}
}
Edit_Client_Accounts(Client_Accounts_e:Client_Accounts,index)
{
     debugger;
this.Entry_View=true;
this.Client_Accounts_=Client_Accounts_e;
this.Client_Accounts_=Object.assign({},Client_Accounts_e);



this.Account_Group_Temp.Account_Group_Id=Client_Accounts_e.Account_Group_Id;
this.Account_Group_Temp.Group_Name=Client_Accounts_e.Account_Group_Name;
this.Account_Group_=this.Account_Group_Temp;



 

this.Employee_Details_Temp.Client_Accounts_Id=Client_Accounts_e.Employee_Id;
// this.Employee_Details_Temp.Client_Accounts_Name=Client_Accounts_e.Employee;
this.Employee_=this.Employee_Details_Temp;

}
}

