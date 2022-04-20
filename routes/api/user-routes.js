const router = require('express').Router();
const {
    addUser,
    getUsers,
    getUser,
    updateUser,
} = require('../../controllers/user-controllers')


router.route('/')
    .post(addUser)
    .get(getUsers);
router.route('/:userId')
    .get(getUser)
    .put(updateUser);


module.exports = router; 