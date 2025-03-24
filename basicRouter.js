import express from 'express';
import { userLogin, userSignup, createUser, updateUser, deleteUser } from './basicController.js';

const router = express.Router()

router.get('/', (req, res)=>{
    res.send("Welcome Users")
})

router.get('/signup', userSignup)

router.get('/login', userLogin)

router.post('/', createUser)

router.put('/:id',updateUser)

router.delete('/:id', deleteUser)

export default router