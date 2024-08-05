
const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Get all states
const getStates = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_state';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, states: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting states', error });
  }
};

// Create a new state
const createState = async (req, res) => {
  try {
    const pool = await connectDatabase();
    let { state } = req.body;

    // Convert state name to uppercase
    state = state.toUpperCase();

    const insertQuery = `
      INSERT INTO dbo.jbl_state (state)
      VALUES (@state);
    `;

    await pool.request()
      .input('state', sql.VarChar, state)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'State created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating state', error });
  }
};

// Get a state by ID
const getStateById = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { id } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_state WHERE id = @id';
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(selectQuery);

    if (result.recordset.length > 0) {
      res.status(200).json({ statusCode: 200, state: result.recordset[0] });
    } else {
      res.status(404).json({ statusCode: 404, message: 'State not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching state', error });
  }
};

// Update a state by ID
const updateStateById = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { id } = req.params;
    let { state } = req.body;

    // Convert state name to uppercase
    state = state.toUpperCase();

    const updateQuery = `
      UPDATE dbo.jbl_state
      SET state = @state
      WHERE id = @id;
    `;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('state', sql.VarChar, state)
      .query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'State updated successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'State not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating state', error });
  }
};


const deleteStateByName = async (req, res) => {
  try {
    const pool = await connectDatabase();
    let { state } = req.body;

    const deleteQuery = 'DELETE FROM dbo.jbl_state WHERE state = @state';
    const result = await pool.request()
      .input('state', sql.VarChar, state.toUpperCase())
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'State deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'State not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting state', error });
  }
};

  
module.exports = { createState, getStates, getStateById, updateStateById, deleteStateByName };

