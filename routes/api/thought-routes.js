const router = require('express').Router();

const { addThought,
        getThoughts,
        getThought,
        deleteThought,
        updateThought,
        addReaction, 
        deleteReaction
    } = require('../../controllers/thought-controllers');

router.route('/:userId')
    .post(addThought)

router.route('/:thoughtId')
    .get(getThought)
    .delete(deleteThought)
    .put(updateThought);

router.route('/')
    .get(getThoughts)

router.route('/:thoughtId/reactions')
    .put(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction) 


module.exports = router;