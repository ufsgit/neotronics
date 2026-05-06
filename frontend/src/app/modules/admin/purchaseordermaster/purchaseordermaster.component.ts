import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { purchaseordermaster_Service } from '../../../services/purchaseordermaster.service';
// import { DialogBoxComponent } from '../DialogBox/DialogBox.component';
import { purchaseordermaster } from '../../../models/purchaseordermaster';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';import { purchaseordermaster_Service } from 'app/services/purchaseordermaster.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
// import { DialogBoxComponent } from 'app/components/dialog-box/dialog-box.component';
@Component({
selector: 'app-purchaseordermaster',
templateUrl: './purchaseordermaster.component.html',
styleUrls: ['./purchaseordermaster.component.css']
})
export class purchaseordermasterComponent implements OnInit {
purchaseordermaster_Data:purchaseordermaster[]
purchaseordermaster_:purchaseordermaster= new purchaseordermaster();
purchaseordermaster_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
purchaseordermaster_Edit:boolean;
purchaseordermaster_Save:boolean;
purchaseordermaster_Delete:boolean;
myInnerHeight: number;
constructor(public purchaseordermaster_Service_:purchaseordermaster_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.purchaseordermaster_Edit=this.Permissions.Edit;
this.purchaseordermaster_Save=this.Permissions.Save;
this.purchaseordermaster_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_purchaseordermaster();
this.Search_purchaseordermaster();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_purchaseordermaster();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_purchaseordermaster()
 {
this.purchaseordermaster_.PurchaseOrderMaster_Id=0;
this.purchaseordermaster_.Account_Party_Id=0;
this.purchaseordermaster_.EntryDate="";
this.purchaseordermaster_.PurchaseDate="";
this.purchaseordermaster_.InvoiceNo="";
this.purchaseordermaster_.CurrencyId=0;
this.purchaseordermaster_.TypeId=0;
this.purchaseordermaster_.PaymentTerms="";
this.purchaseordermaster_.AttendEmployee="";
this.purchaseordermaster_.TotalAmount=0;
this.purchaseordermaster_.TotalDiscount=0;
this.purchaseordermaster_.TaxableAmount=0;
this.purchaseordermaster_.VatAmount=0;
this.purchaseordermaster_.NetTotal=0;
this.purchaseordermaster_.Total_Amount=0;
this.purchaseordermaster_.Brand="";
this.purchaseordermaster_.PriceBasis="";
this.purchaseordermaster_.Delivery="";
this.purchaseordermaster_.Validity="";
this.purchaseordermaster_.Description1="";
this.purchaseordermaster_.User_Id=0;
this.purchaseordermaster_.Delivery_Address1="";
this.purchaseordermaster_.Delivery_Address2="";
this.purchaseordermaster_.Delivery_Address3="";
this.purchaseordermaster_.Delivery_Address4="";
this.purchaseordermaster_.KindAttend="";
this.purchaseordermaster_.Charge1="";
this.purchaseordermaster_.charge1_Amount=0;
this.purchaseordermaster_.Charge2="";
this.purchaseordermaster_.charge2_Amount=0;
this.purchaseordermaster_.Discount_Description=0;
this.purchaseordermaster_.Additional_Discount=0;
this.purchaseordermaster_.Description2="";
this.purchaseordermaster_.Basic_Discount="";
this.purchaseordermaster_.Amount_In_Words="";
this.purchaseordermaster_.PreparedBy="";
this.purchaseordermaster_.Charge1per=0;
this.purchaseordermaster_.Payment_Term_Description=0;
this.purchaseordermaster_.VAT_Description="";
this.purchaseordermaster_.VAT_Percentage=0;
this.purchaseordermaster_.VAT_Amount=0;
this.purchaseordermaster_.Customer_Reference="";
this.purchaseordermaster_.Roundoff_Amt=0;
this.purchaseordermaster_.Purchase_Order_Image="";
this.purchaseordermaster_.UserName="";
this.purchaseordermaster_.CurrecnyName="";

}
Search_purchaseordermaster()
{
this.issLoading=true;
this.purchaseordermaster_Service_.Search_purchaseordermaster('').subscribe(Rows => {
 this.purchaseordermaster_Data=Rows[0];
this.Total_Entries=this.purchaseordermaster_Data.length;
if(this.purchaseordermaster_Data.length==0)
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
Delete_purchaseordermaster(purchaseordermaster_Id,index)
{
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.purchaseordermaster_Service_.Delete_purchaseordermaster(purchaseordermaster_Id).subscribe(Delete_status => {
if(Delete_status[0][0].purchaseordermaster_Id_>0){
this.purchaseordermaster_Data.splice(this.EditIndex, 1);
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
Save_purchaseordermaster()
{
this.issLoading=true;
this.purchaseordermaster_Service_.Save_purchaseordermaster(this.purchaseordermaster_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].purchaseordermaster_Id_)>0)
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
Edit_purchaseordermaster(purchaseordermaster_e:purchaseordermaster,index)
{
this.Entry_View=true;
this.purchaseordermaster_=purchaseordermaster_e;
this.purchaseordermaster_=Object.assign({},purchaseordermaster_e);
}
}

