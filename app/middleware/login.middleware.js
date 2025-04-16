export const loginMiddleware = (req, res, next) => {
    if(req.body){
        if (req.body.userName && req.body.password) return next()
    }
    return res.status(401).redirect('/zoom-app/login');
};