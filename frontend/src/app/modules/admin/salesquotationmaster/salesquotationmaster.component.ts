import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { salesquotationmaster_Service } from '../../../services/salesquotationmaster.service';
// import { DialogBoxComponent } from '../DialogBox/DialogBox.component';
import { salesquotationmaster } from '../../../models/salesquotationmaster';
import { MatDialog } from '@angular/material/dialog';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';import { salesquotationmaster_Service } from 'app/services/salesquotationmaster.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
// import { DialogBoxComponent } from 'app/components/dialog-box/dialog-box.component';
@Component({
selector: 'app-salesquotationmaster',
templateUrl: './salesquotationmaster.component.html',
styleUrls: ['./salesquotationmaster.component.css']
})
export class salesquotationmasterComponent implements OnInit {
salesquotationmaster_Data:salesquotationmaster[]
salesquotationmaster_:salesquotationmaster= new salesquotationmaster();
salesquotationmaster_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
salesquotationmaster_Edit:boolean;
salesquotationmaster_Save:boolean;
salesquotationmaster_Delete:boolean;
myInnerHeight: number;
constructor(public salesquotationmaster_Service_:salesquotationmaster_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.salesquotationmaster_Edit=this.Permissions.Edit;
this.salesquotationmaster_Save=this.Permissions.Save;
this.salesquotationmaster_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_salesquotationmaster();
this.Search_salesquotationmaster();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_salesquotationmaster();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_salesquotationmaster()
 {
this.salesquotationmaster_.SalesQuotationMaster_Id=0;
this.salesquotationmaster_.Account_Party_Id=0;
this.salesquotationmaster_.EntryDate="";
this.salesquotationmaster_.SONo="";
this.salesquotationmaster_.QuotationNo="";
this.salesquotationmaster_.POnumber="";
this.salesquotationmaster_.CurrencyId=0;
this.salesquotationmaster_.TypeId=0;
this.salesquotationmaster_.PaymentTerms="";
this.salesquotationmaster_.AttendEmployee="";
this.salesquotationmaster_.TotalAmount=0;
this.salesquotationmaster_.TotalDiscount=0;
this.salesquotationmaster_.TaxableAmount=0;
this.salesquotationmaster_.VatAmount=0;
this.salesquotationmaster_.Roundoff_Amt=0;
this.salesquotationmaster_.Total_Amount=0;
this.salesquotationmaster_.NetTotal=0;
this.salesquotationmaster_.Brand="";
this.salesquotationmaster_.PriceBasis="";
this.salesquotationmaster_.Delivery="";
this.salesquotationmaster_.Validity="";
this.salesquotationmaster_.Description1="";
this.salesquotationmaster_.User_Id=0;
this.salesquotationmaster_.Delivery_Address1="";
this.salesquotationmaster_.Delivery_Address2="";
this.salesquotationmaster_.Delivery_Address3="";
this.salesquotationmaster_.Delivery_Address4="";
this.salesquotationmaster_.KindAttend="";
this.salesquotationmaster_.Charge1="";
this.salesquotationmaster_.charge1_Amount=0;
this.salesquotationmaster_.Charge2="";
this.salesquotationmaster_.charge2_Amount=0;
this.salesquotationmaster_.Discount_Description=0;
this.salesquotationmaster_.Additional_Discount=0;
this.salesquotationmaster_.Description2="";
this.salesquotationmaster_.Basic_Discount="";
this.salesquotationmaster_.Amount_In_Words="";
this.salesquotationmaster_.PreparedBy="";
this.salesquotationmaster_.Charge1per=0;
this.salesquotationmaster_.Payment_Term_Description=0;
this.salesquotationmaster_.VAT_Description="";
this.salesquotationmaster_.VAT_Percentage=0;
this.salesquotationmaster_.VAT_Amount=0;
this.salesquotationmaster_.SalesQuotation_Image="";
this.salesquotationmaster_.Acknolodgement_Image="";
this.salesquotationmaster_.CurrecnyName="";
this.salesquotationmaster_.UserName="";

}
Search_salesquotationmaster()
{
this.issLoading=true;
this.salesquotationmaster_Service_.Search_salesquotationmaster('').subscribe(Rows => {
 this.salesquotationmaster_Data=Rows[0];
this.Total_Entries=this.salesquotationmaster_Data.length;
if(this.salesquotationmaster_Data.length==0)
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
Delete_salesquotationmaster(salesquotationmaster_Id,index)
{
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.salesquotationmaster_Service_.Delete_salesquotationmaster(salesquotationmaster_Id).subscribe(Delete_status => {
if(Delete_status[0][0].salesquotationmaster_Id_>0){
this.salesquotationmaster_Data.splice(this.EditIndex, 1);
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
Save_salesquotationmaster()
{
this.issLoading=true;
this.salesquotationmaster_Service_.Save_salesquotationmaster(this.salesquotationmaster_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].salesquotationmaster_Id_)>0)
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
Edit_salesquotationmaster(salesquotationmaster_e:salesquotationmaster,index)
{
this.Entry_View=true;
this.salesquotationmaster_=salesquotationmaster_e;
this.salesquotationmaster_=Object.assign({},salesquotationmaster_e);
}
}

