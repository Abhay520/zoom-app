import express from 'express'
import LoginController  from '../controllers/login.controller.js';
import { loginMiddleware } from '../middleware/login.middleware.js';

const router = express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userName
 *         - password
 *       properties:
 *         userName:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         userName: test
 *         password : test
 */

/**
 * @swagger
 * /login/api:
 *   post:
 *     summary: Login as a user to get auth token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The api authentication token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       429:
 *         description: Too many api requests (slow down)
 *       500:
 *         description: Some server error
 *
 */
router.post('/', loginMiddleware, LoginController.loginWebsite)

router.post('/api', loginMiddleware, LoginController.loginApi)

router.get('/',(req, res) => {
    res.render('login.ejs')
})

export default router