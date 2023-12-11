const express = require('express')
const verify = require('../middleware/verifyToken')

const router = express.Router();

const createForm = require('../controller/householdController');

router.post('/',verify, createForm)

module.exports = router;