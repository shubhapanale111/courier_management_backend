const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Get all parcel items
const getParcelItems = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_ParcelItem';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, parcelItems: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting parcel items', error });
  }
};

// Create a new parcel item
const createParcelItem = async (req, res) => {
  try {
    const pool = await connectDatabase();
    let { parcelItem } = req.body;

    // Convert parcel item to uppercase
    parcelItem = parcelItem.toUpperCase();

    const insertQuery = `
      INSERT INTO dbo.jbl_ParcelItem (ParcelItem)
      VALUES (@parcelItem);
    `;

    await pool.request()
      .input('parcelItem', sql.VarChar, parcelItem)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'Parcel item created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating parcel item', error });
  }
};

// Get a parcel item by name
const getParcelItemByName = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { parcelItem } = req.params;

    const selectQuery = 'SELECT * FROM dbo.jbl_ParcelItem WHERE ParcelItem = @parcelItem';
    const result = await pool.request()
      .input('parcelItem', sql.VarChar, parcelItem.toUpperCase())
      .query(selectQuery);

    if (result.recordset.length > 0) {
      res.status(200).json({ statusCode: 200, parcelItem: result.recordset[0] });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Parcel item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching parcel item', error });
  }
};

// Update a parcel item by name
const updateParcelItemByName = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { parcelItem } = req.params;
    let { newParcelItem } = req.body;

    // Convert new parcel item to uppercase
    newParcelItem = newParcelItem.toUpperCase();

    const updateQuery = `
      UPDATE dbo.jbl_ParcelItem
      SET ParcelItem = @newParcelItem
      WHERE ParcelItem = @parcelItem;
    `;
    const result = await pool.request()
      .input('parcelItem', sql.VarChar, parcelItem.toUpperCase())
      .input('newParcelItem', sql.VarChar, newParcelItem)
      .query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Parcel item updated successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Parcel item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating parcel item', error });
  }
};

// Delete a parcel item by name
const deleteParcelItemByName = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { parcelItem } = req.params;

    const deleteQuery = 'DELETE FROM dbo.jbl_ParcelItem WHERE ParcelItem = @parcelItem';
    const result = await pool.request()
      .input('parcelItem', sql.VarChar, parcelItem.toUpperCase())
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Parcel item deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Parcel item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting parcel item', error });
  }
};

module.exports = { createParcelItem, getParcelItems, getParcelItemByName, updateParcelItemByName, deleteParcelItemByName };
