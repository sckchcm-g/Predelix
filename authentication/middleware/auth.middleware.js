const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                message: 'Authentication required' 
            });
        }

        const decoded = jwt.verify(
            token, 
            process.env.JWT_ACCESS_SECRET || 'your-access-secret-key'
        );
        
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ 
            message: 'Invalid token',
            error: error.message 
        });
    }
};

module.exports = authMiddleware;
