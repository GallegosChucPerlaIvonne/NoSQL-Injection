require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar:', err));

// Modelo de usuario (colección "users")
const User = mongoose.model('User',
  new mongoose.Schema({ username: String, password: mongoose.Schema.Types.Mixed })
);

// Ruta vu
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    return res.json({ success: !!user });
  } catch (e) {
    return res.status(500).json({ success: false, error: e.message });
  }
});

//HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'frontend.html'));
});

app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
);
