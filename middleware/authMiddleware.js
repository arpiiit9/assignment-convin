// middleware/authMiddleware.js
import { verifyToken } from '../utils/jwt.js';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token provided

  try {
    const user = verifyToken(token);
    req.user = user; // Attach user to request
    next();
  } catch (error) {
    res.sendStatus(403); // Invalid token
  }
};
