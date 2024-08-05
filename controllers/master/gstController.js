// gstController.js
const { sql, connectDatabase } = require('../../config/dbconfig');

// Function to create a new GST entry
const createGst = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { Clcode, smode, gst, edate } = req.body;

    const insertQuery = `
      INSERT INTO dbo.Jbl_Gst (Clcode, smode, gst, edate)
      VALUES (@Clcode, @smode, @gst, @edate);
    `;

    await pool.request()
      .input('Clcode', sql.VarChar, Clcode.toUpperCase())
      .input('smode', sql.VarChar, smode.toUpperCase())
      .input('gst', sql.VarChar, gst.toUpperCase())
      .input('edate', sql.Date, new Date(edate))
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'GST entry created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating GST entry', error });
  }
};

// // Function to get all GST entries
const getClient = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT clcode, clname FROM dbo.jbl_CLIENT';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, gsts: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting GST entries', error });
  }
};

// // Function to get GST entry by Clcode
// const getGstByClcode = async (req, res) => {
//   try {
//     const pool = await connectDatabase();
//     const { Clcode } = req.params;
//     const selectQuery = 'SELECT * FROM dbo.Jbl_Gst WHERE Clcode = @Clcode';
//     const result = await pool.request()
//       .input('Clcode', sql.VarChar, Clcode)
//       .query(selectQuery);

//     if (result.recordset.length > 0) {
//       res.status(200).json({ statusCode: 200, gst: result.recordset[0] });
//     } else {
//       res.status(404).json({ statusCode: 404, message: 'GST entry not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ statusCode: 500, message: 'Error fetching GST entry', error });
//   }
// };

// // Function to update GST entry by Clcode
// const updateGstByClcode = async (req, res) => {
//   try {
//     const pool = await connectDatabase();
//     const { Clcode } = req.params;
//     const { smode, gst, edate } = req.body;

//     const updateQuery = `
//       UPDATE dbo.Jbl_Gst
//       SET smode = @smode, gst = @gst, edate = @edate
//       WHERE Clcode = @Clcode;
//     `;

//     const result = await pool.request()
//     .input('Clcode', sql.VarChar, Clcode.toUpperCase())
//     .input('smode', sql.VarChar, smode.toUpperCase())
//     .input('gst', sql.VarChar, gst.toUpperCase())
//       .input('edate', sql.Date, new Date(edate))
//       .query(updateQuery);

//     if (result.rowsAffected[0] > 0) {
//       res.status(200).json({ statusCode: 200, message: 'GST entry updated successfully' });
//     } else {
//       res.status(404).json({ statusCode: 404, message: 'GST entry not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ statusCode: 500, message: 'Error updating GST entry', error });
//   }
// };

// // Function to delete GST entry by Clcode
// const deleteGstByClcode = async (req, res) => {
//   try {
//     const pool = await connectDatabase();
//     const { Clcode } = req.params;

//     const deleteQuery = 'DELETE FROM dbo.Jbl_Gst WHERE Clcode = @Clcode';
//     const result = await pool.request()
//       .input('Clcode', sql.VarChar, Clcode)
//       .query(deleteQuery);

//     if (result.rowsAffected[0] > 0) {
//       res.status(200).json({ statusCode: 200, message: 'GST entry deleted successfully' });
//     } else {
//       res.status(404).json({ statusCode: 404, message: 'GST entry not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ statusCode: 500, message: 'Error deleting GST entry', error });
//   }
// };

const getModes = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_bservice';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, gsts: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting modes entries', error });
  }
};
module.exports = { createGst, getModes , getClient};


// const { sql, connectDatabase } = require('../../config/dbconfig');

// // Function to create a new GST entry
// const createGst = async (req, res) => {
//   try {
//     const pool = await connectDatabase();
//     const { Clcode, bmode, gst, edate } = req.body;

//     // Fetch smode from jbl_bservice table using bmode
//     const fetchSmodeQuery = `
//       SELECT bmode AS smode
//       FROM dbo.jbl_bservice
//       WHERE bmode = @bmode;
//     `;

//     const smodeResult = await pool.request()
//       .input('bmode', sql.VarChar, bmode.toUpperCase())
//       .query(fetchSmodeQuery);

//     if (smodeResult.recordset.length === 0) {
//       return res.status(404).json({ statusCode: 404, message: 'Service mode not found in jbl_bservice table' });
//     }

//     const smode = smodeResult.recordset[0].smode;

//     const insertQuery = `
//       INSERT INTO dbo.Jbl_Gst (Clcode, smode, gst, edate)
//       VALUES (@Clcode, @smode, @gst, @edate);
//     `;

//     await pool.request()
//       .input('Clcode', sql.VarChar, Clcode.toUpperCase())
//       .input('smode', sql.VarChar, smode.toUpperCase())
//       .input('gst', sql.VarChar, gst.toUpperCase())
//       .input('edate', sql.Date, new Date(edate))
//       .query(insertQuery);

//     res.status(201).json({ statusCode: 201, message: 'GST entry created successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ statusCode: 500, message: 'Error creating GST entry', error });
//   }
// };

// // Function to get all GST entries
// const getGsts = async (req, res) => {
//   try {
//     const pool = await connectDatabase();
//     const selectQuery = 'SELECT * FROM dbo.Jbl_Gst';
//     const result = await pool.request().query(selectQuery);
//     res.status(200).json({ statusCode: 200, gsts: result.recordset });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ statusCode: 500, message: 'Error getting GST entries', error });
//   }
// };

// // Function to get GST entry by Clcode
// const getGstByClcode = async (req, res) => {
//   try {
//     const pool = await connectDatabase();
//     const { Clcode } = req.params;
//     const selectQuery = 'SELECT * FROM dbo.Jbl_Gst WHERE Clcode = @Clcode';
//     const result = await pool.request()
//       .input('Clcode', sql.VarChar, Clcode)
//       .query(selectQuery);

//     if (result.recordset.length > 0) {
//       res.status(200).json({ statusCode: 200, gst: result.recordset[0] });
//     } else {
//       res.status(404).json({ statusCode: 404, message: 'GST entry not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ statusCode: 500, message: 'Error fetching GST entry', error });
//   }
// };

// // Function to update GST entry by Clcode
// const updateGstByClcode = async (req, res) => {
//   try {
//     const pool = await connectDatabase();
//     const { Clcode } = req.params;
//     const { smode, gst, edate } = req.body;

//     const updateQuery = `
//       UPDATE dbo.Jbl_Gst
//       SET smode = @smode, gst = @gst, edate = @edate
//       WHERE Clcode = @Clcode;
//     `;

//     const result = await pool.request()
//       .input('Clcode', sql.VarChar, Clcode.toUpperCase())
//       .input('smode', sql.VarChar, smode.toUpperCase())
//       .input('gst', sql.VarChar, gst.toUpperCase())
//       .input('edate', sql.Date, new Date(edate))
//       .query(updateQuery);

//     if (result.rowsAffected[0] > 0) {
//       res.status(200).json({ statusCode: 200, message: 'GST entry updated successfully' });
//     } else {
//       res.status(404).json({ statusCode: 404, message: 'GST entry not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ statusCode: 500, message: 'Error updating GST entry', error });
//   }
// };

// // Function to delete GST entry by Clcode
// const deleteGstByClcode = async (req, res) => {
//   try {
//     const pool = await connectDatabase();
//     const { Clcode } = req.params;

//     const deleteQuery = 'DELETE FROM dbo.Jbl_Gst WHERE Clcode = @Clcode';
//     const result = await pool.request()
//       .input('Clcode', sql.VarChar, Clcode)
//       .query(deleteQuery);

//     if (result.rowsAffected[0] > 0) {
//       res.status(200).json({ statusCode: 200, message: 'GST entry deleted successfully' });
//     } else {
//       res.status(404).json({ statusCode: 404, message: 'GST entry not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ statusCode: 500, message: 'Error deleting GST entry', error });
//   }
// };

// module.exports = { createGst, getGsts, getGstByClcode, updateGstByClcode, deleteGstByClcode };