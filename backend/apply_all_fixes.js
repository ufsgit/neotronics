const db = require('./dbconnection');

async function applyAllFixes() {
    console.log("Applying Database Fixes...");

    const fix1 = "ALTER TABLE company_info ADD COLUMN IF NOT EXISTS file_url VARCHAR(500) DEFAULT ''";
    
    const dropCompany = "DROP PROCEDURE IF EXISTS Save_Company";
    const createCompany = `
CREATE PROCEDURE \`Save_Company\`(
  IN Company_Id_ INT,
  IN Company_Name_ LONGTEXT,
  IN Address1_ LONGTEXT,
  IN Address2_ LONGTEXT,
  IN Address3_ LONGTEXT,
  IN Address4_ LONGTEXT,
  IN Mobile_Number_ VARCHAR(100),
  IN Phone_Number_ VARCHAR(100),
  IN FAX_ VARCHAR(30),
  IN EMail_ VARCHAR(250),
  IN Website_ VARCHAR(150),
  IN Logo_ LONGTEXT,
  IN Code_ VARCHAR(50),
  IN GSTNO_ VARCHAR(50),
  IN CINO_ VARCHAR(200),
  IN PANNO_ VARCHAR(50),
  IN Note_ LONGTEXT,
  IN Doc_Photo_ LONGTEXT,
  IN File_Path_ LONGTEXT,
  IN file_url_ VARCHAR(500)
)
BEGIN
  IF Company_Id_ > 0 THEN
    UPDATE company_info
    SET
      Company_Name  = Company_Name_,
      Address1      = Address1_,
      Address2      = Address2_,
      Address3      = Address3_,
      Phone         = Phone_Number_,
      Gsm           = GSTNO_,
      Email         = EMail_,
      CR_No         = CINO_,
      File_Upload   = Logo_,
      Note          = Note_,
      Vat_No        = PANNO_,
      File_Path     = File_Path_,
      file_url      = file_url_
    WHERE Company_Id = Company_Id_;
  ELSE
    SET Company_Id_ = (SELECT COALESCE(MAX(Company_Id), 0) + 1 FROM company_info);
    INSERT INTO company_info(
      Company_Name, Address1, Address2, Address3,
      Phone, Email, File_Upload, Gsm, CR_No, Company_Id,
      Note, Vat_No, DeleteStatus, File_Path, file_url
    )
    VALUES (
      Company_Name_, Address1_, Address2_, Address3_,
      Phone_Number_, EMail_, Logo_, GSTNO_, CINO_, Company_Id_,
      Note_, PANNO_, false, File_Path_, file_url_
    );
  END IF;

  SELECT Company_Id_;
END;
`;

    try {
        await db.promise().query(fix1).catch(e => console.log("Note: ALTER TABLE skip or handled."));
        await db.promise().query(dropCompany);
        await db.promise().query(createCompany);
        console.log("✅ Success: Save_Company procedure updated.");
    } catch (error) {
        console.error("❌ Error applying fixes:", error.message);
    }

    process.exit(0);
}

applyAllFixes();
