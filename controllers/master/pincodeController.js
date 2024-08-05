
const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Create a new pincode
const createPincode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const pincodes = req.body;

    if (!Array.isArray(pincodes) || pincodes.length === 0) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid pincode data' });
    }

    for (const pincodeData of pincodes) {
      const { pstate, cityname, citycode, areaname, pincode, servicetype, Servicable } = pincodeData;

      // Convert fields to uppercase
      const upperPstate = pstate.toUpperCase();
      const upperCityname = cityname.toUpperCase();
      const upperCitycode = citycode.toUpperCase();
      const upperAreaname = areaname.toUpperCase();
      const upperPincode = pincode.toUpperCase();
      const upperServicetype = servicetype.toUpperCase();
      const upperServicable = Servicable.toUpperCase();

      const insertQuery = `
        INSERT INTO dbo.jbl_Pincode (pstate, cityname, citycode, areaname, pincode, servicetype, Servicable)
        VALUES (@pstate, @cityname, @citycode, @areaname, @pincode, @servicetype, @Servicable);
      `;

      await pool.request()
        .input('pstate', sql.VarChar, upperPstate)
        .input('cityname', sql.VarChar, upperCityname)
        .input('citycode', sql.VarChar, upperCitycode)
        .input('areaname', sql.VarChar, upperAreaname)
        .input('pincode', sql.VarChar, upperPincode)
        .input('servicetype', sql.VarChar, upperServicetype)
        .input('Servicable', sql.VarChar, upperServicable)
        .query(insertQuery);
    }

    res.status(201).json({ statusCode: 201, message: 'Pincodes created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating pincodes', error });
  }
};

// Get all pincodes
const getPincodes = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_Pincode';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, pincodes: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting pincodes', error });
  }
};

// Get a pincode by pincode
const getPincodeByPincode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { pincode } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_Pincode WHERE pincode = @pincode';
    const result = await pool.request()
      .input('pincode', sql.VarChar, pincode.toUpperCase())
      .query(selectQuery);

    if (result.recordset.length > 0) {
      res.status(200).json({ statusCode: 200, pincode: result.recordset[0] });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Pincode not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching pincode', error });
  }
};

// Update a pincode by pincode
const updatePincodeByPincode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { pincode } = req.params;
    const { pstate, cityname, citycode, areaname, servicetype } = req.body;

    // Convert fields to uppercase
    const upperPstate = pstate.toUpperCase();
    const upperCityname = cityname.toUpperCase();
    const upperCitycode = citycode.toUpperCase();
    const upperAreaname = areaname.toUpperCase();
    const upperServicetype = servicetype.toUpperCase();

    const updateQuery = `
      UPDATE dbo.jbl_Pincode
      SET pstate = @pstate, cityname = @cityname, citycode = @citycode, areaname = @areaname, servicetype = @servicetype
      WHERE pincode = @pincode;
    `;
    const result = await pool.request()
      .input('pincode', sql.VarChar, pincode.toUpperCase())
      .input('pstate', sql.VarChar, upperPstate)
      .input('cityname', sql.VarChar, upperCityname)
      .input('citycode', sql.VarChar, upperCitycode)
      .input('areaname', sql.VarChar, upperAreaname)
      .input('servicetype', sql.VarChar, upperServicetype)
      .query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Pincode updated successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Pincode not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating pincode', error });
  }
};

// Delete a pincode by pincode
const deletePincodeByPincode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { pincode } = req.params;

    const deleteQuery = 'DELETE FROM dbo.jbl_Pincode WHERE pincode = @pincode';
    const result = await pool.request()
      .input('pincode', sql.VarChar, pincode.toUpperCase())
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Pincode deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Pincode not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting pincode', error });
  }
};

module.exports = { createPincode, getPincodes, getPincodeByPincode, updatePincodeByPincode, deletePincodeByPincode };
