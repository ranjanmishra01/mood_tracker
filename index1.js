const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'ranjan';

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }

  console.log('Connected to MongoDB');

  const db = client.db(dbName);
  const collection = db.collection('formEntry');

  app.post('/api/formEntry', (req, res) => {
    const formData = req.body;


    collection.insertOne(formData, (err, result) => {
      if (err) {
        console.error('Failed to insert form data into MongoDB:', err);
        res.status(500).send('Internal server error');
        return;
      }
      console.log('Form data inserted into MongoDB');
      res.sendStatus(200);
    });
  });
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});