import express from 'express'
import router from './basicRouter.js';

const app = express();
const PORT = 3000;

app.use(express.json())

app.get('/', (req, res)=>{
    res.json({message: 'Hello Kareemy'});
})

app.use('/users', router)

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
