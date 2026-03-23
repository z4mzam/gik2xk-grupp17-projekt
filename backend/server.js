const express = require('express');
const cors = require('cors');
const path = require('path'); // Behövs för att hantera filsökvägar
const Product = require('./models/Product'); 
const Rating = require('./models/Rating'); 

const app = express();
const PORT = 3001;

// --- MIDDLEWARE ---
app.use(cors()); 
app.use(express.json());

// Denna rad gör att bilder i mappen "public" kan nås via http://localhost:3001/images/filnamn.png
app.use('/images', express.static(path.join(__dirname, 'public')));

// --- PRODUKTER ---

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Kunde inte hämta produkter" });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ error: "Kunde inte skapa produkt" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Produkt uppdaterad" });
  } catch (err) {
    res.status(400).json({ error: "Kunde inte uppdatera produkt" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ message: "Produkt borttagen" });
  } catch (err) {
    res.status(500).json({ error: "Kunde inte ta bort produkt" });
  }
});

// --- BETYG (RATINGS) ---

app.post("/api/ratings", async (req, res) => {
  try {
    console.log("Tar emot betyg:", req.body); // Loggar i terminalen så du ser att det kommer fram
    const newRating = await Rating.create(req.body);
    res.json(newRating);
  } catch (err) {
    console.error("Fel vid sparande av betyg:", err);
    res.status(400).json({ error: "Kunde inte spara betyg" });
  }
});

app.get("/api/ratings/:productId", async (req, res) => {
  try {
    const ratings = await Rating.findAll({ 
      where: { productId: req.params.productId } 
    });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: "Kunde inte hämta betyg" });
  }
});

app.listen(PORT, () => {
  console.log(`Server kör på http://localhost:${PORT}`);
  console.log(`Bilder serveras från: http://localhost:${PORT}/images/`);
});