const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]

    },
    {
        toJSON: {
            virtuals: true
        }
    }
)
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});


/// Working on making thoughts delete when user is deleted. 
// UserSchema.pre('remove', async function(next) {
//     try {
//         await Thought.remove({
//             "_id": {
//                 $in: this.thoughts
//             }
//         });
//         next();
//     } catch(err) {
//         next(err)
//     }
// })
// UserSchema.pre('remove', function(next) {
//     // 'this' is the client being removed. Provide callbacks here if you want
//     // to be notified of the calls' result.
//     Thought.updateMany(
//         {}
//     )
//     next();
// });
const User = model('User', UserSchema)
module.exports = User;
