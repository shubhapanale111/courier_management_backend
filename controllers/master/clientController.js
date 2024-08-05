const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Create a new client
const createClient = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const {
      CLcode, Cltype, CLname, Cperson, Address, Street, City_NAME, Statename,
      Contactno, EmailID, gstno, branch, Fuel, fualair, amtadd, amtdisc, gmrchr,
      stax, Cnotedom, Cnoteair, daylimit, minwt, fov, riskcharge, clext,
      cftAir, cftroad, cfttrain, smail, sndsms, password, pincode
    } = req.body;

    const insertQuery = `
      INSERT INTO dbo.jbl_CLIENT (CLcode, Cltype, CLname, Cperson, Address, Street,
        City_NAME, Statename, Contactno, EmailID, gstno, branch, Fuel, fualair,
        amtadd, amtdisc, gmrchr, stax, Cnotedom, Cnoteair, daylimit, minwt, fov,
        riskcharge, clext, cftAir, cftroad, cfttrain, smail, sndsms, password, pincode)
      VALUES (
        @CLcode, @Cltype, UPPER(@CLname), UPPER(@Cperson), UPPER(@Address), UPPER(@Street),
        UPPER(@City_NAME), UPPER(@Statename), @Contactno, @EmailID, @gstno, UPPER(@branch),
        @Fuel, @fualair, @amtadd, @amtdisc, UPPER(@gmrchr), @stax, @Cnotedom, @Cnoteair,
        @daylimit, @minwt, @fov, @riskcharge, UPPER(@clext), @cftAir, @cftroad, @cfttrain,
        @smail, @sndsms, @password, UPPER(@pincode)
      );
    `;

    await pool.request()
      .input('CLcode', sql.VarChar, CLcode)
      .input('Cltype', sql.VarChar, Cltype)
      .input('CLname', sql.VarChar, CLname)
      .input('Cperson', sql.VarChar, Cperson)
      .input('Address', sql.VarChar, Address)
      .input('Street', sql.VarChar, Street)
      .input('City_NAME', sql.VarChar, City_NAME)
      .input('Statename', sql.VarChar, Statename)
      .input('Contactno', sql.VarChar, Contactno)
      .input('EmailID', sql.VarChar, EmailID)
      .input('gstno', sql.VarChar, gstno)
      .input('branch', sql.VarChar, branch)
      .input('Fuel', sql.Float, Fuel)
      .input('fualair', sql.Float, fualair)
      .input('amtadd', sql.Float, amtadd)
      .input('amtdisc', sql.Float, amtdisc)
      .input('gmrchr', sql.NVarChar, gmrchr)
      .input('stax', sql.Char, stax)
      .input('Cnotedom', sql.Float, Cnotedom)
      .input('Cnoteair', sql.Float, Cnoteair)
      .input('daylimit', sql.Int, daylimit)
      .input('minwt', sql.Float, minwt)
      .input('fov', sql.Float, fov)
      .input('riskcharge', sql.Float, riskcharge)
      .input('clext', sql.Char, clext)
      .input('cftAir', sql.Int, cftAir)
      .input('cftroad', sql.Int, cftroad)
      .input('cfttrain', sql.Int, cfttrain)
      .input('smail', sql.Char, smail)
      .input('sndsms', sql.Char, sndsms)
      .input('password', sql.VarChar, password)
      .input('pincode', sql.VarChar, pincode)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'Client created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating client', error });
  }
};

// Get all clients
const getClients = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT TOP (1000) * FROM dbo.jbl_CLIENT';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, clients: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error getting clients', error });
  }
};
const getClientPickupAddressData = async (req,res) =>{
  try {
    const pool = await connectDatabase();
    const selectQuery= 'select * from dbo.jbl_conpickupaddress';
    const result=await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, clientPickupAddress: result.recordset });
  }catch(error){
console.error(error);
res.status(500).json({ statusCode: 500, message: 'Error getting clients pickup address data', error });
  }
}
 
// Get a client by CLcode
const getClientByCLcode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { CLcode } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_CLIENT WHERE CLcode = @CLcode';
    const result = await pool.request()
      .input('CLcode', sql.VarChar, CLcode)
      .query(selectQuery);

    if (result.recordset.length > 0) {
      res.status(200).json({ statusCode: 200, client: result.recordset[0] });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Client not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching client', error });
  }
};

// Update a client by CLcode
const updateClientByCLcode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { CLcode } = req.params;
    const {
      Cltype, CLname, Cperson, Address, Street, City_NAME, Statename,
      Contactno, EmailID, gstno, branch, Fuel, fualair, amtadd, amtdisc, gmrchr,
      stax, Cnotedom, Cnoteair, daylimit, minwt, fov, riskcharge, clext,
      cftAir, cftroad, cfttrain, smail, sndsms, password, pincode
    } = req.body;

    const updateQuery = `
      UPDATE dbo.jbl_CLIENT
      SET Cltype = @Cltype, CLname = UPPER(@CLname), Cperson = UPPER(@Cperson), Address = UPPER(@Address),
          Street = UPPER(@Street), City_NAME = UPPER(@City_NAME), Statename = UPPER(@Statename),
          Contactno = @Contactno, EmailID = @EmailID, gstno = @gstno, branch = UPPER(@branch),
          Fuel = @Fuel, fualair = @fualair, amtadd = @amtadd, amtdisc = @amtdisc, gmrchr = UPPER(@gmrchr),
          stax = @stax, Cnotedom = @Cnotedom, Cnoteair = @Cnoteair, daylimit = @daylimit, minwt = @minwt,
          fov = @fov, riskcharge = @riskcharge, clext = UPPER(@clext), cftAir = @cftAir, cftroad = @cftroad,
          cfttrain = @cfttrain, smail = @smail, sndsms = @sndsms, password = @password, pincode = UPPER(@pincode)
      WHERE CLcode = @CLcode;
    `;

    const result = await pool.request()
      .input('CLcode', sql.VarChar, CLcode)
      .input('Cltype', sql.VarChar, Cltype)
      .input('CLname', sql.VarChar, CLname)
      .input('Cperson', sql.VarChar, Cperson)
      .input('Address', sql.VarChar, Address)
      .input('Street', sql.VarChar, Street)
      .input('City_NAME', sql.VarChar, City_NAME)
      .input('Statename', sql.VarChar, Statename)
      .input('Contactno', sql.VarChar, Contactno)
      .input('EmailID', sql.VarChar, EmailID)
      .input('gstno', sql.VarChar, gstno)
      .input('branch', sql.VarChar, branch)
      .input('Fuel', sql.Float, Fuel)
      .input('fualair', sql.Float, fualair)
      .input('amtadd', sql.Float, amtadd)
      .input('amtdisc', sql.Float, amtdisc)
      .input('gmrchr', sql.NVarChar, gmrchr)
      .input('stax', sql.Char, stax)
      .input('Cnotedom', sql.Float, Cnotedom)
      .input('Cnoteair', sql.Float, Cnoteair)
      .input('daylimit', sql.Int, daylimit)
      .input('minwt', sql.Float, minwt)
      .input('fov', sql.Float, fov)
      .input('riskcharge', sql.Float, riskcharge)
      .input('clext', sql.Char, clext)
      .input('cftAir', sql.Int, cftAir)
      .input('cftroad', sql.Int, cftroad)
      .input('cfttrain', sql.Int, cfttrain)
      .input('smail', sql.Char, smail)
      .input('sndsms', sql.Char, sndsms)
      .input('password', sql.VarChar, password)
      .input('pincode', sql.VarChar, pincode)
      .query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Client updated successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Client not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating client', error });
  }
};

// Delete a client by CLcode
const deleteClientByCLcode = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { CLcode } = req.params;

    const deleteQuery = 'DELETE FROM dbo.jbl_CLIENT WHERE CLcode = @CLcode';
    const result = await pool.request()
      .input('CLcode', sql.VarChar, CLcode)
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Client deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Client not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting client', error });
  }
};

module.exports = { createClient, getClients, getClientByCLcode, updateClientByCLcode, deleteClientByCLcode,getClientPickupAddressData };
