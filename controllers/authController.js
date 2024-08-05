const { connectDatabase, sql } = require('../config/dbconfig');

const loginUser = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { username, pass, branch } = req.body;

    // Check if any of the required parameters are undefined
    if (username === undefined || pass === undefined || branch === undefined) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid input: username, password, and branch are required' });
    }

    const selectQuery = `
      SELECT * FROM dbo.jbl_cuser
      WHERE username = @username AND pass = @pass AND branch = @branch;
    `;
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('pass', sql.VarChar, pass)
      .input('branch', sql.VarChar, branch)
      .query(selectQuery);

    if (result.recordset.length > 0) {
      const userData = result.recordset[0];
      res.status(200).json({ statusCode: 200, message: 'Login successful', data: userData });
    } else {
      res.status(401).json({ statusCode: 401, message: 'Login failed: Invalid username, password, or branch' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error logging in', error });
  }
};

module.exports = { loginUser };
