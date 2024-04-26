const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../../resolvers/users/index');

const router = express.Router();

//router.post('/', (req, res)=>{
//    console.log(req.body)
//});
//router.get('/', (req, res) => { 
//    return res.send('User Data');
//});

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
