const express = require('express');
const app = express();
const port = 3000;

let chauffeurs = [
  { id: 1, naam: 'Jan', beschikbaarheid: 'beschikbaar' },
  { id: 2, naam: 'Piet', beschikbaarheid: 'niet_beschikbaar' },
];

let ritten = [
  { id: 1, ophaaladres: 'Straat A', afzetadres: 'Straat B', status: 'open', chauffeurId: null }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route om beschikbaarheid van chauffeur bij te werken
app.post('/update-beschikbaarheid', (req, res) => {
  const chauffeurId = req.body.chauffeurId;
  const beschikbaarheid = req.body.beschikbaarheid;

  const chauffeur = chauffeurs.find(ch => ch.id == chauffeurId);
  if (chauffeur) {
    chauffeur.beschikbaarheid = beschikbaarheid;
    res.send('Beschikbaarheid succesvol geüpdatet');
  } else {
    res.status(404).send('Chauffeur niet gevonden');
  }
});

// Route om rit te accepteren
app.post('/accepteer-rit', (req, res) => {
  const ritId = req.body.ritId;
  const chauffeurId = req.body.chauffeurId;

  // Zoek de rit en update de status
  const rit = ritten.find(rit => rit.id == ritId);
  const chauffeur = chauffeurs.find(ch => ch.id == chauffeurId);

  if (rit && chauffeur && chauffeur.beschikbaarheid === 'beschikbaar') {
    rit.status = 'geaccepteerd';
    rit.chauffeurId = chauffeurId;

    // Markeer chauffeur als bezet
    chauffeur.beschikbaarheid = 'niet_beschikbaar';

    res.send({ message: `Rit ${ritId} succesvol geaccepteerd door chauffeur ${chauffeur.naam}` });
  } else {
    res.status(400).send('Fout bij ritacceptatie');
  }
});

app.listen(port, () => {
  console.log(`Server draait op poort ${port}`);
});
