const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

// Sample array to store pets
let pets = [];

// Generate a unique ID for each pet
const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

// Middleware to log the time and request details for each request
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

app.post('/pets', (req, res) => {
  console.log('Received request body:', req.body);
  
  if (req.body && req.body.name) {
    const newPet = {
      id: generateUniqueId(),
      name: req.body.name,
      species: req.body.species,
      age: req.body.age,
      color: req.body.color,
      weight: req.body.weight
    };

    pets.push(newPet);
    res.json(newPet);
  } else {
    res.status(400).json({ error: 'Invalid request body. "name" is required.', requestBody: req.body });
  }
});

// Endpoint to retrieve the list of pets
app.get('/pets', (req, res) => {
  res.json(pets);
});

// Endpoint to retrieve a single pet by ID
app.get('/pets/:id', (req, res) => {
  const pet = pets.find(p => p.id === req.params.id);

  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ error: 'Pet not found' });
  }
});

// Endpoint to update a single pet by ID
app.put('/pets/:id', (req, res) => {
  const petIndex = pets.findIndex(p => p.id === req.params.id);

  if (petIndex !== -1) {
    pets[petIndex] = {
      id: req.params.id,
      name: req.body.name,
      species: req.body.species,
      age: req.body.age,
      color: req.body.color,
      weight: req.body.weight
    };

    res.json(pets[petIndex]);
  } else {
    res.status(404).json({ error: 'Pet not found' });
  }
});

// Endpoint to delete a single pet by ID
app.delete('/pets/:id', (req, res) => {
  pets = pets.filter(p => p.id !== req.params.id);
  res.json({ message: 'Pet deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
