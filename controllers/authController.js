const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

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

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Save user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      msg: "User registered successfully",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    //  Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      msg: "Login successful",
      token,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
  try {
    //  Fetch user from DB (secure)
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};