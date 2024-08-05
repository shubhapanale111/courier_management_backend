const { connectDatabase } = require("../../config/dbconfig");

const companyInfo = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = "SELECT * FROM dbo.jbl_CompanyInfo";
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, users: result.recordset });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ statusCode: 500, message: "Error getting company info", error });
  }
};

const updateCompanyInfo = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const {
      CompName,
      Address1,
      Address2,
      City,
      Pincode,
      contact,
      email,
      website,
      panno,
      stax,
      t1,
      t2,
      t3,
      t4,
      t5,
      bankname,
      acno,
      ifsccode,
      bankbranch,
      bankcity,
    } = req.body;

    const updateQuery = `Update dbo.jbl_CompanyInfo Set 
     CompName = @CompName,
        Address1 = @Address1,
        Address2 = @Address2,
        City = @City,
        Pincode = @Pincode,
        contact = @contact,
        email = @Email,
        website = @Website,
        panno = @Panno,
        stax = @Stax,
        t1 = @T1,
        t2 = @T2,
        t3 = @T3,
        t4 = @T4,
        t5 = @T5,
        bankname = @Bankname,
        acno = @Acno,
        ifsccode = @Ifsccode,
        bankbranch = @Bankbranch,
        bankcity = @Bankcity`;
    await pool
      .request()
      .input("CompName", CompName)
      .input("Address1", Address1)
      .input("Address2", Address2)
      .input("City", City)
      .input("Pincode", Pincode)
      .input("contact", contact)
      .input("Email", email)
      .input("Website", website)
      .input("Panno", panno)
      .input("Stax", stax)
      .input("T1", t1)
      .input("T2", t2)
      .input("T3", t3)
      .input("T4", t4)
      .input("T5", t5)
      .input("Bankname", bankname)
      .input("Acno", acno)
      .input("Ifsccode", ifsccode)
      .input("Bankbranch", bankbranch)
      .input("Bankcity", bankcity)
      .query(updateQuery);

    res
      .status(200)
      .json({ statusCode: 200, message: "Company info updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ statusCode: 500, message: "Error updating company info", error });
  }
};

module.exports = { companyInfo, updateCompanyInfo };
