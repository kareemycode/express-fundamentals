export const userLogin = (req, res) => {
    res.send('This is User Login')
}

export const userSignup = (req, res) => {
    res.send('This is User Signup')
}

export const createUser = (req, res)=>{
    const { username, email } = req.body
    res.json({
        message: `${username} is created with ${email}`
    })
}

export const updateUser = (req,res) =>{
    const userID = req.params.id
    const {username, email} = req.body

    res.json({
        'message': `User ${userID} info updated to ${username} and ${email}`
    })
}

export const deleteUser = (req, res) => {
    const userID = req.params.id
    res.json({
        'message': `User with ID ${userID} has been deleted`
    })
}