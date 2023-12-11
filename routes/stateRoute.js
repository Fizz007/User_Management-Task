const express = require('express');
const verify = require('../middleware/verifyToken')

const router = express.Router();

const {createState,deleteState,getState,getStates,updateState} = require('../controller/stateController')

router.post('/',verify, createState)
router.get('/',verify, getStates)
router.get('/:id',verify, getState)
router.delete('/:id',verify, deleteState)
router.patch('/:id',verify, updateState)

module.exports = router;