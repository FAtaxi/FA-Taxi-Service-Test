const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const dataPath = path.join(__dirname, 'chauffeurs.json');

// 🚗 Registratie
app.post('/registreer', (req, res) => {
  const { naam, wachtwoord, email } = req.body;
  const gebruikers = JSON.parse(fs.readFileSync(dataPath));

  const bestaat = gebruikers.find((g) => g.naam === naam);
  if (bestaat) return res.status(400).json({ message: 'Gebruiker bestaat al' });

  gebruikers.push({ naam, wachtwoord, email, geblokkeerd: false });
  fs.writeFileSync(dataPath, JSON.stringify(gebruikers, null, 2));
  res.json({ message: 'Registratie gelukt!' });
});

// 🔐 Login
app.post('/login', (req, res) => {
  const { naam, wachtwoord } = req.body;
  const gebruikers = JSON.parse(fs.readFileSync(dataPath));

  const gebruiker = gebruikers.find((g) => g.naam === naam && g.wachtwoord === wachtwoord);
  if (!gebruiker) return res.status(401).json({ message: 'Onjuiste inloggegevens' });

  if (gebruiker.geblokkeerd) {
    return res.status(403).json({ message: 'Je bent geblokkeerd door de beheerder' });
  }

  res.json({ message: 'Inloggen gelukt!' });
});

// 🚫 Blokkeer chauffeur
app.post('/blokkeer-chauffeur', (req, res) => {
  const index = parseInt(req.query.index);
  const gebruikers = JSON.parse(fs.readFileSync(dataPath));

  if (gebruikers[index]) {
    gebruikers[index].geblokkeerd = true;
    fs.writeFileSync(dataPath, JSON.stringify(gebruikers, null, 2));
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Chauffeur niet gevonden' });
});

// 🗑 Verwijder chauffeur
app.delete('/verwijder-chauffeur', (req, res) => {
  const index = parseInt(req.query.index);
  const gebruikers = JSON.parse(fs.readFileSync(dataPath));

  if (gebruikers[index]) {
    gebruikers.splice(index, 1);
    fs.writeFileSync(dataPath, JSON.stringify(gebruikers, null, 2));
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Chauffeur niet gevonden' });
});

app.listen(port, () => {
  console.log(`🚀 Server draait op http://localhost:${port}`);
});
