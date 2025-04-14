import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const LoginController = async(req, res) => {
    console.log(req.body)
    const userName = req.body.userName
    const password = req.body.password
    const user = await User.exists({userName : userName}).exec();
    if(!user){
        return res.status(401).redirect('/zoom-app/login');
    }
    await User.findOne({userName : userName}).then(user => {
        if(bcrypt.compareSync(password, user.password)){
            req.session.userId = user._id.toString();
            return res.status(200).redirect('/zoom-app');
        }
        else{
            return res.status(401).redirect('/zoom-app/login');
        }
    }).catch(err => console.log(err))
}