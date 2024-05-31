const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    UID : {
        type : String,
    },
    Firstname: {
        type: String,
        required: true,
    },
    Lastname: {
        type: String,

    },
    Email: {
        type: String,
        required: true,
    },

    Password: {
        type: String,
        required: true,
    },

    PhoneNumber: {
        type: Number,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    AuthToken: {
        type: String
    },

    UserCreated: {
        type: String,
        default: new Date()
    },
    LastLogin: {
        type: String,
    }

},
    { timestamps: true }
)



const UsersModel = new mongoose.model("users", UserSchema);

module.exports = UsersModel