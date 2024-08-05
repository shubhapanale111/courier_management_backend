const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const masterRoutes = require('./routes/masterRoutes');
const { connectDatabase } = require('./config/dbconfig');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Establish database connection once
connectDatabase()
  .then(() => {
    console.log('Database connected successfully');

    // Routes
    app.use(userRoutes);
    app.use(masterRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  });
