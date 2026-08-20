export class NewLeadModel {
    Lead_Id: number = 0;
    Lead_Name: string | null = null;
    Lead_Type: number = 0;
    
    Vertical: number | null = null;
    Vertical_Name: string | null = null;
    
    Address: string | null = null;
    
    State: number | null = null;
    State_Name: string | null = null;
    
    District: number | null = null;
    District_Name: string | null = null;
    
    Company_Size_Id: number = 0;
    Company_Size_Name: string | null = null;
    
    Source: number | null = null;
    Source_Name: string | null = null;
    
    Website: string | null = null;
    Contact_Person: string | null = null;
    
    Designation_Id: number | null = null;
    Designation_Name: string | null = null;
    
    Contact_Number: string | null = null;
    Email: string | null = null;
    Phone: string | null = null;
    Name_Captured: boolean = false;
    Number_Captured: boolean = false;
    Email_Captured: boolean = false;
    Enquiry_For: string | null = null;
    Remark: string | null = null;
    Lead_Priority: string = 'Medium';
    Current_Pipeline_Stage: string | null = null;
    Pulse: string | null = null;
    
    Status_Id: number | null = null;
    Status_Name: string | null = null;
    
    Branch_Id: number = 0;
    Branch_Name: string | null = null;
    
    Department_Id: number | null = null;
    Department_Name: string | null = null;
    
    Staff_Id: number | null = null;
    Staff_Name: string | null = null;
    
    Workflow: string | null = null;
    Workflow_Start_Status: boolean = false;
    Next_FollowUp_Date: Date | string | null = null;
    Next_Call_Action: boolean = false;
    Review: string | null = null;
    Rate: string | null = null;
    Online_Meeting_Count: number = 0;
    Offline_Meeting_Count: number = 0;
    Quote_Sent_Count: number = 0;
    
    // Lost Lead Tracking
    Lost_Reason_Id: number = 0;
    Primary_Issue_Id: number = 0;
    Competitor: string | null = null;
    Lost_Reason: string | null = null;
    Lost_Primary_Issue: string | null = null;
    Lost_Competitor_Name: string | null = null;
    Lost_Competitor_Price: number | null = null;
    Lost_Was_Price_Issue: boolean = false;
    Lost_Was_Solution_Issue: boolean = false;
    Lost_Quote_Only_Comparison: boolean = false;
    Lost_Reopen_Possibility: string | null = null;
    Lost_Expected_Reconnect_Date: Date | string | null = null;
    Lost_Remarks: string | null = null;

    // FollowUp Specific Details
    Is_FollowUp: boolean = false;
    FollowUp_Branch_Id: number | null = null;
    FollowUp_Branch_Name: string | null = null;
    FollowUp_Department_Id: number | null = null;
    FollowUp_Dept_Name: string | null = null;
    FollowUp_Status_Id: number | null = null;
    FollowUp_Status_Name: string | null = null;
    FollowUp_Staff_Id: number | null = null;
    FollowUp_Staff_Name: string | null = null;
    FollowUp_Remark: string | null = null;
    FollowUp_Market_Study: string | null = null;
    FollowUp_Date: Date | string | null = null;
    Login_User_Id: number | null = null;
}
