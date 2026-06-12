import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';

export class User_RoleCleanComponent {
    User_Role_Data: any[] = [];
    Search_User_Role_Name_: string = '';
    User_Role_Name: string = '';
    Entry_View: boolean = true;
    myInnerHeight: number;
    Total_Entries: number = 0;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean = false;
    User_Role_Edit: boolean = true;
    User_Role_Save: boolean = true;
    User_Role_Delete: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public dialogBox: MatDialog
    ) { }

    ngOnInit() {
        this.Page_Load();
    }

    Page_Load() {
        this.myInnerHeight = (window.innerHeight);
        this.myInnerHeight = this.myInnerHeight - 330;
        this.Load_User_Roles();
        this.Entry_View = false;
    }

    Create_New() {
        this.Entry_View = true;
        this.Clr_User_Role();
    }

    Close_Click() {
        this.Clr_User_Role();
        this.Entry_View = false;
    }

    Clr_User_Role() {
        this.User_Role_Name = '';
    }

    Load_User_Roles() {
        // Mock data - replace with actual service call
        this.User_Role_Data = [
            { User_Role_Id: 1, User_Role_Name: 'Admin' },
            { User_Role_Id: 2, User_Role_Name: 'Manager' },
            { User_Role_Id: 3, User_Role_Name: 'User' },
            { User_Role_Id: 4, User_Role_Name: 'Supervisor' }
        ];
        this.Total_Entries = this.User_Role_Data.length;
    }

    Search_User_Role() {
        this.issLoading = true;
        
        if (this.Search_User_Role_Name_ == undefined)
            this.Search_User_Role_Name_ = '';

        // Filter mock data based on search
        if (this.Search_User_Role_Name_.trim() === '') {
            this.Load_User_Roles();
        } else {
            this.User_Role_Data = this.User_Role_Data.filter(role =>
                role.User_Role_Name.toLowerCase().includes(this.Search_User_Role_Name_.toLowerCase())
            );
        }
        
        this.Total_Entries = this.User_Role_Data.length;
        
        if (this.User_Role_Data.length == 0) {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: 'Dialogbox-Class',
                data: { Message: 'No Details Found', Type: "3" }
            });
        }
        this.issLoading = false;
    }

    Save_User_Role() {
        if (this.User_Role_Name == undefined || this.User_Role_Name == null || this.User_Role_Name == '') {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: 'Dialogbox-Class',
                data: { Message: 'Enter the User Role Name', Type: "3" }
            });
        } else {
            this.issLoading = true;
            
            // Mock save - replace with actual service call
            const newRole = {
                User_Role_Id: this.User_Role_Data.length + 1,
                User_Role_Name: this.User_Role_Name
            };
            
            this.User_Role_Data.push(newRole);
            this.Total_Entries = this.User_Role_Data.length;
            
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: 'Dialogbox-Class',
                data: { Message: 'Saved', Type: "false" }
            });
            
            this.Clr_User_Role();
            this.Entry_View = false;
            this.issLoading = false;
        }
    }

    Edit_User_Role(User_Role_e: any, index: number) {
        this.Entry_View = true;
        this.User_Role_Name = User_Role_e.User_Role_Name;
    }

    Delete_User_Role(User_Role_Id: number, index: number) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Do you want to delete ?', Type: "true", Heading: 'Confirm' }
        });
        
        dialogRef.afterClosed().subscribe(result => {
            if (result == 'Yes') {
                this.issLoading = true;
                
                // Mock delete - replace with actual service call
                this.User_Role_Data.splice(index, 1);
                this.Total_Entries = this.User_Role_Data.length;
                
                const dialogRef = this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: 'Deleted', Type: "false" }
                });
                
                this.issLoading = false;
            }
        });
    }
}
