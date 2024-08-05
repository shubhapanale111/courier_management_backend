const express = require('express');
const { createUser,getUsers,getUserByUsername,updateUserByUsername,deleteUserByUsername } = require('../controllers/userController');
const {loginUser}=require('../controllers/authController')
const {companyInfo, updateCompanyInfo}=require('../controllers/admin/companyInfo')
const router = express.Router();
const {
    createZone,
    getZones,
    getZoneByZcode,
    updateZoneByZcode,
    deleteZoneByZcode
  } = require('../controllers/master/zoneController');
  const {
    createCountry,
    getCountries,
    getCountryByName,
    updateCountryByName,
    deleteCountryByName
} = require('../controllers/master/countryController');

const {
  createPincode,
  getPincodes,
  getPincodeByPincode,
  updatePincodeByPincode,
  deletePincodeByPincode
} = require('../controllers/master/pincodeController');

const {
  createCity,
  getCities,
  getCityByCode,
  updateCityByCode,
  deleteCityByCode
} = require('../controllers/master/cityController');

const {
  createState,
  getStates,
  getStateById,
  updateStateById,
  deleteStateById
} = require('../controllers/master/stateController');

const {
  createBranch,
  getBranches,
  getBranchByName,
  updateBranchByName,
  deleteBranchByName
} = require('../controllers/master/branchController');

const {
  createForwarder, getForwarders, getForwarderByCode, updateForwarderByCode, deleteForwarderByCode
} = require('../controllers/master/forwarderController');

const {
  createPickup,
  getPickups,
  getPickupByCode,
  updatePickupByCode,
  deletePickupByCode
} = require('../controllers/master/pickupController');

const { createStatus, getStatuses, getStatusBySta, updateStatusBySta, deleteStatusBySta } = require('../controllers/master/statusController');

const {
  createService,
  getServices,
  getServiceByBmode,
  updateServiceByBmode,
  deleteServiceByBmode
} = require('../controllers/master/serviceController');

const { createGst, getGsts, getGstByClcode, updateGstByClcode, deleteGstByClcode } = require('../controllers/master/gstController');

const {
  createClient,
  getClients,
  getClientByCLcode,
  updateClientByCLcode,
  deleteClientByCLcode
} = require('../controllers/master/clientController');  

// Route to create a new user
router.post('/create', createUser);
router.get('/users',getUsers);
router.get('/users/:username', getUserByUsername);
router.put('/users/:username', updateUserByUsername);
router.delete('/users/:username', deleteUserByUsername);
router.post('/login',loginUser);

// Routes to create  a zone
router.get('/zones', getZones);
router.post('/zones', createZone);
router.get('/zones/:zcode', getZoneByZcode);
router.put('/zones/:zcode', updateZoneByZcode);
router.delete('/zones/:zcode', deleteZoneByZcode);

//Routes for countries
router.get('/countries', getCountries);
router.post('/countries', createCountry);
router.get('/countries/:Country_Name', getCountryByName); // Endpoint to get by Country_Name
router.put('/countries/:Country_Name', updateCountryByName); // Endpoint to update by Country_Name
router.delete('/countries/:Country_Name', deleteCountryByName); // Endpoint to delete by Country_Name

// Pincode routes
router.get('/pincodes', getPincodes);
router.post('/pincodes', createPincode);
router.get('/pincodes/:pincode', getPincodeByPincode);
router.put('/pincodes/:pincode', updatePincodeByPincode);
router.delete('/pincodes/:pincode', deletePincodeByPincode);

// Routes for cities
router.post('/cities', createCity);
router.get('/cities', getCities);
router.get('/cities/:CITYCODE', getCityByCode);
router.put('/cities/:CITYCODE', updateCityByCode);
router.delete('/cities/:CITYCODE', deleteCityByCode);

// Routes for states
router.get('/states', getStates);
router.post('/states', createState);
router.get('/states/:id', getStateById);
router.put('/states/:id', updateStateById);
router.delete('/states/:id', deleteStateById);

// Routes for branches
router.post('/branches', createBranch); 
router.get('/branches', getBranches); 
router.get('/branches/:bname', getBranchByName); 
router.put('/branches/:bname', updateBranchByName); 
router.delete('/branches/:bname', deleteBranchByName); 

// Forwarder routes
router.get('/forwarders', getForwarders);
router.post('/forwarders', createForwarder);
router.get('/forwarders/:FWDcode', getForwarderByCode);
router.put('/forwarders/:FWDcode', updateForwarderByCode);
router.delete('/forwarders/:FWDcode', deleteForwarderByCode);

// Routes for pickups
router.post('/pickups', createPickup); // Create a new pickup record
router.get('/pickups', getPickups); // Get all pickups
router.get('/pickups/:pcode', getPickupByCode); // Get a pickup record by pcode
router.put('/pickups/:pcode', updatePickupByCode); // Update a pickup record by pcode
router.delete('/pickups/:pcode', deletePickupByCode); // Delete a pickup record by pcode

// Routes for statuses
router.get('/statuses', getStatuses);
router.post('/statuses', createStatus);
router.get('/statuses/:sta', getStatusBySta);
router.put('/statuses/:sta', updateStatusBySta);
router.delete('/statuses/:sta', deleteStatusBySta);


// Route to create a new service
router.post('/services', createService);
router.get('/services', getServices);
router.get('/services/:bmode', getServiceByBmode);
router.put('/services/:bmode', updateServiceByBmode);
router.delete('/services/:bmode', deleteServiceByBmode);

// Route to create a new GST entry
router.post('/gsts', createGst);
router.get('/gsts', getGsts);
router.get('/gsts/clcode/:Clcode', getGstByClcode);
router.put('/gsts/clcode/:Clcode', updateGstByClcode);
router.delete('/gsts/clcode/:Clcode', deleteGstByClcode);

// Route to create a new client
router.post('/clients', createClient);
router.get('/clients', getClients);
router.get('/clients/:CLcode', getClientByCLcode);
router.put('/clients/:CLcode', updateClientByCLcode);
router.delete('/clients/:CLcode', deleteClientByCLcode);


// admin

router.get('/company-info',companyInfo);
router.put('/company-info',updateCompanyInfo);

module.exports = router;
