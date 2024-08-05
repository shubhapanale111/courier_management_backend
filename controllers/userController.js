// const { connectDatabase } = require('../config/dbconfig');

// const createUser = async (req, res) => {
//   try {
//     const connection = await connectDatabase();
//     const { username, password, branch, role, admin, master, transaction, tools, customercare, billing, mis, account } = req.body;

//     const checkboxData = [
//       admin ? 'Ad' : '',
//       master ? 'Ms' : '',
//       transaction ? 'Tr' : '',
//       tools ? 'To' : '',
//       customercare ? 'Cu' : '',
//       billing ? 'Bi' : '',
//       mis ? 'Mi' : '',
//       account ? 'Ac' : ''
//     ].filter(Boolean).join('');

//     const insertQuery = `
//       INSERT INTO Users (username, pass, utype, urgt, branch)
//       VALUES (?, ?, ?, ?, ?);
//     `;
//     await connection.execute(insertQuery, [username, password, role, checkboxData, branch]);

//     res.status(201).json({ statusCode:201,message: 'User created successfully' });
//   } catch (error) {
//     res.status(500).json({ statusCode:500,message: 'Error creating user', error });
//   }
// };

// const getUsers = async(req,res) =>{
//   try{
//     const connection=await connectDatabase();
//     // const selectQuery='select * from users';
//     const selectQuery='select * from dbo.jbl_cuser';
//     const [rows]=await connection.execute(selectQuery);
//     res.status(200).json({statusCode:200, users:rows});

//   }catch(error){
//     console.log(error)
//     res.status(500).json({ statusCode:500,message: 'Error getting users', error });
//   }
// }
// // Function to get a user by username
// const getUserByUsername = async (req, res) => {
//   try {
//     const connection = await connectDatabase();
//     const { username } = req.params;
//     const selectQuery = 'SELECT * FROM Users WHERE username = ?';
//     const [rows] = await connection.execute(selectQuery, [username]);

//     if (rows.length > 0) {
//       res.status(200).json({ statusCode: 200, user: rows[0] });
//     } else {
//       res.status(404).json({ statusCode: 404, message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ statusCode: 500, message: 'Error fetching user', error });
//   }
// };

// // Function to update a user by username
// const updateUserByUsername = async (req, res) => {
//   try {
//     const connection = await connectDatabase();
//     const { username } = req.params;
//     const { password, branch, role, admin, master, transaction, tools, customercare, billing, mis, account } = req.body;

//     const checkboxData = [
//       admin ? 'Ad' : '',
//       master ? 'Ms' : '',
//       transaction ? 'Tr' : '',
//       tools ? 'To' : '',
//       customercare ? 'Cu' : '',
//       billing ? 'Bi' : '',
//       mis ? 'Mi' : '',
//       account ? 'Ac' : ''
//     ].filter(Boolean).join('');

//     const updateQuery = `
//       UPDATE Users
//       SET pass = ?, utype = ?, urgt = ?, branch = ?
//       WHERE username = ?;
//     `;
//     const [result] = await connection.execute(updateQuery, [password, role, checkboxData, branch, username]);

//     if (result.affectedRows > 0) {
//       res.status(200).json({ statusCode: 200, message: 'User updated successfully' });
//     } else {
//       res.status(404).json({ statusCode: 404, message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ statusCode: 500, message: 'Error updating user', error });
//   }
// };

// // Function to delete a user by username
// const deleteUserByUsername = async (req, res) => {
//   try {
//     const connection = await connectDatabase();
//     const { username } = req.params;

//     const deleteQuery = 'DELETE FROM Users WHERE username = ?';
//     const [result] = await connection.execute(deleteQuery, [username]);

//     if (result.affectedRows > 0) {
//       res.status(200).json({ statusCode: 200, message: 'User deleted successfully' });
//     } else {
//       res.status(404).json({ statusCode: 404, message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ statusCode: 500, message: 'Error deleting user', error });
//   }
// };
// module.exports = { createUser,getUsers, getUserByUsername, updateUserByUsername, deleteUserByUsername };





// for sql server


const { connectDatabase,sql } = require('../config/dbconfig');

const getUsers = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_cuser';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, users: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting users', error });
  }
};
// const createUser = async (req, res) => {
//   try {
//     const pool = await connectDatabase();
//     const { username, password, branch, role, admin, master, transaction, tools, customercare, billing, mis, account } = req.body;

//     const checkboxData = [
//       admin ? 'Ad' : '',
//       master ? 'Ma' : '',
//       transaction ? 'Tr' : '',
//       tools ? 'To' : '',
//       customercare ? 'Cu' : '',
//       billing ? 'Bi' : '',
//       mis ? 'M.' : '',
//       account ? 'Ac' : ''
//     ].filter(Boolean).join('');

//     const insertQuery = `
//       INSERT INTO dbo.jbl_cuser (username, pass, utype, urgt, branch)
//       VALUES (@username, @password, @role, @checkboxData, @branch);
//     `;

//     await pool.request()
//       .input('username', sql.VarChar, username)
//       .input('password', sql.VarChar, password)
//       .input('role', sql.VarChar, role)
//       .input('checkboxData', sql.VarChar, checkboxData)
//       .input('branch', sql.VarChar, branch)
//       .query(insertQuery);

//     res.status(201).json({ statusCode: 201, message: 'User created successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ statusCode: 500, message: 'Error creating user', error });
//   }
// };

const createUser = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { username, password, branch, role, admin, master, transaction, tools, customercare, billing, mis, account } = req.body;

    // Map role to appropriate utype value
    const utype = role === 'admin' ? 'A' : 'S';

    // Prepare checkboxData
    const checkboxData = [
      admin ? 'Ad' : '',
      master ? 'Ma' : '',
      transaction ? 'Tr' : '',
      tools ? 'To' : '',
      customercare ? 'Cu' : '',
      billing ? 'Bi' : '',
      mis ? 'M.' : '',
      account ? 'Ac' : ''
    ].filter(Boolean).join('');

    // SQL query to insert user
    const insertQuery = `
      INSERT INTO dbo.jbl_cuser (username, pass, utype, urgt, branch)
      VALUES (@username, @password, @utype, @checkboxData, @branch);
    `;

    // Execute the query
    await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password)
      .input('utype', sql.VarChar, utype)
      .input('checkboxData', sql.VarChar, checkboxData)
      .input('branch', sql.VarChar, branch)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating user', error });
  }
};



// Function to get a user by username
const getUserByUsername = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { username } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_cuser WHERE username = @username';
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query(selectQuery);

    if (result.recordset.length > 0) {
      res.status(200).json({ statusCode: 200, user: result.recordset[0],message:'User Created Successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching user', error });
  }
};


// Function to update a user by username
const updateUserByUsername = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { username } = req.params;
    const { password, branch, role, admin, master, transaction, tools, customercare, billing, mis, account } = req.body;

    const checkboxData = [
      admin ? 'Ad' : '',
      master ? 'Ma' : '',
      transaction ? 'Tr' : '',
      tools ? 'To' : '',
      customercare ? 'Cu' : '',
      billing ? 'Bi' : '',
      mis ? 'M.' : '',
      account ? 'Ac' : ''
    ].filter(Boolean).join('');

    const updateQuery = `
      UPDATE dbo.jbl_cuser
      SET pass = @password, utype = @role, urgt = @checkboxData, branch = @branch
      WHERE username = @username;
    `;
    const result = await pool.request()
      .input('password', sql.VarChar, password)
      .input('role', sql.VarChar, role)
      .input('checkboxData', sql.VarChar, checkboxData)
      .input('branch', sql.VarChar, branch)
      .input('username', sql.VarChar, username)
      .query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'User updated successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating user', error });
  }
};


// Function to delete a user by username
const deleteUserByUsername = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { username } = req.params;

    const deleteQuery = 'DELETE FROM dbo.jbl_cuser WHERE username = @username';
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'User deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting user', error });
  }
};

module.exports = { createUser,getUsers, getUserByUsername, updateUserByUsername, deleteUserByUsername };
