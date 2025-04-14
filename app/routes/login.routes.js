import express from 'express'
import { LoginController } from '../controllers/login.controller.js';

const router = express.Router()

router.post('/', LoginController)

router.get('/',(req, res) => {
    res.render('login.ejs')
})

export default router