import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.Service';
import { Employee_Details_Service } from '../../../services/Employee_Details.Service';
import { Journal_Entry_Service } from '../../../services/Journal_Entry.Service';
import { Account_Group_Service } from '../../../services/Account_Group.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { Account_Group } from '../../../models/Account_Group';
import { Cheque_Book } from '../../../models/Cheque_Book';
import { Cheque_Leaves } from '../../../models/Cheque_Leaves';

import { MatDialog } from '@angular/material/dialog';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
    selector: 'app-Cheque_Book',
    templateUrl: './Cheque_Book.component.html',
    styleUrls: ['./Cheque_Book.component.css']
})
export class Cheque_BookComponent implements OnInit {
    
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Cheque_Book_Edit:boolean;
Cheque_Book_Save:boolean;
Cheque_Book_Delete:boolean;

Bank_Data:Client_Accounts[]
Bank_:Client_Accounts=new Client_Accounts();
Bank_Temp:Client_Accounts= new Client_Accounts();
Bank_Search:Client_Accounts= new Client_Accounts();

Search_Cheque_Book_:string;

Employee_Name:string;
Employee_Id:number;
User_Type:number;
Employee_Edit:boolean=false;
Login_User:string="0";

Cheque_Book_:Cheque_Book=new Cheque_Book;
Cheque_Book_Data:Cheque_Book[];
Cheque_Book_Temp: Cheque_Book=new Cheque_Book;
    constructor(public Employee_Details_Service_: Employee_Details_Service, public Client_Accounts_Service_:Client_Accounts_Service,public Journal_Entry_Service_:Journal_Entry_Service, public Account_Group_Service_:Account_Group_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(39);
    
    this.User_Type=Number(localStorage.getItem('User_Type'));
    this.Employee_Name=localStorage.getItem('Employee_Name');
    this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
    this.Login_User=localStorage.getItem("Login_User");
if(this.Permissions==undefined || this.Permissions==null)
{
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
}
else
{
    this.Cheque_Book_Edit=this.Permissions.Edit;
    this.Cheque_Book_Save=this.Permissions.Save;
    this.Cheque_Book_Delete=this.Permissions.Delete;
    this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Cheque_Book();
    this.Search_Cheque_Book();
    this.Entry_View=false;
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Cheque_Book();
    this.Search_Cheque_Book();
}
Close_Click()
{
    this.Entry_View = false;
    this.Clr_Cheque_Book();
    this.Search_Cheque_Book();
}
trackByFn(index, item) 
{
return index;
}
Clr_Cheque_Book()
{
    this.Cheque_Book_.Cheque_Book_Id=0;
    this.Cheque_Book_.Book_No="";
    this.Cheque_Book_.From_No=0;
    this.Cheque_Book_.Total_Leaves=0;
    this.Cheque_Book_.To_No=0;
    this.Cheque_Book_.User_Id=0;
    this.Bank_=null;
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
    this.Employee_Details_Service_.Search_Under_Employee('4,5',Value).subscribe(Rows => {
 
        if (Rows != null) {
            this.Bank_Data = Rows[0];
         
        }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
         });
    }
}
display_Search_Under_Employee_(Under_Employee_: Client_Accounts) {

    if (Under_Employee_) { return Under_Employee_.Client_Accounts_Name; }
}
To_No_Change()
{
    
    this.Cheque_Book_.To_No=(Number(this.Cheque_Book_.From_No)+Number(this.Cheque_Book_.Total_Leaves)-1)
}
Search_Cheque_Book()
{
    var Client_Accounts_Id=0;
    if (this.Bank_Search != undefined && this.Bank_Search!=null)
        if (this.Bank_Search.Client_Accounts_Id != undefined && this.Bank_Search.Client_Accounts_Id != null)
            Client_Accounts_Id = this.Bank_Search.Client_Accounts_Id;

    this.issLoading=true;

    this.Client_Accounts_Service_.Search_Cheque_Book(this.Search_Cheque_Book_, Client_Accounts_Id).subscribe(Rows => {

    this.Cheque_Book_Data=Rows[0];

    this.Total_Entries=this.Cheque_Book_Data.length;
    if(this.Cheque_Book_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"2"}});
    });
}
Delete_Cheque_Book(Cheque_Book_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading=true;
        this.Client_Accounts_Service_.Delete_Cheque_Book(Cheque_Book_Id).subscribe(Delete_status => {
    Delete_status=Delete_status[0];
    
    // Delete_status=Delete_status[0].DeleteStatus_.data[0];
    if(Delete_status[0].Cheque_Book_Id_>0){
        this.Cheque_Book_Data.splice(index, 1); 
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    this.Search_Cheque_Book();
    }
    else
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Cannot be Deleted,its already used',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error',Type:"2"}});
    });
    this.issLoading=false;
    }
    });
}

Save_Cheque_Book()
{
    if (this.Bank_ == null || this.Bank_ == undefined || this.Bank_.Client_Accounts_Id == 0 || this.Bank_==undefined)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Bank',Type: "3" }});
    }
    else if (this.Cheque_Book_.Book_No == null || this.Cheque_Book_.Book_No=="")
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the Name ',Type: "3" }});
    }
    else
    { 
       this.issLoading = true;
       
        this.Cheque_Book_.User_Id = Number(this.Login_User);
        this.Cheque_Book_.Bank_Id = this.Bank_.Client_Accounts_Id;
    this.Client_Accounts_Service_.Save_Cheque_Book(this.Cheque_Book_).subscribe(Save_status => {
    
        Save_status=Save_status[0];

    if(Number(Save_status[0].Cheque_Book_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Create_New()
    }
    else{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
}
Edit_Client_Accounts(Cheque_Book_e:Cheque_Book,index)
{

this.Entry_View=true;
this.Cheque_Book_=Object.assign({},Cheque_Book_e);


    this.Bank_Temp.Client_Accounts_Id = this.Cheque_Book_.Bank_Id;
    this.Bank_Temp.Client_Accounts_Name = this.Cheque_Book_.Bank_Name;
    this.Bank_ = Object.assign({}, this.Bank_Temp);
}
}

