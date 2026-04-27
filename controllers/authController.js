const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    //  Validation
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    //  Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    //  Save user
    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyPattern || err.keyValue || {})[0] || "field";
      return res.status(400).json({
        error: `${duplicateField} already exists`,
      });
    }

    res.status(500).json({ error: err.message });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const { password } = req.body;

    //  Validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    //  Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    //  Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    //  Generate token
    const token = createToken(user);

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      msg: "Profile fetched successfully",
      user,
      tokenData: req.user,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
