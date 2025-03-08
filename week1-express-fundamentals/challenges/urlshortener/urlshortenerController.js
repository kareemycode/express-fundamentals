const urls = new Map()

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
    if (!req.body.slug){
        let randomSlug = getRandomSlug();
        console.log(randomSlug);
        urls.set(randomSlug, req.body.url);
        res.send(`Url converted successfully
            Your new URL is http://localhost:3000/url/${randomSlug}
            `);
    } else {
        if (urls.has(req.body.slug)){
            res.status(400).send("Slug already in use");
        } else {
            let userSlug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
            urls.set(userSlug, req.body.url);
            res.send(`Url converted successfully
                Your new URL is http://localhost:3000/url/${userSlug}
                `);
        }
    }
}

export const redirectURL = (req, res)=>{
    let slug = req.params.slug;
    if (urls.has(slug)){
        res.status(200).redirect(urls.get(slug))
    } else {
        res.status(400).send(`${slug} Not found, please enter a valid slug`)
    }
    
}