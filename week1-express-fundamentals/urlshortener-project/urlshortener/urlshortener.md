# Building a URL Shortener with Custom Slugs

Let's break down this project into small, manageable tasks and cover the core concepts you'll need to understand first.

## Core Concepts to Understand

1. **HTTP Methods** - You'll need to use GET for redirecting and POST for creating new shortened URLs
2. **Request Body Parsing** - To receive the original URL and custom slug from client
3. **URL Validation** - Ensuring submitted URLs are valid
4. **Middleware** - For adding functionality like body parsing and validation
5. **Redirects** - How to properly redirect users from short URL to destination
6. **Data Storage** - How to store and retrieve URL mappings (in-memory first, database later)
7. **Error Handling** - Proper error responses for various scenarios

## Project Breakdown

### Step 1: Set Up Project Structure
- Create a new folder for URL shortener functionality
- Set up controller and route files specifically for the shortener

### Step 2: Implement Basic URL Shortening
- Create a POST endpoint to accept a long URL and return a shortened one
- Implement basic storage mechanism (in-memory object/array at first)
- Generate random slugs if custom ones aren't provided

### Step 3: Add Custom Slug Support
- Modify the POST endpoint to accept a custom slug parameter
- Add validation to ensure slugs are URL-friendly
- Add checks for duplicate slugs

### Step 4: Implement URL Redirection
- Create a GET endpoint that accepts a slug and redirects to the original URL
- Handle errors for non-existent slugs

### Step 5: Add Validation and Error Handling
- Validate input URLs (ensure they're properly formatted)
- Add appropriate error responses
- Implement proper status codes

### Step 6: Enhance with Additional Features
- Track click statistics
- Add URL expiration
- Implement user authentication (if needed)

## Let's Get Started with Step 1:

Here's how to set up your project structure for the URL shortener:

```
challenges/
├── urlshortener/
│   ├── urlshortenerController.js  (URL shortener logic)
│   ├── urlshortenerRouter.js      (URL shortener routes)
│   └── urlshortener.js             (data storage for URLs)
```