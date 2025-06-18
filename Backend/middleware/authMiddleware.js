const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ 
    if (!token) {
    console.log("❌ No token found in cookies");
    return res.status(401).json({ message: 'Unauthorized: No token' });
}

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    const user = await userModel.findOne({ email: decoded.email });

    if (!user) return res.status(401).json({ message: 'Unauthorized: User not found' });

    req.user = { id: user._id, email: user.email }; // ✅
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
