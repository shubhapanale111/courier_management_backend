const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Function to convert all fields to uppercase except EmailID
const convertToUpperCase = (data) => {
  const upperCaseData = {};
  for (const key in data) {
    if (key !== 'EmailID') {
      upperCaseData[key] = data[key] ? data[key].toUpperCase() : null;
    } else {
      upperCaseData[key] = data[key];
    }
  }
  return upperCaseData;
};

// // Function to get all city entries
const getCitys = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT City_Name FROM dbo.jbl_CITY';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, city: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting CITY entries', error });
  }
};

// Create a new forwarder
const createForwarder = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { FWDcode, FWDname, Cperson, Address, Street, City_NAME, Contactno, EmailID, awbchrg, gstno, panno, website, branch } = req.body;

    const upperCaseData = convertToUpperCase({ FWDcode, FWDname, Cperson, Address, Street, City_NAME, Contactno, EmailID, awbchrg, gstno, panno ,website, branch});

    const insertQuery = `
      INSERT INTO dbo.jbl_forwarder (FWDcode, FWDname, Cperson, Address, Street, City_NAME, Contactno, EmailID, awbchrg, gstno, panno, website, branch)
      VALUES (@FWDcode, @FWDname, @Cperson, @Address, @Street, @City_NAME, @Contactno, @EmailID, @awbchrg, @gstno, @panno, LOWER(@website),@branch);
    `;

    await pool.request()
      .input('FWDcode', sql.VarChar, upperCaseData.FWDcode)
      .input('FWDname', sql.VarChar, upperCaseData.FWDname)
      .input('Cperson', sql.VarChar, upperCaseData.Cperson)
      .input('Address', sql.VarChar, upperCaseData.Address)
      .input('Street', sql.VarChar, upperCaseData.Street)
      .input('City_NAME', sql.VarChar, upperCaseData.City_NAME)
      .input('Contactno', sql.VarChar, upperCaseData.Contactno)
      .input('EmailID', sql.VarChar, upperCaseData.EmailID)
      .input('awbchrg', sql.VarChar, upperCaseData.awbchrg)
      .input('gstno', sql.VarChar, upperCaseData.gstno)
      .input('panno', sql.VarChar, upperCaseData.panno)
      .input('website', sql.VarChar, upperCaseData.website)
      .input('branch', sql.VarChar, upperCaseData.branch)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'Forwarder created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating forwarder', error });
  }
};

// Get all forwarders
const getForwarders = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_forwarder';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, forwarders: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting forwarders', error });
  }
};

// Get a forwarder by FWDcode
const getForwarderByCode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { FWDcode } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_forwarder WHERE FWDcode = @FWDcode';
    const result = await pool.request()
      .input('FWDcode', sql.VarChar, FWDcode)
      .query(selectQuery);

    if (result.recordset.length > 0) {
      res.status(200).json({ statusCode: 200, forwarder: result.recordset[0] });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Forwarder not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching forwarder', error });
  }
};

// Update a forwarder by FWDcode
const updateForwarderByCode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { FWDcode } = req.params;
    const { FWDname, Cperson, Address, Street, City_Name, Contactno, EmailID, awbchrg, gstno, panno, website, branch} = req.body;

    const upperCaseData = convertToUpperCase({ FWDname, Cperson, Address, Street, City_Name, Contactno, EmailID, awbchrg, gstno, panno, website, branch });

    const updateQuery = `
      UPDATE dbo.jbl_forwarder
      SET FWDname = @FWDname,
          Cperson = @Cperson,
          Address = @Address,
          Street = @Street,
          City_Name = @City_Name,
          Contactno = @Contactno,
          EmailID = @EmailID,
          awbchrg = @awbchrg,
          gstno = @gstno,
          panno = @panno,
          website = LOWER(@website),
          branch=@branch
      WHERE FWDcode = @FWDcode;
    `;
    const result = await pool.request()
      .input('FWDcode', sql.VarChar, FWDcode)
      .input('FWDname', sql.VarChar, upperCaseData.FWDname)
      .input('Cperson', sql.VarChar, upperCaseData.Cperson)
      .input('Address', sql.VarChar, upperCaseData.Address)
      .input('Street', sql.VarChar, upperCaseData.Street)
      .input('City_Name', sql.VarChar, upperCaseData.City_Name)
      .input('Contactno', sql.VarChar, upperCaseData.Contactno)
      .input('EmailID', sql.VarChar, upperCaseData.EmailID)
      .input('awbchrg', sql.VarChar, upperCaseData.awbchrg)
      .input('gstno', sql.VarChar, upperCaseData.gstno)
      .input('panno', sql.VarChar, upperCaseData.panno)
      .input('website', sql.VarChar, upperCaseData.website)
      .input('branch', sql.VarChar, upperCaseData.branch)

      .query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Forwarder updated successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Forwarder not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating forwarder', error });
  }
};

// Delete a forwarder by FWDcode
const deleteForwarderByCode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { FWDcode } = req.params;

    const deleteQuery = 'DELETE FROM dbo.jbl_forwarder WHERE FWDcode = @FWDcode';
    const result = await pool.request()
      .input('FWDcode', sql.VarChar, FWDcode)
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Forwarder deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Forwarder not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting forwarder', error });
  }
};

module.exports = {
  createForwarder,
  getForwarders,
  getForwarderByCode,
  updateForwarderByCode,
  deleteForwarderByCode,
  getCitys
};