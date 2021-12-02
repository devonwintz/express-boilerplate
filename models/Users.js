const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    permissionLevel: {
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model("Users", UserSchema);

/*
    This creates a collection in your monogodb with the name 'Users'
*/