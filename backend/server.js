require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const energyRoutes = require('./routes/energyRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Front-end aan de server gekoppeld
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
app.use('/api/energy', energyRoutes);

// Homepage route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(3000, () => {
    console.log("Server draait op http://localhost:3000");
});
