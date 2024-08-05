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
    createGst, getModes, getClient
  }= require('../controllers/master/gstController');
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
  deleteStateByName
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

const { createStatus, getStatuses, getStatusBySta, updateStatusBySta, deleteStatusBySta } = require('../controllers/master/statusController');
const {
  createParcelItem,
  getParcelItems,
  getParcelItemByName,
  updateParcelItemByName,
  deleteParcelItemByName
} = require('../controllers/master/communityController');
const {
  createPickup,
  getPickups,
  getPickupByCode,
  updatePickupByCode,
  deletePickupByCode
} = require('../controllers/master/pickupController');

const {
  createService,
  getServices,
  getServiceByBmode,
  updateServiceByBmode,
  deleteServiceByBmode
} = require('../controllers/master/serviceController');

const {
  createClient, getClients, getClientByCLcode, updateClientByCLcode, deleteClientByCLcode, getClientPickupAddressData
} = require('../controllers/master/clientController');

// Routes for statuses
router.get('/statuses', getStatuses);
router.post('/statuses', createStatus);
router.get('/statuses/:sta', getStatusBySta);
router.put('/statuses/:sta', updateStatusBySta);
router.delete('/statuses/:sta', deleteStatusBySta);
 
  
// Routes for parcel items
router.post('/parcelItems', createParcelItem);
router.get('/parcelItems', getParcelItems);
router.get('/parcelItems/:parcelItem', getParcelItemByName);
router.put('/parcelItems/:parcelItem', updateParcelItemByName);
router.delete('/parcelItems/:parcelItem', deleteParcelItemByName);

// Route to create a new user
router.post('/create', createUser);
router.get('/users',getUsers);
router.get('/users/:username', getUserByUsername);
router.put('/users/:username', updateUserByUsername);
router.delete('/users/:username', deleteUserByUsername);
router.post('/login',loginUser);


// Routes for pickups
router.post('/pickups', createPickup); 
router.get('/pickups', getPickups); 
router.get('/pickups/:pcode', getPickupByCode); 
router.put('/pickups/:pcode', updatePickupByCode); 
router.delete('/pickups/:pcode', deletePickupByCode);

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
router.post('/states/delete', deleteStateByName);

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

// admin

router.get('/company-info',companyInfo);
router.put('/company-info',updateCompanyInfo);


router.get('/modes', getModes);
router.post('/gsts',createGst);
router.get('/client',getClient);


router.post('/services', createService);
router.get('/services', getServices);
router.get('/services/:bmode', getServiceByBmode);
router.put('/services/:bmode', updateServiceByBmode);
router.delete('/services/:bmode', deleteServiceByBmode);


//client master 

router.get('/clients',getClients);
router.get('/client-pickup-data',getClientPickupAddressData);

module.exports = router;
