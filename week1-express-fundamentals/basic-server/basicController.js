export const userLogin = (req, res) => {
    res.send('This is User Login')
}

export const userSignup = (req, res) => {
    res.send('This is User Signup')
}

export const createUser = (req, res)=>{
    const { username, email } = req.params
    res.json({
        message: `${username} is created with ${email}`
    })
}