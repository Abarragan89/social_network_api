const { Thought, User } = require('../models');

const thoughtControllers = {
    addThought({params, body}, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No pizza found with this ID.'});
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                res.json(err)
            })
    },
    getThoughts(req, res) {
        Thought.find()
        .then(thoughtData => {
            res.json(thoughtData)
        })
    },
    getThought({ params }, res) {
        Thought.findById(
            { _id: params.thoughtId },
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with that ID.'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    },
    deleteThought({ params }, res) {
        Thought.findByIdAndDelete(
            { _id: params.thoughtId }
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with that ID.'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    },
    updateThought({params, body}, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId }, 
            body,
            { new: true, runValidators: true}
        )
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought found with that Id.'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            res.status(400).json(err)
        }); 
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: {reactions: body}},
            { new: true, runValidators: true }
        )
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought found with that Id.'});
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => {
            res.status(400).json(err);
        })
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: { reactions: {reactionId: params.reactionId} }},
            { new: true, runValidators: true }
        )
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought found with that Id.'});
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => {
            res.status(400).json(err);
        })
    },
}

module.exports = thoughtControllers;