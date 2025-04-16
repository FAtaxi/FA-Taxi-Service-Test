const accountSid = 'USD06777216215bbd75489a811232124d6'; // Je Account SID
const authToken = 'f8b5284f7b1f9dff52c6eec96476f0f8'; // Je Auth Token

const client = require('twilio')(accountSid, authToken);

// Gegevens van de rit (hier kun je de werkelijke ritinformatie invullen)
const ophaalLocatie = 'Laan op Zuid 2, Rotterdam';
const afzetLocatie = 'Coolsingel 25, Rotterdam';
const prijs = '€20,00';
const duurMinuten = 15;
const afstandKm = 5;

// Bericht met ritgegevens (zonder knoppen)
const berichtBody = `
Rit Details:
Ophaallocatie: ${ophaalLocatie}
Afzetlocatie: ${afzetLocatie}
Prijs: ${prijs}
Duur: ${duurMinuten} minuten
Afstand: ${afstandKm} km

Reageer op dit bericht om de rit te bevestigen of te weigeren.
`;

// Verzenden van bericht naar chauffeur via WhatsApp
client.messages
  .create({
    to: 'whatsapp:+31636018209', // WhatsApp nummer van de chauffeur
    from: 'whatsapp:+14155238886', // Twilio WhatsApp Sandbox nummer
    body: berichtBody
  })
  .then(message => console.log('Bericht verzonden met SID: ' + message.sid))
  .catch(error => console.error('Fout bij verzenden: ' + error));
