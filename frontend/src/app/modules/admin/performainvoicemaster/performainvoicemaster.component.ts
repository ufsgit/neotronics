import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { performainvoicemaster_Service } from '../../../services/performainvoicemaster.service';
// import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { performainvoicemaster } from '../../../models/performainvoicemaster';
import { MatDialog } from '@angular/material/dialog';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';import { performainvoicemaster_Service } from 'app/services/performainvoicemaster.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
// import { DialogBoxComponent } from 'app/components/dialog-box/dialog-box.component';
@Component({
selector: 'app-performainvoicemaster',
templateUrl: './performainvoicemaster.component.html',
styleUrls: ['./performainvoicemaster.component.css']
})
export class performainvoicemasterComponent implements OnInit {
performainvoicemaster_Data:performainvoicemaster[]
performainvoicemaster_:performainvoicemaster= new performainvoicemaster();
performainvoicemaster_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
performainvoicemaster_Edit:boolean;
performainvoicemaster_Save:boolean;
performainvoicemaster_Delete:boolean;
myInnerHeight: number;
constructor(public performainvoicemaster_Service_:performainvoicemaster_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(15);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.performainvoicemaster_Edit=this.Permissions.Edit;
this.performainvoicemaster_Save=this.Permissions.Save;
this.performainvoicemaster_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_performainvoicemaster();
this.Search_performainvoicemaster();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_performainvoicemaster();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_performainvoicemaster()
 {
this.performainvoicemaster_.PerformaInvoiceMaster_Id=0;
this.performainvoicemaster_.Account_Party_Id=0;
// this.performainvoicemaster_.EntryDate="";
this.performainvoicemaster_.PerformaInvNo="";
this.performainvoicemaster_.LPONo="";
this.performainvoicemaster_.CurrencyId=0;
this.performainvoicemaster_.TypeId=0;
// this.performainvoicemaster_.PaymentTerms="";
this.performainvoicemaster_.TotalAmount=0;
this.performainvoicemaster_.TotalDiscount=0;
this.performainvoicemaster_.TaxableAmount=0;
this.performainvoicemaster_.VatAmount=0;
this.performainvoicemaster_.Total_Amount=0;
this.performainvoicemaster_.NetTotal=0;
this.performainvoicemaster_.Roundoff_Amt=0;
this.performainvoicemaster_.Makes="";
this.performainvoicemaster_.PriceBasis="";
this.performainvoicemaster_.Description1="";
this.performainvoicemaster_.User_Id=0;
this.performainvoicemaster_.KindAttend="";
this.performainvoicemaster_.Charge1="";
this.performainvoicemaster_.charge1_Amount=0;
this.performainvoicemaster_.Charge2="";
this.performainvoicemaster_.charge2_Amount=0;
this.performainvoicemaster_.Discount_Description='0';
this.performainvoicemaster_.Additional_Discount=0;
this.performainvoicemaster_.Description2="";
this.performainvoicemaster_.Basic_Discount=0;
this.performainvoicemaster_.Amount_In_Words="";
this.performainvoicemaster_.PreparedBy="";
this.performainvoicemaster_.Charge1per='0';
// this.performainvoicemaster_.Payment_Term_Description=0;
this.performainvoicemaster_.VAT_Description="";
this.performainvoicemaster_.VAT_Percentage=0;
this.performainvoicemaster_.VAT_Amount=0;
this.performainvoicemaster_.Delivery="";
this.performainvoicemaster_.Validity="";
this.performainvoicemaster_.Profoma_Invoice_image="";
this.performainvoicemaster_.CurrecnyName="";
this.performainvoicemaster_.UserName="";

}
Search_performainvoicemaster()
{
this.issLoading=true;
this.performainvoicemaster_Service_.Search_performainvoicemaster('').subscribe(Rows => {
 this.performainvoicemaster_Data=Rows[0];
this.Total_Entries=this.performainvoicemaster_Data.length;
if(this.performainvoicemaster_Data.length==0)
{
this.issLoading=false;
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'No Details Found',Type:"3"}});
}
this.issLoading=false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'Error Occured',Type:"2"}});
 });
}
Delete_performainvoicemaster(performainvoicemaster_Id,index)
{
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.performainvoicemaster_Service_.Delete_performainvoicemaster(performainvoicemaster_Id).subscribe(Delete_status => {
if(Delete_status[0][0].performainvoicemaster_Id_>0){
this.performainvoicemaster_Data.splice(this.EditIndex, 1);
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'Deleted',Type: "false"}});
}
else
{
this.issLoading=false;
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'Error Occured',Type:"2"}});
 });
}
 });
}
Save_performainvoicemaster()
{
this.issLoading=true;
this.performainvoicemaster_Service_.Save_performainvoicemaster(this.performainvoicemaster_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].performainvoicemaster_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
}
else{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
 });
}
Edit_performainvoicemaster(performainvoicemaster_e:performainvoicemaster,index)
{
this.Entry_View=true;
this.performainvoicemaster_=performainvoicemaster_e;
this.performainvoicemaster_=Object.assign({},performainvoicemaster_e);
}
}

