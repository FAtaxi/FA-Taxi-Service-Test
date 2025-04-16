// server.js
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const app = express();
const port = 3000;

// Twilio gegevens
const accountSid = 'USD06777216215bbd75489a811232124d6';
const authToken = 'f8b5284f7b1f9dff52c6eec96476f0f8';
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/verstuur-rit', (req, res) => {
  const { ophalen, afzetten, prijs, tijdsduur, afstand } = req.body;

  const bericht = `
📍 *Nieuwe ritaanvraag*:
🔹 Ophaaladres: ${ophalen}
🔹 Afzetadres: ${afzetten}
🚗 Afstand: ${afstand} km
⏱️ Duur: ${tijdsduur} minuten
💶 Prijs: €${prijs}
  `;

  client.messages
    .create({
      from: 'whatsapp:+14155238886', // Twilio sandbox nummer
      to: 'whatsapp:+31636018209',   // Chauffeursnummer
      body: bericht,
    })
    .then(message => {
      console.log('Bericht verstuurd:', message.sid);
      res.json({ success: true });
    })
    .catch(error => {
      console.error('Fout bij verzenden:', error);
      res.status(500).json({ success: false });
    });
});

app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
