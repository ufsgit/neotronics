import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.Service';
import { Journal_Entry_Service } from '../../../services/Journal_Entry.Service';
import { Account_Group_Service } from '../../../services/Account_Group.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Company } from '../../../models/Company';
import {Account_Group } from '../../../models/Account_Group';

import { MatDialog } from '@angular/material/dialog';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Master_Refresh_Service } from '../../../services/Master_Refresh.Service';
@Component({
selector: 'app-Company',
templateUrl: './Company.component.html',
styleUrls: ['./Company.component.css']
})
export class CompanyComponent implements OnInit {
Company_Data:Company[]
Employee_Details_Data:Company[]
Employee_:Company=new Company();
Company_:Company= new Company();
Company_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Company_Edit:boolean;
Company_Save:boolean;
Company_Delete:boolean;
Employee_Name:string;
Employee_Id:number;
User_Type:number;
Employee_Edit:boolean=false;
Login_User:string="0";


/*** Added on 06-09-2024 */

Doc_Photo: any;
ImageFile_Doc: any;
If_file_changed:boolean=false
Save_Call_Status: boolean = false;


    constructor(public Client_Accounts_Service_: Client_Accounts_Service,public Journal_Entry_Service_:Journal_Entry_Service, public Account_Group_Service_:Account_Group_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog, private Master_Refresh_Service_: Master_Refresh_Service) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(35);
if(this.Permissions==undefined || this.Permissions==null)
{
    this.User_Type=Number(localStorage.getItem('User_Type'));
    this.Employee_Name=localStorage.getItem('Employee_Name');
    this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
    this.Login_User=localStorage.getItem("Login_User");
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Company_Edit=this.Permissions.Edit;
this.Company_Save=this.Permissions.Save;
this.Company_Delete=this.Permissions.Delete;
this.Page_Load()
}
}

Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Company();
this.Search_Company();
//this.Get_Account_Group();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Company();
}
Close_Click()
{
    this.Search_Company();
    this.Clr_Company();
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Company()
 {
     this.Company_.Company_Id=0;
     this.Company_.Company_Name= "";
     this.Company_.Address1= "";
     this.Company_.Address2= "";
     this.Company_.Address3= "";
     this.Company_.Address4= "";
     this.Company_.Mobile_Number= "";
     this.Company_.Phone_Number= "";
     this.Company_. FAX= "";
     this.Company_.EMail= "";
     this.Company_.Website= "";
     this.Company_.Logo= "";
     this.Company_.Code= "";
     this.Company_.GSTNO= "";
     this.Company_.CINO= "";
     this.Company_.PANNO= "";
     this.Doc_Photo = "";
     this.ImageFile_Doc = null;
     this.If_file_changed = false;

}
Search_Company()
{
    
    // if (this.Search_Company_ == undefined)
    // this.Search_Company_ = "";
     this.issLoading=true;
debugger;
this.Client_Accounts_Service_.Search_Company(this.Company_Name_Search).subscribe(Rows => {
            console.log('Search_Company rows:', Rows);
            let data = Rows;
            if (Rows && Rows.data !== undefined) data = Rows.data;
            if (Array.isArray(data) && Array.isArray(data[0])) {
                this.Company_Data = data[0];
            } else if (Array.isArray(data)) {
                this.Company_Data = data;
            } else {
                this.Company_Data = [];
            }
            
 this.Total_Entries = this.Company_Data ? this.Company_Data.length : 0;
 if(this.Company_Data.length==0)
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




Delete_Company(Company_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Client_Accounts_Service_.Delete_Company(Company_Id).subscribe(Delete_status => {
    Delete_status=Delete_status[0];
 if(Delete_status[0].Company_Id_){
    this.Company_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    this.Search_Company();
    this.Master_Refresh_Service_.refreshMaster('Company');
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

Save_Company()
{
    debugger;
    console.log('Company_:',this.Company_);
    if (this.Company_.Company_Name == null || this.Company_.Company_Name == undefined ||this.Company_.Company_Name=="")
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Company Name ',Type: "3" }});
}
  
else
{ 
    this.Company_.Logo = this.Doc_Photo;
    this.upload();
}
}
Edit_Company(Company_e:any,index)
{
     
this.Entry_View=true;
this.Company_=Object.assign({},Company_e);
this.Doc_Photo = this.Company_.Logo;
}


/*** Added on 06-09-2024 */

File_Change_Vat(event: Event) {
    debugger;
    this.If_file_changed = true
    const file = (event.target as HTMLInputElement).files;
    this.ImageFile_Doc = file;
    this.Doc_Photo = this.ImageFile_Doc[0].name;
  }

upload() 
{

  debugger;
  
  if(this.If_file_changed)
  {
    const file = this.ImageFile_Doc.item(0);

    if (file) 
    {

      console.log('file.size: ', file.size);
      console.log(' 5 * 1024 * 1024: ',  5 * 1024 * 1024);
      if (file.size > 5 * 1024 * 1024) 
      { // Check if file size exceeds 5 MB
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: 'dialogbox-class',
        data: {Message: 'File size exceeds 5 MB. Please select a smaller file.',Type: "3" }});
        this.Save_Call_Status = false;	
        this.issLoading = false;
      }

      else
      {
      
        this.Client_Accounts_Service_.uploadFile(file).then(res=>{
          console.log('res: ', res);
          this.Company_.File_Path = res['Location'] || '';
          this.Save()
        }).catch(err => {
          console.error("File upload failed: ", err);
          this.issLoading = false;
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'dialogbox-class',
            data: { Message: 'File upload failed (check AWS S3 CORS/Credentials). Data not saved.', Type: "3" }
          });
        });
      }	
    
    }
    
    
    }else
    {
      this.Save()
    }
  }

  Save()
  {
    debugger;
    this.issLoading=true;
this.Client_Accounts_Service_.Save_Company(this.Company_).subscribe((res: any) => {
    console.log('Save_Company Response:', res);
    const isErrorResponse = res && (res.code || res.errno || res.sqlMessage || res.sqlState);
    let resultRow = res && res.success !== undefined ? res.data : res;
    while (Array.isArray(resultRow)) resultRow = resultRow[0];

    const savedCompanyId = Number(
        resultRow && (resultRow.Company_Id_ || resultRow.Company_Id || resultRow.insertId)
    );
    const isOkPacket = resultRow && (resultRow.affectedRows !== undefined || resultRow.changedRows !== undefined);

    if(!isErrorResponse && (savedCompanyId > 0 || isOkPacket || (res && res.success === true)))
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
        this.Close_Click();
        this.Master_Refresh_Service_.refreshMaster('Company');
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

