## Controller Files

- Controller.js file
    - The file where we put our handler functions, the functions that is in the api requests
    - For example if we make the following
    
    ```jsx
    app.get('/user', usernameController)
    
    ```
    
    - Here usernameController will be in controller.js
    - See the following content of controller.js example
    
    ```jsx
    export const usernameController = (req, res) => {
      //normal function logic
      res.send('Hello User')
    }
    
    ```
    
    - In the main file, we will import the exported functions
    
    ```jsx
    import { usernameController } from './controller.js';
    
    ```
    
    - Note: Don't forget to add (.js) while importing
    - In real projects, we group controller functions by resource or feature. For example:
        - `userController.js` - All user-related operations
        - `productController.js` - All product-related operations

## Router Files

- Router.js file
    - The file where we organize our routes in a modular way
    - Example of router.js
    
    ```jsx
    import express from 'express'
    import { usernameController, searchController } from '../controllers/userController.js'
    
    const router = express.Router()
    
    router.get('/login', usernameController)
    router.get('/search', searchController)
    
    export default router
    
    ```
    
    - We import the controller functions from the controller files
    - In the main file, we use the router like this
    
    ```jsx
    import express from 'express'
    import userRoutes from './routes/userRoutes.js'
    
    const app = express()
    
    // Mount the router with a prefix
    app.use('/user', userRoutes)
    
    app.listen(3000, () => {
      console.log('Server running on port 3000')
    })
    
    ```
    
    - With this setup, our URLs would be:
        - `http://localhost:3000/user/login` → Handled by usernameController
        - `http://localhost:3000/user/search` → Handled by searchController

## Project Structure with router and controller

- Best practice structure

```
Copy
project/
├── app.js                     # Main application file
├── controllers/               # Handler functions
│   ├── userController.js
│   ├── productController.js
│   └── authController.js
├── routes/                    # Router files
│   ├── userRoutes.js
│   ├── productRoutes.js
│   └── authRoutes.js

```

## Benefits

- Organization - Each router handles a specific feature
- Maintainability - Easier to update related routes
- Scalability - New developers can understand the code quickly
- Reusability - Can reuse routers in different applications
- Testing - Easier to test routes in isolation

## URL Shortener Code Improvements

### URL Validation

- **Problem:** Original code had no validation for URL format
- **Fix:** Added URL validation using `isURL` from validator library
- **Benefit:** Prevents invalid URLs from being added to the system

```jsx
// Added validation
if (!url || !isURL(url)){
    return res.status(400).json({ error: "Invalid URL format" });
}

```

### Response Format

- **Problem:** Inconsistent plain text responses
- **Fix:** Used consistent JSON format for all responses
- **Benefit:** Makes API easier to consume by clients, follows REST conventions

```jsx
// Changed from plain text:
res.send(`Url converted successfully...`);

// To structured JSON:
return res.status(201).json({
    "message": "URL converted successfully",
    "shortURL": `${BaseURL}${randomSlug}`,
    "originalURL": url
});

```

### Status Codes

- **Problem:** Incorrect or missing HTTP status codes
- **Fix:** Used appropriate status codes (201 for created, 404 for not found)
- **Benefit:** Follows HTTP standards, helps clients understand response meaning

### Collision Handling

- **Problem:** No handling for duplicate random slugs
- **Fix:** Added retry loop for generating unique slugs
- **Benefit:** Prevents overwriting existing URLs with same slug

```jsx
// Added collision avoidance
do {
    randomSlug = getRandomSlug();
} while (urls.has(randomSlug))

```

### Code Structure

- **Problem:** Nested if/else statements, direct property access
- **Fix:** Used early returns and object destructuring
- **Benefit:** Code is more readable and maintainable

```jsx
// Added object destructuring
const {url, slug} = req.body;

// Used early returns for cleaner flow
if (!url || !isURL(url)){
    return res.status(400).json({ error: "Invalid URL format" });
}

```

### Configuration

- **Problem:** Hardcoded base URL throughout code
- **Fix:** Extracted to a constant variable
- **Benefit:** Easier to change across the application

```jsx
// Added configuration constant
const BaseURL = "http://localhost:3000/url/"

```

### Error Handling

- **Problem:** Inconsistent error messages, wrong status codes
- **Fix:** Standardized error format, used proper status code (404 for not found)
- **Benefit:** Better developer experience, follows REST API conventions

```jsx
// Improved error responses
res.status(404).json({error: `${slug} Not found`})

```

## Week 1 Project brief

### Project Overview

You've built a fully functional URL shortener service with user accounts, custom slugs, and proper routing structure. Your implementation demonstrates solid understanding of Express.js fundamentals.

### Core Components Implemented

### 1. Express Application Setup

- Created a properly structured Express application
- Set up middleware for JSON parsing
- Implemented server initialization and port configuration

### 2. Modular Routing

- Created dedicated router files for different features
- Used Express Router to organize endpoints
- Implemented route parameter handling

### 3. Controller Logic

- Separated route handlers into controller functions
- Implemented proper request/response flow
- Used appropriate HTTP status codes (201, 400, 404)

### 4. Data Validation

- Added URL format validation using isURL
- Implemented username validation with regex
- Added slug length and format constraints
- Created proper error handling with descriptive messages

### 5. Hierarchical Resources

- Implemented nested routes (user → URLs)
- Created a data structure that mirrors the API hierarchy
- Built parent-child relationship between resources

### 6. REST API Best Practices

- Used consistent JSON response format
- Implemented proper HTTP status codes
- Created intuitive API endpoint naming

### Key Syntax & Patterns

### Express Route Structure

```jsx
urlRouter.get('/:username', getUserURLs)
urlRouter.post('/:username/convert', convertURL)
urlRouter.get('/:username/:slug', redirectURL)

```

### Parameter Validation

```jsx
let usernameIsValid = /^[A-Za-z]+$/.test(username);
if(!usernameIsValid) { /* handle error */ }

```

### Data Structure Management

```jsx
// Hierarchical data structure
let users = {}
// Adding data to nested structure
users[username].push({ 'slug': slug, 'url': url });
// Checking for existing items
users[username].some(item => item['slug'] == slug)
// Finding and retrieving specific values
const urlObject = users[username].find(item => item['slug'] == slug);
const url = urlObject["url"];

```

### Response Formatting

```jsx
return res.status(201).json({
    "message": "URL converted successfully",
    "shortURL": `${BaseURL}${username}/${randomSlug}`,
    "originalURL": url
});

```

You've successfully completed all the requirements for Week 1, including building a basic Express server, implementing multiple route files, creating dynamic routing with parameters, building a URL shortener with custom slugs, implementing route parameter validation, and creating nested routes for resource hierarchy.

## Express Fundamentals Notes - Week 1

### Controller Files

- **Controller.js file**
    - The file where we put our handler functions for API requests
    - For example if we make the following
    
    ```jsx
    app.get('/user', getUserURLs)
    ```
    
    - Here getUserURLs will be in controller.js
    - Controller example:
    
    ```jsx
    export const getUserURLs = (req, res) => {
      const username = req.params.username
      if (users[username]){
          return res.status(200).json(users[username])
      } else {
          return res.status(404).json({error: 'user not found'})
      }
    }
    
    ```
    
    - In the main file, we import the exported functions
    
    ```jsx
    import { getUserURLs } from './urlshortenerController.js';
    
    ```
    
    - Note: Don't forget to add (.js) while importing

### Router Files

- **Router.js file**
    - The file where we organize our routes in a modular way
    - Example of our URL shortener router
    
    ```jsx
    import express from 'express'
    import { convertURL, getUserURLs, redirectURL } from './urlshortenerController.js'
    
    const urlRouter = express.Router()
    
    urlRouter.get('/:username', getUserURLs)
    urlRouter.post('/:username/convert', convertURL)
    urlRouter.get('/:username/:slug', redirectURL)
    
    export default urlRouter
    
    ```
    
    - In the main file, we use the router like this
    
    ```jsx
    import express from 'express'
    import urlRouter from './urlshortnerRouter.js'
    
    const app = express()
    app.use(express.json())
    
    // Mount the router with a prefix
    app.use('/url', urlRouter)
    
    app.listen(3000, () => {
      console.log('Server running on port 3000')
    })
    
    ```
    
    - With this setup, our URLs would be:
        - `http://localhost:3000/url/username` → Handled by getUserURLs
        - `http://localhost:3000/url/username/convert` → Handled by convertURL
        - `http://localhost:3000/url/username/slug` → Handled by redirectURL

### Data Structure Management

- **Hierarchical data structure**
    - Creating the structure
    
    ```jsx
    let users = {}
    
    ```
    
    - Adding data to nested structure
    
    ```jsx
    users[username].push({ 'slug': slug, 'url': url });
    
    ```
    
    - Checking if item exists
    
    ```jsx
    users[username].some(item => item['slug'] == slug)
    
    ```
    
    - Finding and retrieving specific values
    
    ```jsx
    const urlObject = users[username].find(item => item['slug'] == slug);
    const url = urlObject["url"];
    
    ```
    

### URL Shortener Improvements

- **URL Validation**
    - Added URL validation with validator library
    
    ```jsx
    if (!url || !isURL(url)){
        return res.status(400).json({ error: "Invalid URL format" });
    }
    
    ```
    
- **Response Format**
    - Changed from plain text to structured JSON
    
    ```jsx
    return res.status(201).json({
        "message": "URL converted successfully",
        "shortURL": `${BaseURL}${username}/${randomSlug}`,
        "originalURL": url
    });
    
    ```
    
- **Parameter Validation**
    - Added username validation with regex
    
    ```jsx
    let usernameIsValid = /^[A-Za-z]+$/.test(username);
    if(!usernameIsValid) {
        return res.status(400).json({error: 'Enter a valid username'});
    }
    
    ```
    
    - Added slug length validation
    
    ```jsx
    if (String(slug).length <= 10){
        // process the slug
    } else {
        return res.status(400).json({error: "Slug has more than 10 character"});
    }
    
    ```
    
- **Collision Handling**
    - Added loop to avoid duplicate slugs
    
    ```jsx
    do{
        randomSlug = getRandomSlug();
        // add to user's URLs
    } while (/* check if collision */);
    
    ```
    
- **Configuration Variables**
    - Extracted base URL to constant
    
    ```jsx
    const BaseURL = "http://localhost:3000/url/"
    
    ```