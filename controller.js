export const usernameController = (req, res)=>{
    const username = req.params.username
    res.send(`Hello ${username}`)
}