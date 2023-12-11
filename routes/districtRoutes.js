const express = require('express');
const verify = require('../middleware/verifyToken')

const router = express.Router();

const {createDistrict,deleteDistrict,getDistrict,getDistricts,updateDistrict} = require('../controller/districtController')

router.post('/',verify, createDistrict)
router.get('/',verify, getDistricts)
router.get('/:id',verify, getDistrict)
router.delete('/:id',verify, deleteDistrict)
router.patch('/:id',verify, updateDistrict)

module.exports = router;