const { User, Thought } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find()
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
                    res.status(404).json({ message: 'No user found with this ID!'})
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
    }
};

module.exports = userController;