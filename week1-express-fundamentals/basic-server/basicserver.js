import express from 'express'
import router from './router.js';

const app = express();
const PORT = 3000;

app.get('/', (req, res)=>{
    res.send('Hello Kareemy');
})

app.use('/user', router)

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
