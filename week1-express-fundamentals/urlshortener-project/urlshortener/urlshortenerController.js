import isURL from "validator/lib/isURL.js";

const BaseURL = `http://localhost:3000/url/`

let users = {}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const getUserURLs = (req, res) =>{
    const username = req.params.username

    if (users[username]){
        return res.status(200).json(users[username])
    } else {
        return res.status(404).json({error: 'user not found'})
    }
}

const getRandomSlug = ()=>{
    const length = 9;
    let counter = 0;
    let randomSlug = "";
    while (counter <= length){
        randomSlug += characters.charAt(Math.floor(Math.random() * characters.length));
        counter += 1;
    }
    return randomSlug.toLowerCase();
}


export const convertURL = (req, res)=>{
    const {url, slug} = req.body;
    let username = req.params.username;
    let usernameIsValid = /^[A-Za-z]+$/.test(username);    


    if(!usernameIsValid){
        return res.status(400).json({error: 'Enter a valid username'});
    }

    // creates a new user if the user doesn't exist
    if (!users[username]) users[username] = []

    //checks the length of the costume slug
    if (String(slug).length <= 10){

        //validates the url
        if (!url || !isURL(url)){
            return res.status(400).json({ error: "Invalid URL format" });
        }
        
        //checks if the user entered a slug
        if (!slug){

            //if the user didn't enter a slug a random slug will be generated
            let randomSlug = getRandomSlug();
            do{
                randomSlug = getRandomSlug();
                users[username].push({
                    'slug': randomSlug,
                    'url': url
                });
            } while (!users[username].some(item => item['slug'] == randomSlug));

            return res.status(201).json({
                "message": "URL converted successfully",
                "shortURL": `${BaseURL}${username}/${randomSlug}`,
                "originalURL": url
                });

        } else {

            // convert the slug with spaces and high cases into lower cases separated by (-)
            let userSlug = slug.replace(/\s+/g, '-').toLowerCase();

            //check if the slug is already in use by the user
            if (!users[username].some(item => item['slug'] == slug)){
                users[username].push({
                    'slug': slug,
                    'url': url
                });

                return res.status(201).json({
                    "message": "URL converted successfully",
                    "shortURL": `${BaseURL}${username}/${userSlug}`,
                    "originalURL": url
                    });
                
            } else {
                return res.status(400).json({error: "Slug already in use"});
            }
        }
    } else {
        return res.status(400).json({error: "Slug has more than 10 character"});
    }
}

export const redirectURL = (req, res)=>{
    let username = req.params.username;
    let slug = req.params.slug;
    slug = slug.replace(/\s+/g, '-').toLowerCase()
    
    if (users[username]){

        if (users[username].some(item => item['slug'] == slug)){
            // Find the object containing the slug
            const urlObject = users[username].find(item => item['slug'] == slug);
            // Get the URL value from the object
            const url = urlObject["url"];
            res.status(200).redirect(url)
        } else {
            res.status(404).json({error: `${slug} Not found`})
        }
    } else{
        res.status(404).json({error: `${username} Not found`})
    }
   
}