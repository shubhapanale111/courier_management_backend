const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Create a new service
const createService = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { bmode, bservice, voldvdby } = req.body;

    const insertQuery = `
      INSERT INTO dbo.jbl_bservice (bmode, bservice, voldvdby)
      VALUES (@bmode, @bservice, @voldvdby);
    `;

    await pool.request()
      .input('bmode', sql.VarChar, bmode.toUpperCase())
      .input('bservice', sql.VarChar, bservice.toUpperCase())
      .input('voldvdby', sql.VarChar, voldvdby.toUpperCase())
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'Service created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating service', error });
  }
};

// Get all services
const getServices = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_bservice';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, services: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting services', error });
  }
};

// Get a service by bmode
const getServiceByBmode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { bmode } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_bservice WHERE bmode = @bmode';
    const result = await pool.request()
      .input('bmode', sql.VarChar, bmode)
      .query(selectQuery);

    if (result.recordset.length > 0) {
      res.status(200).json({ statusCode: 200, service: result.recordset[0] });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Service not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching service', error });
  }
};

// Update a service by bmode
const updateServiceByBmode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { bmode } = req.params;
    const { bservice, voldvdby } = req.body;

    const updateQuery = `
      UPDATE dbo.jbl_bservice
      SET bservice = @bservice,
          voldvdby = @voldvdby
      WHERE bmode = @bmode;
    `;
    const result = await pool.request()
      .input('bmode', sql.VarChar, bmode)
      .input('bservice', sql.VarChar, bservice.toUpperCase())
      .input('voldvdby', sql.VarChar, voldvdby.toUpperCase())
      .query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Service updated successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Service not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating service', error });
  }
};

// Delete a service by bmode
const deleteServiceByBmode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { bmode } = req.params;

    const deleteQuery = 'DELETE FROM dbo.jbl_bservice WHERE bmode = @bmode';
    const result = await pool.request()
      .input('bmode', sql.VarChar, bmode)
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Service deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Service not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting service', error });
  }
};

module.exports = { createService, getServices, getServiceByBmode, updateServiceByBmode, deleteServiceByBmode };
