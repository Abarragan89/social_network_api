const router = require('express').Router();
const {
    addUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controllers')


router.route('/')
    .post(addUser)
    .get(getUsers);
router.route('/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);
router.route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend);

module.exports = router; 