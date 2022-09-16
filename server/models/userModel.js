const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: ['true', 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,

    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please confirm password'],
        validate: {
            //This only works on Create and Save!!!
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'

        }
    },

    passwordChangedAt: Date,
    role: {
        type: String,
        enum: ['user', 'admin', 'room-admin'],
        default: 'user'
    }

});


userSchema.pre('save', async function(next) {
    //Only run this function if password was actually modified
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12);

    //delete passwordConfirm field
    this.passwordConfirm = undefined;
    next()


})

userSchema.pre('save', async function(next) {
    //default profile picture
    if (!this.photo) {
        this.photo = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
    }
    next()
})





userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    //false means not changed
    return false;
}



const User = mongoose.model('User', userSchema);
module.exports = User;