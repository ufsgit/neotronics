import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account_Group_Service } from '../../../services/Account_Group.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Account_Group } from '../../../models/Account_Group';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Account_Group',
templateUrl: './Account_Group.component.html',
styleUrls: ['./Account_Group.component.css']
})
export class Account_GroupComponent implements OnInit {
Account_Group_Data:Account_Group[]
Account_Group_Typeahead_Data:Account_Group[]
Account_Group_:Account_Group= new Account_Group();
Account_Group_Temp:Account_Group= new Account_Group();
Under_Group_:Account_Group= new Account_Group();
Account_Group_Name_Search:string;
Search_Account_Group_:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
Id:number;
Name:string;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Account_Group_Edit:boolean;
Account_Group_Save:boolean;
Account_Group_Delete:boolean;
constructor(public Account_Group_Service_:Account_Group_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
    {
        
    this.Permissions = Get_Page_Permission(7);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Account_Group_Edit=this.Permissions.Edit;
    this.Account_Group_Save=this.Permissions.Save;
    this.Account_Group_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Account_Group();
    this.Search_Account_Group();
    // this.Load_Account_Group();
    this.Entry_View=false;
}
trackByFn(index, item) 
{
return index;
}
Create_New()                           
{
    this.Entry_View = true;
    this.Clr_Account_Group();
}
Close_Click()
{
    this.Entry_View = false;
}
Clr_Account_Group()
 {
    this.Account_Group_.Account_Group_Id=0;
    this.Account_Group_.Primary_Id=0;
    this.Account_Group_.Group_Code="";
    this.Account_Group_.Group_Name="";
    this.Account_Group_.Link_Left=0;
    this.Account_Group_.Link_Right=0;
    this.Account_Group_.Under_Group=0;
    this.Account_Group_.IsPrimary="";
    this.Account_Group_.CanDelete="";
    this.Account_Group_.UserId=0;
    this.Under_Group_=null;
}
Load_Account_Group(event: any) 
{     
            this.issLoading=true;
    var Value = "";
    if (event.target.value == "")
    Value = undefined;
    else
    Value = event.target.value;
        this.Account_Group_Service_.Load_Account_Group(Value).subscribe(Rows => {
             
            if (Rows != null) {
            this.Account_Group_Typeahead_Data=Rows[0];
            }
            this.issLoading=false;
             },
        Rows => 
        {
            this.issLoading=false;
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
}     
display_Under_Group(Account_Group_: Account_Group)
{      
        if (Account_Group_) { return Account_Group_.Group_Name;  }
}
Search_Account_Group()
{       
        this.issLoading=true;
        if(this.Search_Account_Group_==undefined)
        this.Search_Account_Group_="";
        this.Account_Group_Service_.Search_Account_Group(this.Search_Account_Group_).subscribe(Rows => {
             
        this.Account_Group_Data=Rows[0];
        this.Total_Entries=this.Account_Group_Data.length;
        if(this.Account_Group_Data.length==0)
        {
             
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
        }
         this.issLoading=false;
        },
        Rows => 
        {
            this.issLoading=false;
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
}
Delete_Account_Group(Account_Group_Id,index)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
        this.issLoading=true;
        this.Account_Group_Service_.Delete_Account_Group(Account_Group_Id).subscribe(Delete_status => {
            Delete_status=Delete_status[0];
            Delete_status=Delete_status[0].DeleteStatus_.data[0];
         if(Delete_status==1){
            this.Account_Group_Data.splice(index, 1);         
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
        this.Search_Account_Group();
    }
    else
    {
   //     this.Account_Group_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Deleted',Type:"2"}});
    }
      this.issLoading=false;
    },
        Rows => {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open    ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
    }
    });
}
Save_Account_Group()
{
    if (this.Account_Group_.Group_Name == null || this.Account_Group_.Group_Name == "" || this.Account_Group_.Group_Name == undefined) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Account Group ', Type: "3" } });
    }
    else if ( this.Under_Group_ == undefined || this.Under_Group_ == null  || this.Under_Group_.Account_Group_Id == 0 || this.Under_Group_.Account_Group_Id==undefined)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Under Group',Type:"3"}});
    }
else{
    this.Account_Group_.Under_Group=this.Under_Group_.Account_Group_Id;
   // document.getElementById('Save_Button').hidden=true;
    this.issLoading=true;
   // this.Account_Group_=null;
    this.Account_Group_Service_.Save_Account_Group(this.Account_Group_).subscribe(Save_status => {  
        Save_status=Save_status[0];
    if(Number(Save_status[0].Account_Group_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Search_Account_Group();
    this.Clr_Account_Group();
    }
    else if (Number(Save_status[0].Account_Group_Id_)==-1)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Account Group Already Exists',Type:"2"}});
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
    this.Clr_Account_Group();
    //this.Search_Account_Group();
 
}
}
Edit_Account_Group(Account_Group_e:Account_Group,index)
{
this.Entry_View=true;
this.Account_Group_=Account_Group_e;
this.Account_Group_=Object.assign({},Account_Group_e);
 
this.Account_Group_Temp.Account_Group_Id=Account_Group_e.Under_Group;
this.Account_Group_Temp.Group_Name=Account_Group_e.UnderGroup
this.Under_Group_=this.Account_Group_Temp;
}
}

