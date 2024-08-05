

const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Create a new branch
const createBranch = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { bname, cperson, address, add1, city, cont, eid, statename, gstno } = req.body;

    // Convert fields to uppercase
    const uppercaseFields = {
      bname: bname.toUpperCase(),
      cperson: cperson.toUpperCase(),
      address: address.toUpperCase(),
      add1: add1.toUpperCase(),
      city: city.toUpperCase(),
      cont: cont.toUpperCase(),
      statename: statename.toUpperCase(),
      gstno: gstno.toUpperCase()
    };

    // Check if bname already exists
    const checkQuery = `SELECT COUNT(*) AS count FROM dbo.jbl_branch WHERE bname = @bname;`;
    const checkResult = await pool.request()
      .input('bname', sql.VarChar, uppercaseFields.bname)
      .query(checkQuery);

    if (checkResult.recordset[0].count > 0) {
      // If bname exists, delete the existing entry
      const deleteQuery = `DELETE FROM dbo.jbl_branch WHERE bname = @bname;`;
      await pool.request()
        .input('bname', sql.VarChar, uppercaseFields.bname)
        .query(deleteQuery);
    }

    // Insert the new entry
    const insertQuery = `
      INSERT INTO dbo.jbl_branch (bname, cperson, address, add1, city, cont, eid, statename, gstno)
      VALUES (@bname, @cperson, @address, @add1, @city, @cont, @eid, @statename, @gstno);
    `;

    await pool.request()
      .input('bname', sql.VarChar, uppercaseFields.bname)
      .input('cperson', sql.VarChar, uppercaseFields.cperson)
      .input('address', sql.VarChar, uppercaseFields.address)
      .input('add1', sql.VarChar, uppercaseFields.add1)
      .input('city', sql.VarChar, uppercaseFields.city)
      .input('cont', sql.VarChar, uppercaseFields.cont)
      .input('eid', sql.VarChar, eid) // Insert eid as-is
      .input('statename', sql.VarChar, uppercaseFields.statename)
      .input('gstno', sql.VarChar, uppercaseFields.gstno)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'Branch created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating branch', error });
  }
};


// Get all branches
const getBranches = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_branch';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, branches: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting branches', error });
  }
};

// Get a branch by bname
const getBranchByName = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { bname } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_branch WHERE bname = @bname';
    const result = await pool.request()
      .input('bname', sql.VarChar, bname)
      .query(selectQuery);

    if (result.recordset.length > 0) {
      res.status(200).json({ statusCode: 200, branch: result.recordset[0] });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Branch not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching branch', error });
  }
};

// Update a branch by bname
const updateBranchByName = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { bname } = req.params;
    const { new_bname, cperson, address, add1, city, cont, eid, statename, gstno } = req.body;

    // Convert fields to uppercase
    const uppercaseFields = {
      new_bname: new_bname.toUpperCase(),
      cperson: cperson.toUpperCase(),
      address: address.toUpperCase(),
      add1: add1.toUpperCase(),
      city: city.toUpperCase(),
      cont: cont.toUpperCase(),
      statename: statename.toUpperCase(),
      gstno: gstno.toUpperCase()
    };

    const updateQuery = `
      UPDATE dbo.jbl_branch
      SET bname = @new_bname,
          cperson = @cperson,
          address = @address,
          add1 = @add1,
          city = @city,
          cont = @cont,
          eid = @eid,
          statename = @statename,
          gstno = @gstno
      WHERE bname = @bname;
    `;
    const result = await pool.request()
      .input('bname', sql.VarChar, bname)
      .input('new_bname', sql.VarChar, uppercaseFields.new_bname)
      .input('cperson', sql.VarChar, uppercaseFields.cperson)
      .input('address', sql.VarChar, uppercaseFields.address)
      .input('add1', sql.VarChar, uppercaseFields.add1)
      .input('city', sql.VarChar, uppercaseFields.city)
      .input('cont', sql.VarChar, uppercaseFields.cont)
      .input('eid', sql.VarChar, eid) // Update eid as-is
      .input('statename', sql.VarChar, uppercaseFields.statename)
      .input('gstno', sql.VarChar, uppercaseFields.gstno)
      .query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Branch updated successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Branch not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating branch', error });
  }
};

// Delete a branch by bname
const deleteBranchByName = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { bname } = req.params;

    const deleteQuery = 'DELETE FROM dbo.jbl_branch WHERE bname = @bname';
    const result = await pool.request()
      .input('bname', sql.VarChar, bname)
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Branch deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Branch not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting branch', error });
  }
};

module.exports = { createBranch, getBranches, getBranchByName, updateBranchByName, deleteBranchByName };

