const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Get all zones
const getZones = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_ZONE';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, zones: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting zones', error });
  }
};

// Create a new zone
const createZone = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { zcode, Zone_name } = req.body;

    const insertQuery = `
      INSERT INTO dbo.jbl_ZONE (zcode, Zone_name)
      VALUES (@zcode, @Zone_name);
    `;

    await pool.request()
      .input('zcode', sql.VarChar, zcode)
      .input('Zone_name', sql.VarChar, Zone_name)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'Zone created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating zone', error });
  }
};

// Get a zone by zcode
const getZoneByZcode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { zcode } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_ZONE WHERE zcode = @zcode';
    const result = await pool.request()
      .input('zcode', sql.VarChar, zcode)
      .query(selectQuery);

    if (result.recordset.length > 0) {
      res.status(200).json({ statusCode: 200, zone: result.recordset[0] });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Zone not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching zone', error });
  }
};

// Update a zone by zcode
const updateZoneByZcode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { zcode } = req.params;
    const { Zone_name } = req.body;

    const updateQuery = `
      UPDATE dbo.jbl_ZONE
      SET Zone_name = @Zone_name
      WHERE zcode = @zcode;
    `;
    const result = await pool.request()
      .input('zcode', sql.VarChar, zcode)
      .input('Zone_name', sql.VarChar, Zone_name)
      .query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Zone updated successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Zone not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating zone', error });
  }
};

// Delete a zone by zcode
const deleteZoneByZcode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { zcode } = req.params;

    const deleteQuery = 'DELETE FROM dbo.jbl_ZONE WHERE zcode = @zcode';
    const result = await pool.request()
      .input('zcode', sql.VarChar, zcode)
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Zone deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Zone not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting zone', error });
  }
};

module.exports = { createZone, getZones, getZoneByZcode, updateZoneByZcode, deleteZoneByZcode };
