const express = require('express')

const router = express.Router();

const assignLocation = require('../controller/locationController');
const verify  = require('../middleware/verifyToken');

router.post('/',verify, assignLocation)

module.exports = router;