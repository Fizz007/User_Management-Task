const express = require('express')
const verify = require('../middleware/verifyToken')

const router = express.Router();

const {signInUser,signUpUser,deleteUser,updateUser,roleAssignee,getAllUsers} = require('../controller/userController')

router.post('/signup', signUpUser)
router.post('/roleassigne',verify,roleAssignee)
router.post('/signin', signInUser)
router.get('/getall',verify, getAllUsers)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router;