import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ 
            success: false,
            message: 'No token provided, authorization denied' 
        });
    }

    // Extract token from Bearer format
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ 
            success: false,
            message: 'Token is not valid' 
        });
    }
}

const userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ success: false, message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'user')
      return res.status(403).json({ success: false, message: 'Forbidden' });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};



// Middleware to check if user is admin
const adminAuth = (req, res, next) => {
    if (req.user.role === 'admin' || req.user.email === process.env.ADMIN_EMAIL) {
        next();
    } else {
        return res.status(403).json({ 
            success: false,
            message: 'Access denied. Admin privileges required.' 
        });
    }
}

export default auth;
export { userAuth, adminAuth };