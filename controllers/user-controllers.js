const { User, Thought } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find()
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(userData => {
                res.json(userData)
            })
            .catch(err => {
                console.log(err)
            })
    },
    getUser({ params }, res) {
        User.findById({ _id: params.userId })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this ID!'});
                    return;
                }
                res.json(userData)
            })
            .catch(err => res.status(400).json(err))
            
    },
    addUser( { body }, res ) {
        User.create(body)
            .then(userData => {
                res.json(userData)
            })
            .catch(err => {
                console.log(err)
            })
    },
    updateUser({ params, body }, res) {
        User.findByIdAndUpdate({ _id: params.userId}, body, { new:true, runValidators: true })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user with that ID!'})
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err))
    },
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.userId },
            {$addToSet: { friends: params.friendId }},
            {new: true}
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with that ID'});
                return;
            }
            res.json(userData)
        })
        .catch(err => {
            res.status(400).json(error)
        })
    },
    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.userId },
            {$pull: { friends: params.friendId }},
            {new: true}
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with that ID'});
                return
            }
            res.json(userData)
        })
        .catch(err => {
            res.status(400).json(error)
        })
    },
    deleteUser({ params }, res) {
        User.findByIdAndDelete({ _id: params.userId })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found with that ID.'});
                    return;
                }
                return Thought.deleteMany({ _id: { $in: userData.thoughts } });
            })
            .then(() => {
                res.json({ message: 'User and thoughts deleted.'});
            })
            .catch(err => {
                res.status(500).json(err)
            });
    }
};

module.exports = userController;