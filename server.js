var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var axios = require('axios');

app.use(cors());
app.use(bodyParser.json());

//Create your endpoints HERE

// Get Random Dog Images
app.get("/random", async (req, res) => {
  try { // Try block to fetch API
    return res.status(200).json(
      await axios
      // Get Random Dog Image
      .get("https://dog.ceo/api/breeds/image/random")
      // Returns string URL of random dog image
      .then(res => res.data.message)
    )
  }

  // Catch Error Block
  catch (err) { console.log(err) }
});

app.get("/breed", async (req, res) => {
  // Query Search by Breed ("" by default)
  const { breed="" } = req.query;

  try { // Try block to fetch API
    // If Query is empty...
    return breed === "" ?
    // ...return error with empty string
    res.status(400).json("") :
    
    // ...else, get dog image based on Breed Selection
    res.status(200).json(
      await axios
      .get(
      `https://dog.ceo/api/breed/${breed}/images/random`
      ).then(res => res.data.message)
    ) // Returns image string URL
  }

  // Catch Error Block
  catch (err) { console.log(err) }
});

// Get a List of Dog Breeds (returns array)
app.get("/breeds", async (req, res) => {
  try { // Try block
    return res.status(200).json(
      await axios
      // List of All Breeds (keys)
      .get("https://dog.ceo/api/breeds/list/all")
      // Returns array of keys
      .then(res => Object.keys(res.data.message))
    )
  }

  // Catch Error Block
  catch (err) { console.log(err) }
});

// Error Handling Endpoint "Catcher" using * for everything else
app.get("*", (req, res) => res.status(404).json("Error: This endpoint does not exist."));

app.listen(8001, function () {
  console.log('App running on port 8001');
});
