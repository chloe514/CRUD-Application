// Import the Express framework
const express = require('express');
// Create an instance of Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define the port number for the server
const PORT = 3000;
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Initialize an array to store books
let books = [];

// Route to create a new book
app.post('/books', (req, res) => {
    // Create a new book object with an auto-incremented ID
    const book = {
        id: books.length + 1, 
        title: req.body.title,
        author: req.body.author
    };
    // Add the new book to the array
    books.push(book);
    // Respond with status 201 (Created) and JSON data of the new book
    res.status(201).json(book);
});

// Route to get all books
app.get('/books', (req, res) => {
    // Respond with status 200 (OK) and JSON data of all books
    res.status(200).json(books);
});

// Route to get a single book by ID
app.get('/books/:id', (req, res) => {
    // Find the book in the array by its ID
    const book = books.find(b => b.id === parseInt(req.params.id));
    // If the book is not found, respond with status 404 (Not Found)
    if (!book) {
        res.status(404).send('Book not found');
    } else {
        // If found, respond with status 200 (OK) and JSON data of the book
        res.status(200).json(book);
    }
});

// Route to delete a book by ID
app.delete('/books/:id', (req, res) => {
    // Find the index of the book in the array by its ID
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    // If the book is not found, respond with status 404 (Not Found)
    if (index === -1) {
        res.status(404).send('Book not found');
    } else {
        // If found, remove the book from the array
        books.splice(index, 1);
        // Respond with status 204 (No Content) as there is no data to send back
        res.status(204).send();
    }
});
