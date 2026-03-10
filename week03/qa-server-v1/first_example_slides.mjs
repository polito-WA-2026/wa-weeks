
// Import package
import express from 'express';

// Create application
const app = express();

// Define routes and web pages
app.get('/', (req, res) =>
    res.send('Hello Antonio!'));

// Activate server
app.listen(3000, () => console.log('Server ready'));