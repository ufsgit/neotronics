import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Brand_Service } from '../../../services/Brand.Service';
import { Item_Service } from '../../../services/Item.Service';
// import { Brand_Group_Service } from '../../../services/Brand_Group.Service';
// import { Under_Brand_Service } from '../../../services/Under_Brand.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Brand } from '../../../models/Brand';
import { HSN } from '../../../models/HSN';
import { Under_Brand } from '../../../models/Under_Brand';
// import { Brand_Group } from '../../../models/Brand_Group';
import { MatDialog } from '@angular/material/dialog';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Brand',
templateUrl: './Brand.component.html',
styleUrls: ['./Brand.component.css']
})
export class BrandComponent implements OnInit {
Brand_Data:Brand[] = []; // Initialize as empty array
HSN_Data:HSN[]
Brand_:Brand= new Brand();
Brand_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
HSNCODE:HSN= new HSN();
HSN_Temp:HSN= new HSN();
Under_Brand:Under_Brand=new Under_Brand();
Under_Brand_Temp:Under_Brand=new Under_Brand();
Under_Brand_Data:Under_Brand[];
 
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
Search_Brand_:string;
issLoading: boolean;
Permissions: any;
Brand_Edit:boolean;
Brand_Save:boolean;
Brand_Delete:boolean;
Check_Hide:boolean=true;
Item_Data: any[] = [];
Item_: any;
constructor(public Brand_Service_:Brand_Service, public Item_Service_:Item_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(91);
if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeBrand('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Brand_Edit=this.Permissions.Edit;
    this.Brand_Save=this.Permissions.Save;
    this.Brand_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
trackByFn(index, Brand) 
{
return index;
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 300;

    // this.Search_Brand_Group();
    this.Clr_Brand(); 
    this.Search_Brand();
    this.Search_Under_Brand();
    this.Entry_View = false;
    this.Check_Hide = true;
    this.Brand_.Checkbox = false;
}
Create_New()
{
    this.Entry_View = true;
    this.Check_Hide = true;
    this.Item_ = null;
    this.Clr_Brand();
}
Close_Click()
{
    this.Entry_View = false;
    this.Check_Hide = true;
    this.Search_Brand();
}
Clr_Brand()
{
   this.Brand_.Brand_Id=0;
   this.Brand_.Group_Id=0;
   this.Brand_.Group_Name="";
   this.Brand_.Saleunit_Id=0;
   this.Brand_.Saleunit_Name="";
   this.Brand_.Brand_Code="";
   this.Brand_.Brand_Name="";
   this.Brand_.Item_Id=0;
   this.Brand_.Item_Name="";
   this.Brand_.Sales_Tax=0;
   this.Brand_.HSNMasterId=0;
   this.Brand_.CGST=0;
   this.Brand_.SGST=0;
   this.Brand_.IGST=0;
   this.Brand_.HSNCODE="";
   this.Brand_.Country_Id=0;
   this.Brand_.Country_Name="";
   this.Brand_.Checkbox=false;
   this.Brand_.Is_Update=false;
   this.Item_ = null;
   
   if(this.Under_Brand_Data!=null && this.Under_Brand_Data != undefined)
   this.Under_Brand=this.Under_Brand_Data[0];
   if(this.HSN_Data!=null && this.HSN_Data != undefined)
   this.HSNCODE=this.HSN_Data[0];
}

Search_Item_Typeahead(event: any) {
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;

    if (this.Item_Data == undefined || this.Item_Data.length == 0 || Value != "") {
        this.issLoading = true;
        this.Item_Service_.Item_Typeahead(Value).subscribe((response: any) => {
            const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
            if (Rows != null) {
                if (Array.isArray(Rows) && Array.isArray(Rows[0])) {
                    this.Item_Data = Rows[0];
                } else if (Array.isArray(Rows)) {
                    this.Item_Data = Rows;
                }
            }
            this.issLoading = false;
        },
            Rows => {
                this.issLoading = false;
            });
    }
}

display_Item(Item_: any) {
    if (Item_) { return Item_.Item_Name || Item_.ItemName; }
}

Item_Change(Item_: any) {
    this.Brand_.Item_Id = Item_.Item_Id;
    this.Brand_.Item_Name = Item_.Item_Name || Item_.ItemName;
}

// Search_Brand_Group() 
// {
//            this.issLoading=true;
//       this.Brand_Group_Service_.Search_Brand_Group('').subscribe(Rows => {
//       this.Brand_Group_Data = Rows[0];
//       this.issLoading=false;
//         },
//         Rows => 
//         {
//             this.issLoading=false;
//        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//         });
// }
// display_Brand_Group(Brand_Group_: Brand_Group)
// {        
//     if (Brand_Group_) { return Brand_Group_.Brand_Group_Name; }
// }
Search_Under_Brand()
{
    this.Brand_Service_.Search_Under_Brand().subscribe(Rows => {
    this.Under_Brand_Data=Rows[0];
    this.Total_Entries=this.Under_Brand_Data.length;
    this.Under_Brand_Temp.under_brand_Id = 0;
    this.Under_Brand_Temp.under_brand_Name = "Select";
    this.Under_Brand_Data.unshift(this.Under_Brand_Temp);
    this.Under_Brand = this.Under_Brand_Data[0];
        if(this.Under_Brand_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
    }
    },
    Rows => {
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
}
  
 
 
Search_Brand()
{
    debugger
    if(this.Search_Brand_==undefined)   
    this.Search_Brand_="";
    this.issLoading=true;
    debugger
    this.Brand_Service_.Search_Brand(this.Search_Brand_).subscribe(Rows => {
     debugger
    // Ensure Rows is in the expected format
    if (Rows && Array.isArray(Rows) && Rows.length > 0 && Array.isArray(Rows[0])) {
        this.Brand_Data = Rows[0];
    } else if (Rows && Array.isArray(Rows)) {
        this.Brand_Data = Rows;
    } else {
        this.Brand_Data = [];
        console.log('Unexpected response format:', Rows);
    }
    
    this.Total_Entries=this.Brand_Data.length;
    if(this.Brand_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
        this.Brand_Data = []; // Ensure it's always an array
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
  
}
Delete_Brand(Brand_Id,index)
{   
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading=true;
    this.Brand_Service_.Delete_Brand(Brand_Id).subscribe(Delete_status => {
        Delete_status=Delete_status[0];
        Delete_status=Delete_status[0].DeleteStatus_.data[0];
     if(Delete_status==1){ 
    this.Brand_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    this.Search_Brand();
    }
    else
    {
   // this.Brand_Data.splice(index, 1);
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
Save_Brand()
{debugger
        if (this.Brand_.Brand_Name == undefined || this.Brand_.Brand_Name == null || this.Brand_.Brand_Name == "") {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Brand Name', Type: "3" } });
        }
        else if (this.Brand_.Item_Name == undefined || this.Brand_.Item_Name == null || this.Brand_.Item_Name == "") {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Item Name', Type: "3" } });
        }
        // else  if (this.Brand_.Brand_Code == undefined || this.Brand_.Brand_Code == null || this.Brand_.Brand_Code == "") {
        // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Brand Code', Type: "3" } });
        // }
        // else if(this.Brand_Group_==undefined||this.Brand_Group_==null||this.Brand_Group_.Brand_Group_Id==undefined||this.Brand_Group_.Brand_Group_Id==0)
        // {
        // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Brand Group', Type: "3" } });
        // }
        // else if(this.Under_Brand==undefined||this.Under_Brand==null||this.Under_Brand.under_brand_Id==undefined||this.Under_Brand.under_brand_Id==0)
        // {
        // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Under Brand', Type: "3" } });
        // }
      
else
    {
   
     
    // this.Brand_.Under_Brand_Id=this.Under_Brand.under_brand_Id;
    // this.Brand_.Under_Brand_Name=this.Under_Brand.under_brand_Name;
    // document.getElementById('Save_Button').hidden=true;
    console.log("Before Brand Save API call");
    this.issLoading = true;

    this.Brand_Service_.Save_Brand(this.Brand_)
    .pipe(
      finalize(() => {
        console.log("Brand Save Finalize executed");
        this.issLoading = false;
        const saveButton = document.getElementById("Save_Button");
        if (saveButton) saveButton.hidden = false;
      })
    )
    .subscribe({
      next: (Save_status: any) => {
        console.log("Brand Save API Response:", Save_status);

        let resultId: number = NaN;
        try {
          if (Save_status && Save_status.data && Save_status.data[0]) {
            const raw = Save_status.data[0];
            if (raw[0] && raw[0][0] && raw[0][0].Brand_Id_ !== undefined) {
              resultId = Number(raw[0][0].Brand_Id_);
            } else if (raw[0] && raw[0].Brand_Id_ !== undefined) {
              resultId = Number(raw[0].Brand_Id_);
            } else if (raw.Brand_Id_ !== undefined) {
              resultId = Number(raw.Brand_Id_);
            }
          } else if (Save_status && Save_status[0] && Save_status[0][0]) {
            resultId = Number(Save_status[0][0].Brand_Id_);
          }
        } catch (e) {
          resultId = NaN;
        }

        if (isNaN(resultId)) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Invalid server response', Type: "2" }
          });
          return;
        }

        if (resultId > 0) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Saved Successfully', Type: "false" }
          });
          this.Clr_Brand();
          this.Search_Brand(); // Refresh the list
        } else if (resultId == -1) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Brand Name Already Exists', Type: "2" }
          });
        } else {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Error Occured', Type: "2" }
          });
        }
      },
      error: (error) => {
        console.error("Brand Save API ERROR:", error);
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" }
        });
      }
    });
    }
}
// Get_Brand_Group() 
//         {
//  this.Brand_Group_Service_.Get_Brand_Group(this.Brand_.Group_Id).subscribe(Rows => {
// // this.Brand_Group_Data = Rows[0];
// // this.Brand_Group_Temp.Brand_Group_Id=this.Brand_Group_Data[0].Brand_Group_Id;
// // this.Brand_Group_Temp.Brand_Group_Name=this.Brand_Group_Data[0].Brand_Group_Name;
// //      this.Brand_Group_=this.Brand_Group_Temp;
//   },
//         Rows => 
//         {
//         //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//         });
//  }
Edit_Brand(Brand_e:Brand,index)
{
    debugger
    this.Entry_View = true;
    this.Check_Hide = false;
    debugger;
this.Brand_=Brand_e;
this.Brand_=Object.assign({},Brand_e);
this.Item_ = { Item_Id: this.Brand_.Item_Id, ItemName: this.Brand_.Item_Name };
for (var i = 0; i < this.Under_Brand_Data.length; i++) {
    if (Brand_e.under_brand_Id == this.Under_Brand_Data[i].under_brand_Id)
    this.Under_Brand = this.Under_Brand_Data[i];
}
// this.Get_Brand_Group();
//this.Brand_Group_={Brand_Group_Id:Brand_e.Group_Id,Brand_Group_Name:Brand_e.Group_Name,Brand_Group_Code:Brand_e.Brand_Group_Code,UnderGroupId:Brand_e.UnderGroupId};
}
}

