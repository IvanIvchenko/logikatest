const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    role: { type: String, required: true },
    btn1: { type: Number, required: true },
    btn2: { type: Number, required: true },
    btn3: { type: Number, required: true },
    pressTime: { type: Date, required: true}
});


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = User = mongoose.model('User', schema);


