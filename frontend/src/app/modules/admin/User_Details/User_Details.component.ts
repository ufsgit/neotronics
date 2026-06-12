import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User_Details_Service } from '../../../services/User_Details.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { User_Details } from '../../../models/User_Details';
import { User_Menu_Selection } from '../../../models/User_Menu_Selection';
import { User_Type } from '../../../models/User_Type';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { MatDialog } from '@angular/material/dialog';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.Service';
import { Working_Status } from '../../../models/Working_Status';
@Component({
selector: 'app-User_Details',
templateUrl: './User_Details.component.html',
styleUrls: ['./User_Details.component.css']
})
export class User_DetailsComponent implements OnInit {
User_Details_Data:User_Details[]
Search_User_Name_: string;
Employee_Temp:Client_Accounts= new Client_Accounts();
Employee_:Client_Accounts= new Client_Accounts();
Employee_Data:Client_Accounts[]
User_Menu_Selection_Data_Temp: User_Menu_Selection[] = [];
User_Menu_Selection_Data:User_Menu_Selection[]
User_Menu_Selection_:User_Menu_Selection= new User_Menu_Selection();
User_Details_:User_Details= new User_Details();
User_Type_:User_Type=new User_Type();
User_Type_Temp:User_Type=new User_Type();
User_Type_Data:User_Type[]
User_Details_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;  
myInnerHeightTwo: number;  
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
User_Details_Edit:boolean;
Select_View:boolean=false;
Select_Save:boolean=false;
Select_Edit:boolean=false;
Select_Delete:boolean=false;
Menu_Permission_Selected:boolean=false;
Menu_Permission_Page:boolean=false;
User_Details_Save:boolean;
User_Details_Delete:boolean;

//12-02-2024
Client_Accounts_Data: Client_Accounts[]; 
ToAccount_: Client_Accounts = new Client_Accounts();

Working_Status_Data:Working_Status[]
Working_Status_: Working_Status;
User_Role_Data: any[] = [];
User_Role_: any;
User_Role_Temp: any = { User_Role_Id: 0, User_Role_Name: 'Select' };

Department_Data: any[] = [];
Department_: any;

constructor(
    public User_Details_Service_:User_Details_Service, 
    private route: ActivatedRoute, 
    private router: Router,
    public dialogBox: MatDialog,
    public Receipt_Voucher_Service_: Receipt_Voucher_Service,
    ){}
ngOnInit() 
{
this.Permissions = Get_Page_Permission(13);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.User_Details_Edit=this.Permissions.Edit;
this.User_Details_Save=this.Permissions.Save;
this.User_Details_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 330;
    this.myInnerHeightTwo = this.myInnerHeight - -30;
     
//this.Clr_User_Details();
this.Load_Dropdowns();
this.Search_User_Details();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Menu_Permission_Page = false;
this.Clr_User_Details();
}
Close_Click()
{
this.Clr_User_Details();
this.Entry_View = false;
this.Menu_Permission_Page = false;
}
trackByFn(index, item) 
{
return index;
}
 Clr_User_Details()
 {
      
    this.Select_View=false;
    this.Select_Edit=false;
    this.Select_Save=false;
    this.Select_Delete=false;
    this.Menu_Permission_Selected=false;
    this.Menu_Permission_Page=false;
this.User_Details_.User_Details_Id=0;
this.User_Details_.User_Details_Name="";
this.User_Details_.Password="";
this.User_Details_.Working_Status="";
this.User_Details_.User_Type=0;
this.User_Details_.Role_Id=0;
this.User_Details_.Address1="";
this.User_Details_.Address2="";
this.User_Details_.Address3="";
this.User_Details_.Address4="";
this.User_Details_.Pincode="";
this.User_Details_.Mobile="";
this.User_Details_.Email="";
this.Employee_=null;
if(this.User_Type_Data!=null && this.User_Type_Data != undefined && this.User_Type_Data.length > 0)
this.User_Type_=this.User_Type_Data[0];

if(this.Working_Status_Data!=null && this.Working_Status_Data.length > 0)
{
    this.Working_Status_ = this.Working_Status_Data[0];
    this.User_Details_.Working_Status_Id = this.Working_Status_Data[0].Working_Status_Id;
}
else
{
    this.Working_Status_ = null;
    this.User_Details_.Working_Status_Id = 0;
}

if(this.User_Role_Data!=null && this.User_Role_Data.length > 0)
{
    this.User_Role_ = this.User_Role_Data[0];
    this.User_Details_.Role_Id = this.User_Role_Data[0].User_Role_Id;
}
else
{
    this.User_Role_ = null;
    this.User_Details_.Role_Id = 0;
}

if(this.User_Type_Data!=null && this.User_Type_Data.length > 0)
{
    this.User_Type_ = this.User_Type_Data[0];
    this.User_Details_.User_Type = this.User_Type_Data[0].User_Type_Id;
}
else
{
    this.User_Type_ = null;
    this.User_Details_.User_Type = 0;
}

if(this.Department_Data!=null && this.Department_Data.length > 0)
{
    this.Department_ = this.Department_Data[0];
    this.User_Details_.Department_Id = this.Department_Data[0].Department_Id;
}
else
{
    this.Department_ = null;
    this.User_Details_.Department_Id = 0;
}

this.ToAccount_ = new Client_Accounts();
this.ToAccount_.Client_Accounts_Id = 0;
this.ToAccount_.Client_Accounts_Name = "";

if(this.User_Menu_Selection_Data!=undefined)//&& this.User_Menu_Selection_Data!=null&&this.User_Menu_Selection_Data!=""
{
for(var i=0;i<this.User_Menu_Selection_Data.length;i++)
{
   this.User_Menu_Selection_Data[i].IsDelete=false;
   this.User_Menu_Selection_Data[i].IsEdit=false;
   this.User_Menu_Selection_Data[i].IsSave=false;
   this.User_Menu_Selection_Data[i].IsView=false;
}
}

}
Menu_Permission_Change(event)
{
    this.Menu_Permission_Selected = event.target.checked;
    this.Menu_Permission_Page = this.Menu_Permission_Selected;
}
Back_To_User_Form()
{
    this.Menu_Permission_Page = false;
}
View_Click()
{
 
 for(var i=0;i<this.User_Menu_Selection_Data.length;i++)
{
    if(this.Select_View==false)
        this.User_Menu_Selection_Data[i].IsView=true;
    else
        this.User_Menu_Selection_Data[i].IsView=false;
}
}
Save_Click()
{
 
 for(var i=0;i<this.User_Menu_Selection_Data.length;i++)
{
    if(this.Select_Save==false)
        this.User_Menu_Selection_Data[i].IsSave=true;
    else
        this.User_Menu_Selection_Data[i].IsSave=false;
}
}
Edit_Click()
{
 
 for(var i=0;i<this.User_Menu_Selection_Data.length;i++)
{
    if(this.Select_Edit==false)
        this.User_Menu_Selection_Data[i].IsEdit=true;
    else
        this.User_Menu_Selection_Data[i].IsEdit=false;
}
}
Delete_Click()
{
 
 for(var i=0;i<this.User_Menu_Selection_Data.length;i++)
{
    if(this.Select_Delete==false)
        this.User_Menu_Selection_Data[i].IsDelete=true;
    else
        this.User_Menu_Selection_Data[i].IsDelete=false;
}
}
Load_Dropdowns() 
    {
         
    this.User_Details_Service_.Get_Users_Load_Data().subscribe(Rows =>
    {
          
   this.User_Type_Data = Rows.User_Type;
   this.User_Menu_Selection_Data =  Rows.User_Menu_Selection; 
   this.Working_Status_Data =  Rows.Working_Status; 
   this.Department_Data = Rows.Department;

   console.log('Dropdown Rows:', Rows);
   
   if (Rows.User_Role) {
       this.User_Role_Data = Rows.User_Role;
       console.log('User_Role_Data loaded:', this.User_Role_Data.length, 'items');
   } else {
       console.error('User_Role data missing in response');
       this.User_Role_Data = [];
   }
   console.log('Final User_Role_Data:', this.User_Role_Data);
   
    },
  Rows => { 
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
}
   
Search_User_Details()
{
this.issLoading=true;
 
if(this.Search_User_Name_==undefined)
this.Search_User_Name_="";
this.User_Details_Service_.Search_User_Details(this.Search_User_Name_,1,1).subscribe(Rows => {
     
 this.User_Details_Data=Rows[0];
this.Total_Entries=this.User_Details_Data.length;
if(this.User_Details_Data.length==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
}
this.issLoading=false;
 },
 Rows => { 
     this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}


Delete_User_Details(User_Details_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.User_Details_Service_.Delete_User_Details(User_Details_Id).subscribe(Delete_status => {
if(Delete_status[0][0].User_Details_Id_>0){
//this.User_Details_Data.splice(index, 1);
this.Page_Load();
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
}
else
{
//this.User_Details_Data.splice(index, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
    this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });

}
 });
}


Employee_Typeahead(event: any)
{
    
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
       
         
       // if(this.Item_Data==undefined || this.Item_Data.length==0)
        {
             
            this.issLoading = true;
    this.User_Details_Service_.Employee_Typeahead('2',Value).subscribe(Rows => {
        
  
        if (Rows != null) {
            this.Employee_Data = Rows[0];
             }
             this.issLoading = false;
    },
        Rows => {
             
            this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
    }
    }
    display_Employee(Client_Accounts_e: Client_Accounts) {
 
    if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
}
Save_User_Details()
{
      
    var Menu_Status=false;
    for (var i = 0; i < this.User_Menu_Selection_Data.length; i++)
    {
        const menu = this.User_Menu_Selection_Data[i];
        if (menu.IsView == true || menu.IsSave == true || menu.IsEdit == true || menu.IsDelete == true)
            Menu_Status = true;
    }
     
   if(this.User_Details_.User_Details_Name==undefined||this.User_Details_.User_Details_Name==null||this.User_Details_.User_Details_Name=="")
   {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the User Name', Type: "3" } });
   }
   else if(this.User_Details_.Password==undefined||this.User_Details_.Password==null||this.User_Details_.Password=="")
   {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Password', Type: "3" } });
   }
    else if (this.User_Type_ == undefined || this.User_Type_ == null || this.User_Type_.User_Type_Id == undefined || this.User_Type_.User_Type_Id==0) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select User Type', Type: "3" } });
    }

    else if (this.Working_Status_ == undefined || this.Working_Status_ == null || this.Working_Status_.Working_Status_Id == undefined || this.Working_Status_.Working_Status_Id==0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Working Status', Type: "3" } });
        }

    else if (this.User_Role_ == undefined || this.User_Role_ == null || this.User_Role_.User_Role_Id == undefined || this.User_Role_.User_Role_Id==0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select User Role', Type: "3" } });
        }
    else if (this.Department_ == undefined || this.Department_ == null || this.Department_.Department_Id == undefined || this.Department_.Department_Id==0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Department', Type: "3" } });
        }
    else if (this.Menu_Permission_Selected == true && Menu_Status==false)
    {
   const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Atleast One Menu', Type: "3" } });
   }

    else{
         
        this.User_Details_.User_Type = this.User_Type_.User_Type_Id;
        this.User_Details_.Working_Status_Id = this.Working_Status_.Working_Status_Id;
        this.User_Details_.Role_Id = this.User_Role_.User_Role_Id;
        this.User_Details_.Department_Id = this.Department_.Department_Id;
        
        this.User_Details_.Working_Status = this.Working_Status_.Working_Status_Name;

        this.User_Details_.Employee_Id=0;
        this.User_Details_.Branch_Id = 0;
		this.User_Details_.Branch_Name = "";
        this.User_Menu_Selection_Data_Temp=[]; 
        if (this.Menu_Permission_Selected == true) {
        for (var i = 0; i< this.User_Menu_Selection_Data.length; i++) {

        if (Boolean(this.User_Menu_Selection_Data[i].IsView) == true||Boolean(this.User_Menu_Selection_Data[i].IsSave) == true
        ||Boolean(this.User_Menu_Selection_Data[i].IsEdit) == true||Boolean(this.User_Menu_Selection_Data[i].IsDelete) == true) {
        this.User_Menu_Selection_Data_Temp.push(this.User_Menu_Selection_Data[i]);
        }
        }
        }
        this.User_Details_.User_Menu_Selection_Data = this.User_Menu_Selection_Data_Temp;

 
// document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
this.User_Details_Service_.Save_User_Details(this.User_Details_).subscribe((Save_status: any) => {
     
if(Save_status && Save_status.success !== undefined && Save_status.data) {
    Save_status = Save_status.data;
}

if(Number(Save_status[0].User_Details_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this.Search_User_Details();
this.Clr_User_Details();
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
Get_User_Details_Edit(User_Details_Id) 

    {
         
        this.issLoading=true;
    this.User_Details_Service_.Get_User_Details_Edit(User_Details_Id).subscribe(Rows => 
    {
         
this.User_Menu_Selection_Data=Rows[0];
    for(var j=0;j<this.User_Menu_Selection_Data.length;j++)
    {
    if (this.User_Menu_Selection_Data[j].IsView.toString()=='1')
    this.User_Menu_Selection_Data[j].IsView= true;  
    else
    this.User_Menu_Selection_Data[j].IsView= false;
    if (this.User_Menu_Selection_Data[j].IsEdit.toString()=='1')
    this.User_Menu_Selection_Data[j].IsEdit= true;
    else  
    this.User_Menu_Selection_Data[j].IsEdit= false; 
    if (this.User_Menu_Selection_Data[j].IsSave.toString()=='1')  
    this.User_Menu_Selection_Data[j].IsSave= true; 
    else
    this.User_Menu_Selection_Data[j].IsSave= false;
    if (this.User_Menu_Selection_Data[j].IsDelete.toString()=='1')
    this.User_Menu_Selection_Data[j].IsDelete= true;
    else 
    this.User_Menu_Selection_Data[j].IsDelete= false;
    }
    this.issLoading=false;
    this.Menu_Permission_Selected = this.User_Menu_Selection_Data.some(menu =>
        menu.IsView == true || menu.IsSave == true || menu.IsEdit == true || menu.IsDelete == true
    );
    },
  Rows => { 
    this.issLoading=false;
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });

    }
Edit_User_Details(User_Details_e:User_Details,index)
{
      
this.Entry_View=true;
this.Menu_Permission_Page=false;
this.Menu_Permission_Selected=false;
this.User_Details_=User_Details_e;
this.User_Details_=Object.assign({},User_Details_e);
 
this.Get_User_Details_Edit(this.User_Details_.User_Details_Id);

for (var i = 0; i < this.User_Type_Data.length; i++) {
    if (this.User_Details_.User_Type == this.User_Type_Data[i].User_Type_Id)
    this.User_Type_=this.User_Type_Data[i];
}

for (var i = 0; i < this.Working_Status_Data.length; i++) {
    if (this.User_Details_.Working_Status_Id == this.Working_Status_Data[i].Working_Status_Id)
    this.Working_Status_=this.Working_Status_Data[i];
}

for (var i = 0; i < this.User_Role_Data.length; i++) {
    if (this.User_Details_.Role_Id == this.User_Role_Data[i].User_Role_Id)
    this.User_Role_=this.User_Role_Data[i];
}

if (this.Department_Data != null && this.Department_Data.length > 0) {
    for (var i = 0; i < this.Department_Data.length; i++) {
        if (this.User_Details_.Department_Id == this.Department_Data[i].Department_Id) {
            this.Department_ = this.Department_Data[i];
        }
    }
}

this.ToAccount_ = new Client_Accounts();
this.ToAccount_.Client_Accounts_Id = this.User_Details_.Branch_Id;
this.ToAccount_.Client_Accounts_Name = this.User_Details_.Branch_Name;


    this.Employee_Temp.Client_Accounts_Id=User_Details_e.Employee_Id;
    this.Employee_Temp.Client_Accounts_Name=User_Details_e.Client_Accounts_Name;
    this.Employee_=this.Employee_Temp;
}

/** Added on 12-02-2024 **/

Accounts_Typeahead(event: any) {
    this.issLoading = true;
    var Value = "";
    if (event.target.value == "") Value = undefined;
    else Value = event.target.value;

    this.Receipt_Voucher_Service_.Get_Client_Accounts_Typeahead(
        Value
    ).subscribe(
        (Rows) => {
            if (Rows != null) {
                debugger;
                this.Client_Accounts_Data = Rows[0];
                //this.Print_Client_=this.Client_Accounts_Data[0];
            }

            this.issLoading = false;
        },
        (Rows) => {
            this.issLoading = false;
        }
    );
}

display_FromAccount(Client_Accounts_e: Client_Accounts) 
{
    if (Client_Accounts_e) {
        return Client_Accounts_e.Client_Accounts_Name;
    }
}

/************************/
}

