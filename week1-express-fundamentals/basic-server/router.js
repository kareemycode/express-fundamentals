import express from 'express';
import { userLogin, userSignup } from './controller.js';

const router = express.Router()

router.get('/', (req, res)=>{
    res.send("Welcome Users")
})

router.get('/signup', userSignup)

router.get('/login', userLogin)

export default router