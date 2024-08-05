const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Create a new country
const createCountry = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { Country_Name } = req.body;

    const insertQuery = `
      INSERT INTO dbo.jbl_COUNTRY (Country_Name)
      VALUES (@Country_Name);
    `;

    await pool.request()
      .input('Country_Name', sql.VarChar, Country_Name)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'Country created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating country', error });
  }
};

// Get all countries
const getCountries = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_COUNTRY';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, countries: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting countries', error });
  }
};

// Get a country by Country_Name
const getCountryByName = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { Country_Name } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_COUNTRY WHERE Country_Name = @Country_Name';
    const result = await pool.request()
      .input('Country_Name', sql.VarChar, Country_Name)
      .query(selectQuery);

    if (result.recordset.length > 0) {
      res.status(200).json({ statusCode: 200, country: result.recordset[0] });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Country not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching country', error });
  }
};

// Update a country by Country_Name
const updateCountryByName = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { Country_Name } = req.params;
    const { New_Country_Name } = req.body;

    const updateQuery = `
      UPDATE dbo.jbl_COUNTRY
      SET Country_Name = @New_Country_Name
      WHERE Country_Name = @Country_Name;
    `;
    const result = await pool.request()
      .input('Country_Name', sql.VarChar, Country_Name)
      .input('New_Country_Name', sql.VarChar, New_Country_Name)
      .query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Country updated successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Country not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating country', error });
  }
};

// Delete a country by Country_Name
const deleteCountryByName = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { Country_Name } = req.params;

    const deleteQuery = 'DELETE FROM dbo.jbl_COUNTRY WHERE Country_Name = @Country_Name';
    const result = await pool.request()
      .input('Country_Name', sql.VarChar, Country_Name)
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Country deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Country not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting country', error });
  }
};

module.exports = { createCountry, getCountries, getCountryByName, updateCountryByName, deleteCountryByName };
