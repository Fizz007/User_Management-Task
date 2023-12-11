const express = require('express');
const verify = require('../middleware/verifyToken')

const router = express.Router();

const {createVillage,deleteVillage,getVillage,getVillages,updateVillage} = require('../controller/villageController')

router.post('/',verify, createVillage)
router.get('/',verify, getVillages)
router.get('/:id',verify, getVillage)
router.delete('/:id',verify, deleteVillage)
router.patch('/:id',verify, updateVillage)

module.exports = router;