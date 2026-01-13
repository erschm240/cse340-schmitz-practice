// Imports
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

/*
* Declare Important Variables 
*/
// Define the port number the server will listen on
const PORT = process.env.port || 3000;

// Define filename and dirname for locating module files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
* Setup Express Server
*/
// Create an instance of an Express application
const app = express();

/*
* Configure Express Middleware
*/
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/*
* Declare Routes
*/
// Define a route handler for the root URL ('/')
app.get('/', (req, res) => {
    res.send(`Welcome, ${name}!`);
});

// Define a route handler for a new server route
app.get('/new-route', (req, res) => {
    res.send('This is a new route!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});