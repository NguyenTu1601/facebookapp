const {
    validateEmail,
    validateLength,
    validateUsername,
} = require("../helpers/validation");

const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.register = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password,
            username,
            bYear,
            bMonth,
            bDay,
            gender,
        } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({ message: "invalid email address" });
        }

        const check = await User.findOne({ email });
        if (check) {
            return res.status(400).json({
                message:
                    "the email address exists, try with different email address",
            });
        }

        if (!validateLength(first_name, 3, 30)) {
            return res.status(400).json({
                message: "first_name must between 1 and 30 characters.",
            });
        }
        if (!validateLength(last_name, 3, 30)) {
            return res.status(400).json({
                message: "last_name must between 1 and 30 characters.",
            });
        }
        if (!validateLength(password, 6, 20)) {
            return res.status(400).json({
                message: "password must between 6 and 20 characters.",
            });
        }

        const cryptedPassword = await bcrypt.hash(password, 12);

        let tempUsername = first_name + last_name;

        let newUsername = await validateUsername(tempUsername);
        console.log("2");
        const user = await new User({
            first_name,
            last_name,
            email,
            password: cryptedPassword,
            username: newUsername,
            bYear,
            bMonth,
            bDay,
            gender,
        }).save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
