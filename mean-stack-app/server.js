const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/testDB")
    .then(() => {
        console.log("✅ MongoDB connected successfully");
    })
    .catch(err => {
        console.error("❌ MongoDB connection failed:", err);
    });

// Create Mongoose model for "Item"
const itemSchema = new mongoose.Schema({
    name: String,
});

const Item = mongoose.model('Item', itemSchema);

// Test route
app.get('/', (req, res) => {
    res.send('Hello MEAN Stack!');
});

// API route to fetch items from MongoDB
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();  // Using Mongoose to query MongoDB
        res.json(items);  // Respond with items as JSON
    } catch (err) {
        res.status(500).json({ error: 'Error fetching items' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});

