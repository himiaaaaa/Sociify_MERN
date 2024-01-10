import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [ true, "First name is required!" ]
    },
    lastName: {
        type: String,
        required: [ true, "Last name is required!" ]
    },
    email: {
        type: String,
        requirqed: [true, "Email is required!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: [6, "Password length should be greater than 6 character"],
        select: true
    },
    location: {
        type: String
    },
    profileUrl: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    profession: {
        type: String
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],
    views:[{
        type: String
    }],
    verified: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

const Users = mongoose.model("Users", userSchema)

export default Users;