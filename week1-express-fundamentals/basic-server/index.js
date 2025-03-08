import express from 'express'
import { usernameController } from './controller.js';

const app = express();
const PORT = 3000;

app.get('/', (req, res)=>{
    res.send('Hello Kareemy');
})

app.get('/user/:username', usernameController)

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})