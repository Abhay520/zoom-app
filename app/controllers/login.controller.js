import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const LoginController = async(req, res) => {
    const userName = req.body.userName
    const password = req.body.password
    const user = await User.exists({userName : userName}).exec();
    if(!user){
        return res.status(401).redirect('/zoom-app/login');
    }
    await User.findOne({userName : userName}).then(user => {
        if(bcrypt.compareSync(password, user.password)){
            req.session.regenerate(function (err) {
                if (err) next(err)

                req.session.userId = user._id.toString();

                const token = jwt.sign({ id: user._id, username: userName }, 
                    process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

                // save the session before redirection to ensure page
                // load does not happen before session is saved
                req.session.save(function (err) {
                    if (err) return next(err)
                    return res.status(200).redirect('/zoom-app/?token=' + token);
                })
            })
        }
        else{
            return res.status(401).redirect('/zoom-app/login');
        }
    }).catch(err => console.log(err))
}