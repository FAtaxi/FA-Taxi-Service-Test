// sendMessage.js

const express = require('express');
const bodyParser = require('body-parser');
const client = require('twilio')('USD06777216215bbd75489a811232124d6', 'f8b5284f7b1f9dff52c6eec96476f0f8');

const app = express();
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
  const { message } = req.body;
  try {
    await client.messages.create({
      from: 'whatsapp:+14155238886', // Twilio sandbox nummer
      to: 'whatsapp:+31636018209',   // Jouw telefoonnummer
      body: message,
    });
    res.send("Verzonden");
  } catch (e) {
    console.error(e);
    res.status(500).send("Mislukt");
  }
});

app.listen(3000, () => console.log("Server draait op poort 3000"));
