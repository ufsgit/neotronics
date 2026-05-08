import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Item_Service } from '../../../services/Item.Service';
import { Item_Group_Service } from '../../../services/Item_Group.Service';
import { Sale_Unit_Service } from '../../../services/Sale_Unit.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';

import { Item } from '../../../models/Item';
import { HSN } from '../../../models/HSN';
import { Sale_Unit } from '../../../models/Sale_Unit';
import { Item_Group } from '../../../models/Item_Group';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
selector: 'app-Item',
templateUrl: './Item.component.html',
styleUrls: ['./Item.component.css']
})
export class ItemComponent implements OnInit {
Item_Data:Item[]
HSN_Data:HSN[]
Item_:Item= new Item();
Item_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;

HSNCODE:HSN= new HSN();
HSN_Temp:HSN= new HSN();
Sale_Unit:Sale_Unit=new Sale_Unit();
Sale_Unit_Temp:Sale_Unit=new Sale_Unit();
Sale_Unit_Data:Sale_Unit[];
Item_Group_Data:Item_Group[];
Item_Group_:Item_Group=new Item_Group();
Item_Group_Temp:Item_Group=new Item_Group();
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;Item_Group_Data1=[];
Search_Item_:string;
Search_Part_;Search_ItemGroup_;
issLoading: boolean;
Permissions: any;
Item_Edit:boolean;
Item_Save:boolean;
Item_Delete:boolean;
Check_Hide:boolean=true;
Tax_Errors: any = {};
constructor(public Item_Service_:Item_Service,public Item_Group_Service_:Item_Group_Service,public Sale_Unit_Service_:Sale_Unit_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(5);
if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Item_Edit=this.Permissions.Edit;
    this.Item_Save=this.Permissions.Save;
    this.Item_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
trackByFn(index, item) 
{
return index;
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 300;
    this.Search_Item_Group();    
    this.Get_HSN_Dropdown();
    //this.Search_Item();
    this.Search_Sale_Unit();
    this.Clr_Item();
    this.Entry_View = false;
    this.Check_Hide = true;
    this.Item_.Checkbox = false;
}
Create_New()
{
    this.Entry_View = true;
    this.Check_Hide = true;
    this.Clr_Item();
}
Close_Click()
{
    this.Entry_View = false;
    this.Check_Hide = true;
    //this.Search_Item();
    this.Search_Item_Group()
}
Clr_Item()
{
   this.Item_.Item_Id=0;
   this.Item_.Group_Id=0;
   this.Item_.Group_Name="";
   this.Item_.Saleunit_Id=0;
   this.Item_.Saleunit_Name="";
   this.Item_.Item_Code="";
   this.Item_.Item_Name="";
   this.Item_.Sales_Tax=0;
   this.Item_.gst=0;
   this.Item_.cgst=0;
   this.Item_.sgst=0;
   this.Item_.igst=0;
   this.Item_.b2b_rate=0;
   this.Item_.b2c_rate=0;
   this.Item_.HSNMasterId=0;
   this.Item_.HSNCODE="";
   this.Item_.Checkbox=false;
   this.Item_.Is_Update=false;
   this.Item_Group_.Item_Group_Id=0;
   this.Item_Group_.Item_Group_Name='';
   this.Item_.Sales_Tax=0;
    this.Item_Group_ = null;
//    if(this.Item_Group_Data!=null && this.Item_Group_Data != undefined)
//    this.Item_Group_=this.Item_Group_Data[0];
   if(this.Sale_Unit_Data!=null && this.Sale_Unit_Data != undefined)
   this.Sale_Unit=this.Sale_Unit_Data[0];
   if(this.HSN_Data!=null && this.HSN_Data != undefined)
   this.HSNCODE=this.HSN_Data[0];
   this.Tax_Errors = {};
}
Search_Item_Group(event?) 
{
    var Value = "";
    if (event && event.target && event.target.value != "")
       {
        Value = event.target.value;
        // Value = ""
       } 
    
    else
        Value = undefined;
      this.issLoading=true;
      this.Item_Group_Service_.Search_Item_Group(Value).subscribe(Rows => {
      this.Item_Group_Data = Rows[0];
      this.Item_Group_Data1 = Rows[0];
      this.Item_Group_Data1.unshift({
        "Item_Group_Id":0,
        "Item_Group_Name":"All"
      })
      this.issLoading=false;
        },
        Rows => 
        {
            this.issLoading=false;
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
}
display_Item_Group(Item_Group_: Item_Group)
{        
    if (Item_Group_) { return Item_Group_.Item_Group_Name; }
}

Search_Sale_Unit()
{
    this.Sale_Unit_Service_.Search_Sale_Unit('').subscribe(Rows => {
    this.Sale_Unit_Data=Rows[0];
    this.Sale_Unit_Temp.Sale_Unit_Id = 0;
    this.Sale_Unit_Temp.Sale_Unit_Name = "Select";
    this.Sale_Unit_Data.unshift(this.Sale_Unit_Temp);
    this.Sale_Unit = this.Sale_Unit_Data[0];
        if(this.Sale_Unit_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
    }
    },
    Rows => {
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
}
 HSN_Change() 
        {            
            // if(this.HSNCODE.HSN_Id==0)
            // return
    //         this.Item_Service_.Get_HSN(this.HSNCODE.HSN_Id).subscribe(Rows => {
    //          
    //    this.HSNCODE = Rows[0];
            this.Item_.SGST=  this.HSNCODE.SGST;
            this.Item_.CGST=this.HSNCODE.CGST;
            this.Item_.IGST=this.HSNCODE.IGST;
            this.Item_.Sales_Tax=this.HSNCODE.SaleTax;
            // Keep new fields in sync
            this.Item_.gst = this.Item_.Sales_Tax;
            this.Item_.cgst = this.Item_.CGST;
            this.Item_.sgst = this.Item_.SGST;
            this.Item_.igst = this.Item_.IGST;
       //  this.GST_Change();
        // },
        // Rows => 
        // {
        // });
        }
GST_Change()
        {
                this.Item_.Sales_Tax=Number(this.Item_.SGST)+Number(this.Item_.CGST)+Number(this.Item_.IGST);
                this.Item_.gst = this.Item_.Sales_Tax;
        }
Get_HSN_Dropdown() 
{         
        this.Item_Service_.Get_HSN_Dropdown().subscribe(Rows => {       
        this.HSN_Data = Rows[0];
        this.HSN_Temp.HSN_Id = 0;
        this.HSN_Temp.HSN_CODE = "Select";
        this.HSN_Data.unshift(this.HSN_Temp);
        this.HSNCODE = this.HSN_Data[0];
        },
        Rows => 
        {
        //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
}
Search_Item(){
    debugger;
    var ItemGroup_ = 0
    var serchuitm_="",srchcode_="";
         if (this.Search_Item_ == undefined || this.Search_Item_ == null || this.Search_Item_ == "" )
            serchuitm_="undefined";
        else
            serchuitm_=this.Search_Item_;

        if(this.Search_Part_==undefined || this.Search_Part_=="" || this.Search_Part_==null)
            srchcode_="undefined";
        else
            srchcode_=this.Search_Part_;
        if(serchuitm_=="undefined" && srchcode_=="undefined")
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Name or Part No', Type: "3" } });
            return
        }

    //this.Search_Item_=undefined;
    // if(this.Search_Part_=="" || this.Search_Part_==null)   
    //     this.Search_Part_=undefined;
    if(this.Search_ItemGroup_ == undefined || this.Search_ItemGroup_.Item_Group_Id == undefined)
        ItemGroup_ = 0
    else
        ItemGroup_=this.Search_ItemGroup_.Item_Group_Id

    this.issLoading=true;
    debugger
    this.Item_Service_.Search_Item(serchuitm_,ItemGroup_,srchcode_).subscribe(Rows => {
     debugger
    this.Item_Data=Rows[0];
    this.Total_Entries=this.Item_Data.length;
    if(this.Item_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
  
}
Delete_Item(Item_Id,index)
{   
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading=true;
    this.Item_Service_.Delete_Item(Item_Id).subscribe(Delete_status => {
        console.log('Delete_status: ',Delete_status);
        Delete_status=Delete_status[0][0].DeleteStatus_.data[0];;
     if(Delete_status==1){ 
    this.Item_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    //this.Search_Item();
    }
    else
    {
   // this.Item_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Deleted',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});});
    }
    });
}
Save_Item()
{
    debugger;
        this.Tax_Errors = {};
        if (this.Item_.Item_Name == undefined || this.Item_.Item_Name == null || this.Item_.Item_Name == "") {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Name', Type: "3" } });
        }
        else  if (this.Item_.Item_Code == undefined || this.Item_.Item_Code == null || this.Item_.Item_Code == "") {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Item Code', Type: "3" } });
        }
        else if(this.Item_Group_==undefined||this.Item_Group_==null||this.Item_Group_.Item_Group_Id==undefined||this.Item_Group_.Item_Group_Id==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Item Group', Type: "3" } });
        }
        else if(this.Sale_Unit==undefined||this.Sale_Unit==null||this.Sale_Unit.Sale_Unit_Id==undefined||this.Sale_Unit.Sale_Unit_Id==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Sale Unit', Type: "3" } });
        }
        // else if(this.HSNCODE==undefined||this.HSNCODE==null||this.HSNCODE.HSN_Id==undefined||this.HSNCODE.HSN_Id==0)
        // {
        // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select HSN code', Type: "3" } });
        // }
        // else if(this.Country==undefined||this.Country==null||this.Country.Country_Id==undefined||this.Country.Country_Id==0)
        // {
        // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Country of Origin', Type: "3" } });
        // }
      
else
    {
        // Tax details validation (all optional but must be 0..100 if provided)
        const validatePercent = (raw: any, key: string, label: string) => {
            if (raw === undefined || raw === null || raw === '') return 0;
            const val = Number(raw);
            if (isNaN(val)) { this.Tax_Errors[key] = `${label} must be numeric`; return null; }
            if (val < 0 || val > 100) { this.Tax_Errors[key] = `${label} must be between 0 and 100`; return null; }
            return val;
        };

        const gst = validatePercent((this.Item_.gst !== undefined && this.Item_.gst !== null) ? this.Item_.gst : this.Item_.Sales_Tax, 'gst', 'GST (%)');
        const cgst = validatePercent((this.Item_.cgst !== undefined && this.Item_.cgst !== null) ? this.Item_.cgst : this.Item_.CGST, 'cgst', 'CGST (%)');
        const sgst = validatePercent((this.Item_.sgst !== undefined && this.Item_.sgst !== null) ? this.Item_.sgst : this.Item_.SGST, 'sgst', 'SGST (%)');
        const igst = validatePercent((this.Item_.igst !== undefined && this.Item_.igst !== null) ? this.Item_.igst : this.Item_.IGST, 'igst', 'IGST (%)');
        const b2b = validatePercent(this.Item_.b2b_rate, 'b2b_rate', 'B2B Rate (%)');
        const b2c = validatePercent(this.Item_.b2c_rate, 'b2c_rate', 'B2C Rate (%)');

        if (gst === null || cgst === null || sgst === null || igst === null || b2b === null || b2c === null) {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please fix Tax Details', Type: "3" } });
            return;
        }

        // Optional: enforce CGST + SGST = GST when IGST is 0
        if (Number(igst) === 0 && (Number(cgst) + Number(sgst)) > 0) {
            const diff = Math.abs((Number(cgst) + Number(sgst)) - Number(gst));
            if (diff > 0.001) {
                this.Tax_Errors['gst_split'] = 'CGST + SGST should equal GST';
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'CGST + SGST should equal GST', Type: "3" } });
                return;
            }
        }

        debugger;
    this.Item_.HSNMasterId= 0
    this.Item_.Group_Name=this.Item_Group_.Item_Group_Name;
    this.Item_.Group_Id=this.Item_Group_.Item_Group_Id;
    this.Item_.Saleunit_Id=this.Sale_Unit.Sale_Unit_Id;
    this.Item_.Saleunit_Name=this.Sale_Unit.Sale_Unit_Name;
    // Country of Origin removed from UI; keep DB fields defaulted
    (this.Item_ as any).Country_Id = 0;
    (this.Item_ as any).Country_Name = "";
    this.Item_.HSNMasterId=this.HSNCODE.HSN_Id;
    if(this.HSNCODE==undefined||this.HSNCODE==null||this.HSNCODE.HSN_Id==undefined||this.HSNCODE.HSN_Id==0)
    {
        this.Item_.HSNCODE='';
    this.Item_.HSNMasterId=0;
    }
    else
    this.Item_.HSNCODE=this.HSNCODE.HSN_CODE;

    // Map tax details to payload
    this.Item_.gst = Number(gst);
    this.Item_.cgst = Number(cgst);
    this.Item_.sgst = Number(sgst);
    this.Item_.igst = Number(igst);
    this.Item_.b2b_rate = Number(b2b);
    this.Item_.b2c_rate = Number(b2c);
    // Keep legacy fields in sync
    this.Item_.Sales_Tax = Number(gst);
    this.Item_.CGST = Number(cgst);
    this.Item_.SGST = Number(sgst);
    this.Item_.IGST = Number(igst);
    this.Item_.Is_Update=false;
        this.Item_.Checkbox=false;
    
    console.log("Before Item Save API call");
    this.issLoading = true;

    this.issLoading = true;

    this.Item_Service_.Save_Item(this.Item_)
    .pipe(
      finalize(() => {
        this.issLoading = false;
        const saveButton = document.getElementById("Save_Button");
        if (saveButton) saveButton.hidden = false;
      })
    )
    .subscribe({
      next: (res: any) => {
        console.log("Item Save API Response:", res);
        
        if (res && res.success) {
          const data = res.data;
          const rows = Array.isArray(data) ? data : (data && data.rows ? data.rows : []);
          const result = rows && rows[0] ? rows[0] : (Array.isArray(data) ? data[0] : null);

          const resultId = result ? Number(result.Item_Id_) : 0;
          if (resultId > 0) {
            this.dialogBox.open(DialogBox_Component, {
              panelClass: 'Dialogbox-Class',
              data: { Message: 'Saved Successfully', Type: "false" }
            });
            this.Clr_Item();
          } else if (resultId == -1) {
            this.dialogBox.open(DialogBox_Component, {
              panelClass: 'Dialogbox-Class',
              data: { Message: 'Item Name Already Exists', Type: "2" }
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
        console.error("Item Save API ERROR:", error);
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" }
        });
      }
    });
    }
}
Get_Item_Group() 
        {
 this.Item_Group_Service_.Get_Item_Group(this.Item_.Group_Id).subscribe(Rows => {
this.Item_Group_Data = Rows[0];
this.Item_Group_Temp.Item_Group_Id=this.Item_Group_Data[0].Item_Group_Id;
this.Item_Group_Temp.Item_Group_Name=this.Item_Group_Data[0].Item_Group_Name;
     this.Item_Group_=this.Item_Group_Temp;
  },
        Rows => 
        {
        //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
 }
Edit_Item(Item_e:Item,index)
{

    debugger
    this.Entry_View = true;
    this.Check_Hide = false;
    debugger;
this.Item_=Item_e;
this.Item_=Object.assign({},Item_e);
// Normalize tax fields for edit
this.Item_.gst = Number(((Item_e as any).gst !== undefined && (Item_e as any).gst !== null) ? (Item_e as any).gst : (((Item_e as any).GST !== undefined && (Item_e as any).GST !== null) ? (Item_e as any).GST : (Item_e.Sales_Tax || 0)));
this.Item_.cgst = Number(((Item_e as any).cgst !== undefined && (Item_e as any).cgst !== null) ? (Item_e as any).cgst : (Item_e.CGST || 0));
this.Item_.sgst = Number(((Item_e as any).sgst !== undefined && (Item_e as any).sgst !== null) ? (Item_e as any).sgst : (Item_e.SGST || 0));
this.Item_.igst = Number(((Item_e as any).igst !== undefined && (Item_e as any).igst !== null) ? (Item_e as any).igst : (Item_e.IGST || 0));
this.Item_.b2b_rate = Number(((Item_e as any).b2b_rate !== undefined && (Item_e as any).b2b_rate !== null) ? (Item_e as any).b2b_rate : 0);
this.Item_.b2c_rate = Number(((Item_e as any).b2c_rate !== undefined && (Item_e as any).b2c_rate !== null) ? (Item_e as any).b2c_rate : 0);
for (var i = 0; i < this.Sale_Unit_Data.length; i++) {
    if (Item_e.Saleunit_Id == this.Sale_Unit_Data[i].Sale_Unit_Id)
    this.Sale_Unit = this.Sale_Unit_Data[i];
}

for (var i1 = 0; i1 < this.HSN_Data.length; i1++) {
    if (Item_e.HSNMasterId == this.HSN_Data[i1].HSN_Id)
    this.HSNCODE = this.HSN_Data[i1];
}

this.Get_Item_Group();
//this.Item_Group_={Item_Group_Id:Item_e.Group_Id,Item_Group_Name:Item_e.Group_Name,Item_Group_Code:Item_e.Item_Group_Code,UnderGroupId:Item_e.UnderGroupId};
}
}
