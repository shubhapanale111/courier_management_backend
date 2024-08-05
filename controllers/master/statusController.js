const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Create a new status
const createStatus = async (req, res) => {
  try {
    const pool = await connectDatabase();
    let { sta, sramarks } = req.body;

    // Ensure sta and sramarks are defined and convert to uppercase
    sta = sta ? sta.toUpperCase() : '';
    sramarks = sramarks ? sramarks.toUpperCase() : '';

    const insertQuery = `
      INSERT INTO dbo.jbl_stamaster (sta, sramarks)
      VALUES (@sta, @sramarks);
    `;

    await pool.request()
      .input('sta', sql.VarChar, sta)
      .input('sramarks', sql.VarChar, sramarks)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'Status created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating status', error });
  }
};

// Get all statuses
const getStatuses = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_stamaster';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, statuses: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting statuses', error });
  }
};

// Get a status by sta
const getStatusBySta = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { sta } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_stamaster WHERE sta = @sta';
    const result = await pool.request()
      .input('sta', sql.VarChar, sta.toUpperCase())
      .query(selectQuery);

    if (result.recordset.length > 0) {
      res.status(200).json({ statusCode: 200, status: result.recordset[0] });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Status not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching status', error });
  }
};

// Update a status by sta
const updateStatusBySta = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { sta } = req.params;
    let { newSta, newSramarks } = req.body;

    // Ensure newSta and newSramarks are defined and convert to uppercase
    newSta = newSta ? newSta.toUpperCase() : '';
    newSramarks = newSramarks ? newSramarks.toUpperCase() : '';

    const updateQuery = `
      UPDATE dbo.jbl_stamaster
      SET sta = @newSta, sramarks = @newSramarks
      WHERE sta = @sta;
    `;
    const result = await pool.request()
      .input('sta', sql.VarChar, sta.toUpperCase())
      .input('newSta', sql.VarChar, newSta)
      .input('newSramarks', sql.VarChar, newSramarks)
      .query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Status updated successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Status not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating status', error });
  }
};

// Delete a status by sta
const deleteStatusBySta = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { sta } = req.params;

    const deleteQuery = 'DELETE FROM dbo.jbl_stamaster WHERE sta = @sta';
    const result = await pool.request()
      .input('sta', sql.VarChar, sta.toUpperCase())
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Status deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Status not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting status', error });
  }
};

module.exports = { createStatus, getStatuses, getStatusBySta, updateStatusBySta, deleteStatusBySta };
