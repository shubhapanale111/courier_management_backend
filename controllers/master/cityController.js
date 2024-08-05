
const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Helper function to format the Zone
const formatZone = (zone) => {
  const words = zone.split(' ');
  if (words.length === 1) {
    return words[0].substring(0, 3).toUpperCase() + ':' + words[0].toUpperCase();
  }
  const abbreviation = words.map(word => word[0].toUpperCase()).join('');
  return abbreviation + ':' + words.map(word => word.toUpperCase()).join(' ');
};

// Create a new city
const createCity = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { CITYCODE, City_Name, state, country_name, Zone } = req.body;

    const formattedZone = formatZone(Zone);

    const insertQuery = `
      INSERT INTO dbo.jbl_CITY (CITYCODE, City_Name, state, country_name, Zone)
      VALUES (@CITYCODE, @City_Name, @state, @country_name, @Zone);
    `;

    await pool.request()
      .input('CITYCODE', sql.VarChar, CITYCODE)
      .input('City_Name', sql.VarChar, City_Name)
      .input('state', sql.VarChar, state)
      .input('country_name', sql.VarChar, country_name)
      .input('Zone', sql.VarChar, formattedZone)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'City created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating city', error });
  }
};

// Get all cities
const getCities = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_CITY';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, cities: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting cities', error });
  }
};

// Get a city by CITYCODE
const getCityByCode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { CITYCODE } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_CITY WHERE CITYCODE = @CITYCODE';
    const result = await pool.request()
      .input('CITYCODE', sql.VarChar, CITYCODE)
      .query(selectQuery);

    if (result.recordset.length > 0) {
      res.status(200).json({ statusCode: 200, city: result.recordset[0] });
    } else {
      res.status(404).json({ statusCode: 404, message: 'City not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching city', error });
  }
};

// Update a city by CITYCODE
const updateCityByCode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    let { CITYCODE, City_Name, state, country_name, Zone } = req.body; // Changed const to let here

    // Convert fields to uppercase
    CITYCODE = CITYCODE.toUpperCase();
    City_Name = City_Name.toUpperCase();
    state = state.toUpperCase();
    country_name = country_name.toUpperCase();
    Zone = Zone.toUpperCase();

    const formattedZone = formatZone(Zone);

    const updateQuery = `
      UPDATE dbo.jbl_CITY
      SET City_Name = @City_Name,
          state = @state,
          country_name = @country_name,
          Zone = @Zone
      WHERE CITYCODE = @CITYCODE;
    `;
    const result = await pool.request()
      .input('CITYCODE', sql.VarChar, CITYCODE)
      .input('City_Name', sql.VarChar, City_Name)
      .input('state', sql.VarChar, state)
      .input('country_name', sql.VarChar, country_name)
      .input('Zone', sql.VarChar, formattedZone)
      .query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'City updated successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'City not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating city', error });
  }
};

// Delete a city by CITYCODE
const deleteCityByCode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { CITYCODE } = req.params;

    const deleteQuery = 'DELETE FROM dbo.jbl_CITY WHERE CITYCODE = @CITYCODE';
    const result = await pool.request()
      .input('CITYCODE', sql.VarChar, CITYCODE)
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'City deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'City not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting city', error });
  }
};

module.exports = { createCity, getCities, getCityByCode, updateCityByCode, deleteCityByCode };
