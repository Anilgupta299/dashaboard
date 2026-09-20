const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
	const authorization = req.headers.authorization;
	const token = authorization?.startsWith("Bearer ")
		? authorization.slice(7)
		: null;

	if (!token) {
		return res.status(401).json({ success: false, message: "Authentication required" });
	}

	try {
		req.user = jwt.verify(token, process.env.JWT_SECRET);
		next();
	} catch {
		return res.status(401).json({ success: false, message: "Invalid or expired token" });
	}
}

module.exports = authenticateToken;
