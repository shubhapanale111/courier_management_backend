const express=require('express');
const masterRouter = express.Router();
const {
    createZone,
    getZones,
    getZoneByZcode,
    updateZoneByZcode,
    deleteZoneByZcode
  } = require('../controllers/master/zoneController');

  // Routes to create  a zone
  masterRouter.get('/zones', getZones);
  masterRouter.post('/zones', createZone);
  masterRouter.get('/zones/:zcode', getZoneByZcode);
  masterRouter.put('/zones/:zcode', updateZoneByZcode);
  masterRouter.delete('/zones/:zcode', deleteZoneByZcode);

module.exports = masterRouter;