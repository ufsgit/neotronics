import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { currencydetails } from '../../../models/currencydetails';
import { currencydetails_Service } from '../../../services/currencydetails.Service';
@Component({
selector: 'app-Currency',
templateUrl: './Currency.component.html',
styleUrls: ['./Currency.component.css']
})
export class CurrencyComponent implements OnInit {
Currency_Data:currencydetails[]
Currency_Datas_:currencydetails[]
Under_Role_Temp:currencydetails= new currencydetails();
Currency_:currencydetails= new currencydetails();
Currency:currencydetails= new currencydetails();
Currency_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
search_Currency_:string;
Currency_Edit:boolean;
Currency_Save:boolean;
Currency_Delete:boolean;
constructor(public Currency_Service_:currencydetails_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(93);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Currency_Edit=this.Permissions.Edit;
this.Currency_Save=this.Permissions.Save;
this.Currency_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 320;
this.Clr_Currency();
this.Search_Currency();
// this.Load_Currency();
this.Entry_View=false;
}


Create_New()
{
this.Entry_View = true;
this.Clr_Currency();
}
Close_Click()
{
this.Entry_View = false;
this.Clr_Currency();
}
trackByFn(index, item) 
{
return index;
}

 Clr_Currency()
 {
this.Currency_.CurrencyDetails_Id=0;
this.Currency_.CurrecnyName="";
this.Currency_.SubCurrecnyName="";
if( this.Currency_Datas_!=undefined &&  this.Currency_Datas_!=null)
this.Currency= this.Currency_Datas_[0];

}


// Load_Currency() 
//         {
//              
//         this.Currency_Service_.Load_Currency().subscribe(Rows => {
//        this.Currency_Datas_ = Rows[0];
     
//         },
//         Rows => 
//         {
//        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//         });
//         }

Search_Currency()
{
this.issLoading=true;
this.Currency_Service_.Search_currencydetails(this.search_Currency_).subscribe(Rows => {
this.Currency_Data=Rows[0];
this.Total_Entries=this.Currency_Data.length;
if(this.Currency_Data.length==0)
{ 
const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
}
this.issLoading=false;
},
Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured !!',Type: "3" }});
})
this.Currency_Service_.Search_currencydetails('').subscribe(Rows => {
{
this.Currency_Datas_ = Rows[0];


}
this.issLoading=false;
},
Rows => { 

this.issLoading=false;

})
}
  

// Search_Currency()
// {
//      
// this.issLoading=true;
// if(this.search_Currency_==undefined)
// this.search_Currency_="";
//  
// this.Currency_Service_.Search_Currency(this.search_Currency_).subscribe(Rows => {
//   
//  this.Currency_Data=Rows[0];
// //this.Currency_Datas_=Rows[0];
// this.issLoading=false;
// this.Total_Entries=this.Currency_Data.length;
// if(this.Currency_Data.length==0)
// {
// const dialogRef = this.dialogBox.open
// ( DialogBox_Component, {panelClass:'Dialogbox-Class'
// ,data:{Message:'No Details Found',Type: "3" }});
// }
//  },
//  Rows => { 
// this.issLoading=false;
//const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); 
//  });
//}
Delete_Currency(Currency_Id,index)
{
 
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{

if(result=='Yes')
{
 
this.issLoading=true;
this.Currency_Service_.Delete_currencydetails(Currency_Id).subscribe(Delete_status => {
   
//     Delete_status=Delete_status[0];
//    Delete_status=Delete_status[0].DeleteStatus_.data[0];
// if(Delete_status==1){

// this.Currency_Data.splice(index, 1);
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
// this.Search_Currency();
// }
// else
// {

// //this.Currency_Data.splice(index, 1);

// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Deleted',Type:"2"}});
// //this.Search_Currency();
// }

debugger
if(Delete_status[0][0].DeleteStatus_>0){
    this.Currency_Data.splice(this.EditIndex, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
    this.Search_Currency();
    }else if(Number(Delete_status[0][0].DeleteStatus_)== -2)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Unable to delete: You are attempting to delete a Currency is currently in use',Type:"3"}});
    }else{
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
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
Save_Currency()
{
     
   
    if (this.Currency_.CurrecnyName == undefined ||this.Currency_.CurrecnyName == null || this.Currency_.CurrecnyName == "") {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Currency ', Type: "3" } });
    } 
     
else
{
//document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
// this.Currency_.UnderGroupId=this.Currency.Currency_Id;
this.Currency_Service_.Save_currencydetails(this.Currency_).subscribe(Save_status => {
     
Save_status=Save_status[0];
if(Number(Save_status[0].CurrencyDetails_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Search_Currency();
    this.Clr_Currency();

}
else if (Number(Save_status[0].CurrencyDetails_Id_)==-1)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Item Group Already Exists',Type:"2"}});
    }

else{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
}
Edit_Currency(Currency_e:currencydetails,index)
{   
   
this.Entry_View=true;
this.Currency_=Currency_e;
this.Currency_=Object.assign({},Currency_e);
 

}
}
