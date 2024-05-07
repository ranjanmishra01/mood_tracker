const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Add middleware to parse JSON request bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://127.0.0.1:5500' // Allow requests from this origin
}));

const { MongoClient } = require('mongodb');

async function listCollections() {
  try {
    const uri = 'mongodb://localhost:27017/'; // Replace with your connection string
    const client = await MongoClient.connect(uri);
    const db = client.db('ranjan');

    const collections = await db.listCollections().toArray(); // Get list of collections

    console.log('Collections in ranjan database:');
    collections.forEach(collection => console.log('-', collection.name));

    await client.close();
  } catch (err) {
    console.error('Error listing collections:', err);
  }
}

listCollections();


// Connect to MongoDB (replace with your actual connection string)
mongoose.connect('mongodb://localhost:27017/ranjan')
.then(async () => {
    console.log('MongoDB connected');
    await checkCollectionExists(); // Call the function after connection
  })
  .catch(err => console.error(err));

// Define your mongoose model (optional)
const formEntrySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  mood: { type: String, required: true },
  notes: { type: String, required: true }
});

const FormEntry = mongoose.model('formEntry', formEntrySchema); // Optional: create a model

// Function to check collection existence (call it as needed)
async function checkCollectionExists() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ranjan'); // Establish connection using Mongoose
    const connection = mongoose.connection;
    const collection = connection.db.collection('formEntry'); // Access collection through db object on connection

    const exists = await collection.countDocuments() > 0; // Check if there are any documents
    console.log(`formEntry collection exists: ${exists}`);

    // You can disconnect from MongoDB here if needed
    // await mongoose.disconnect();
  } catch (err) {
    console.error('Error checking for collection:', err);
  }
}

// Handle form submissions
app.post('/api/formEntry', async (req, res) => {
  const { date, mood, notes } = req.body;
  console.log(req.body);

  try {
    // Create a mood model instance (if using a model)
    const formEntry = new FormEntry({ date, mood, notes });

    await formEntry.save(); // Save the data
    res.status(201).send('Form entry saved successfully');
  } catch (err) {
    console.error('Error saving form entry:', err);
    res.status(500).send('Internal server error');
  }
});

// Start the server
const port = process.env.PORT || 5000; // Use environment variable or default port
app.listen(port, () => console.log(`Server listening on port ${port}`));
