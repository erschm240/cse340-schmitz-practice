// Imports
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

/*
* Declare Important Variables 
*/
// Define the port number the server will listen on
const NODE_ENV = process.env.NOVE_ENV || 'production';
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

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express wehere to find the templates
app.set('views', path.join(__dirname, 'src/views'));

/*
* Declare Routes
*/
app.get('/',(req, res) => {
    const title = 'Welcome Home';
    res.render('home', {title});
})

app.get('/about',(req, res) => {
    const title = 'About Me';
    res.render('about', {title});
})

app.get('/products',(req, res) => {
    const title = 'Our Products';
    res.render('products', {title});
})

app.get('/student', (req, res) => {
    const title = 'Student Information';
    const name = 'Emma';
    const id = '48370592';
    const email = 'stu25083@byui.edu';
    const address =  '123 College Ave';
    res.render('student', {title, name, id, email, address});
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});