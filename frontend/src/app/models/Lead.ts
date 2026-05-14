export class Lead {
    Lead_Id: number;
    Lead_Name: string;
    Phone: string;
    Source: number;
    Source_Name: string;
    Contact_Person: string;
    Contact_Number: string;
    Vertical: string;        // comma-separated Vertical IDs e.g. "1,3"
    Vertical_Name: string;
    Enquiry_For: string;     // comma-separated selected enquiry IDs
    Designation: number;
    Designation_Name: string;
    Email: string;
    Website: string;
    Project_Name: string;
    POC_Name: string;
    Company_Size_Id: number;
    Company_Size_Name: string;
    Next_Call_Action: boolean;
    Address: string;
    Review: string;
    Rate: string;
    State: number;
    State_Name: string;
    District: number;
    District_Name: string;
    Department_Id: number;
    Department_Name: string;
    Status_Id: number;
    Status_Name: string;
    Staff_Id: number;
    Staff_Name: string;
    Remark: string;
    Location_Id: number;
    Location_Name: string;
    Next_FollowUp_Date: any;
    Is_FollowUp: boolean;
    FollowUp_Department_Id: number;
    FollowUp_Status_Id: number;
    FollowUp_Staff_Id: number;
    FollowUp_Staff_Name: string;
    FollowUp_Remark: string;
    FollowUp_Location_Id: number;
    FollowUp_Location_Name: string;
    FollowUp_Date: string; // New Field for Date & Time
    Login_User_Id: number; // New Field for User ID
    FollowUp_Next_Date: any;
    Entry_Date: any;
    Contact_Person_Details: any[] = [];

    constructor() {
        this.Lead_Id = 0;
        this.Lead_Name = "";
        this.Phone = "";
        this.Source = 0;
        this.Contact_Person = "";
        this.Contact_Number = "";
        this.Vertical = '';
        this.Enquiry_For = '';
        this.Designation = 0;
        this.Email = "";
        this.Project_Name = "";
        this.POC_Name = "";
        this.Company_Size_Id = 0;
        this.Next_Call_Action = false;
        this.Website = "";
        this.Address = "";
        this.Review = "";
        this.Rate = "";
        this.State = 0;
        this.District = 0;
        this.Department_Id = 0;
        this.Status_Id = 0;
        this.Staff_Id = 0;
        this.Remark = "";
        this.Location_Id = 0;
        this.Is_FollowUp = false;
        this.FollowUp_Department_Id = 0;
        this.FollowUp_Status_Id = 0;
        this.FollowUp_Staff_Id = 0;
        this.FollowUp_Remark = "";
        this.FollowUp_Location_Id = 0;
        this.Entry_Date = new Date();
        this.Next_FollowUp_Date = new Date();
        this.FollowUp_Next_Date = new Date();
    }
}
