import jwt from 'jsonwebtoken'

export const authenticateMiddleware = (req, res, next) => {
    if (req.session.userId) next();
    else if(req.headers.authorization){
        //remove bearer from authorization
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
            if (err) return res.sendStatus(403);
            next();
        });
    }
    else res.status(401).redirect('/zoom-app/login');
};
  