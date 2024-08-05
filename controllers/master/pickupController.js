const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Create a new pickup record
const createPickup = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { pcode, branch, pname, address, phone, pkrate } = req.body;

    const insertQuery = `
      INSERT INTO dbo.jbl_pmaster (pcode, branch, pname, address, phone, pkrate)
      VALUES (@pcode, @branch, @pname, @address, @phone, @pkrate);
    `;

    await pool.request()
      .input('pcode', sql.VarChar, pcode.toUpperCase())
      .input('branch', sql.VarChar, branch.toUpperCase())
      .input('pname', sql.VarChar, pname.toUpperCase())
      .input('address', sql.VarChar, address.toUpperCase())
      .input('phone', sql.VarChar, phone.toUpperCase())
      .input('pkrate', sql.VarChar, pkrate.toString())
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'Pickup record created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating pickup record', error });
  }
};

// Get all pickup records
const getPickups = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_pmaster';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, pickups: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting pickups', error });
  }
};

// Get a pickup record by pcode
const getPickupByCode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { pcode } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_pmaster WHERE pcode = @pcode';
    const result = await pool.request()
      .input('pcode', sql.VarChar, pcode.toUpperCase())
      .query(selectQuery);

    if (result.recordset.length > 0) {
      res.status(200).json({ statusCode: 200, pickup: result.recordset[0] });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Pickup record not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching pickup record', error });
  }
};

// Update a pickup record by pcode
const updatePickupByCode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { pcode } = req.params;
    const { branch, pname, address, phone, pkrate } = req.body;

    const updateQuery = `
      UPDATE dbo.jbl_pmaster
      SET branch = @branch,
          pname = @pname,
          address = @address,
          phone = @phone,
          pkrate = @pkrate
      WHERE pcode = @pcode;
    `;
    const result = await pool.request()
      .input('pcode', sql.VarChar, pcode.toUpperCase())
      .input('branch', sql.VarChar, branch.toUpperCase())
      .input('pname', sql.VarChar, pname.toUpperCase())
      .input('address', sql.VarChar, address.toUpperCase())
      .input('phone', sql.VarChar, phone.toUpperCase())
      .input('pkrate', sql.VarChar, pkrate.toUpperCase())
      .query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Pickup record updated successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Pickup record not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating pickup record', error });
  }
};

// Delete a pickup record by pcode
const deletePickupByCode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { pcode } = req.params;

    const deleteQuery = 'DELETE FROM dbo.jbl_pmaster WHERE pcode = @pcode';
    const result = await pool.request()
      .input('pcode', sql.VarChar, pcode.toUpperCase())
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Pickup record deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Pickup record not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting pickup record', error });
  }
};

module.exports = { createPickup, getPickups, getPickupByCode, updatePickupByCode, deletePickupByCode };
