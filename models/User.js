const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        email: { type: String, required: [true, 'email is required'], unique: ['email in use'] },
        password: { type: String, required: [true, 'password is required'] }
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    console.log(this.password);
    try {

        const hash = await bcrypt(this.password, 10);
        console.log(hash)
    } catch (e) {
        throw Error('could not hash password');
    }
    const hashedPassword = bcrypt.hash()
})

module.exports = mongoose.model("User", userSchema);
