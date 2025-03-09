import isURL from "validator/lib/isURL.js";

const BaseURL = "http://localhost:3000/url/"

let urls = new Map()

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const getRandomSlug = ()=>{
    const length = 5;
    let counter = 0;
    let randomSlug = "";
    while (counter <= length){
        randomSlug += characters.charAt(Math.floor(Math.random() * characters.length));
        counter += 1;
    }
    return randomSlug;
}


export const convertURL = (req, res)=>{
    const {url, slug} = req.body;

    if (!url || !isURL(url)){
        return res.status(400).json({ error: "Invalid URL format" });
    }

    if (!slug){
        let randomSlug = getRandomSlug();
        do{
            randomSlug = getRandomSlug();
        } while (urls.has(randomSlug))

        urls.set(randomSlug, url);
        return res.status(201).json({
            "message": "URL converted successfully",
            "shortURL": `${BaseURL}${randomSlug}`,
            "originalURL": url
            });
    } else {
        let userSlug = slug.replace(/\s+/g, '-').toLowerCase();
        if (!urls.has(userSlug)){
            urls.set(userSlug, url);
            return res.status(201).json({
                "message": "URL converted successfully",
                "shortURL": `${BaseURL}${userSlug}`,
                "originalURL": url
                });
            
        } else {
            return res.status(400).json({error: "Slug already in use"});
        }
    }
}

export const redirectURL = (req, res)=>{
    let slug = req.params.slug;
    if (urls.has(slug)){
        res.status(200).redirect(urls.get(slug))
    } else {
        res.status(404).json({error: `${slug} Not found`})
    }
    
}