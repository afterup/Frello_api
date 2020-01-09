const jwt = require('jsonwebtoken');

exports.required = (req, res, next) => {
    try{
        const token = req.headers.authorization.replace(/^Bearer\s/, '');
        req.payload = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    }catch(error) {
        if(error.name === 'TokenExpiredError') { // 유효시간 초과
            return res.status(419).json({
                error: {
                    body: '토큰이 만료되었습니다'
                }
            });
        }
        return res.status(401).json({
            error: {
                body: '유효하지 않은 토큰입니다.'
            }
        });
    }
};