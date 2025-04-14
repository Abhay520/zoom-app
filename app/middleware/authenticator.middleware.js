export const authenticateMiddleware = (req, res, next) => {
    if (req.session.userId) next();
    else res.status(401).redirect('/zoom-app/login');
};
  