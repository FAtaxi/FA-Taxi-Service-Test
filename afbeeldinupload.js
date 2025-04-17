const path = require('path');
const admin = require('firebase-admin');

const storage = admin.storage().bucket();

// Functie om afbeelding naar Firebase Storage te uploaden
async function uploadImage(filePath, chauffeurId) {
  const fileName = path.basename(filePath);
  
  // Uploaden naar Firebase Storage
  try {
    const file = storage.file(`chauffeurs/${chauffeurId}/${fileName}`);
    await file.upload(filePath, {
      metadata: {
        contentType: 'image/jpeg', // Of het juiste bestandstype
      },
    });

    console.log('Afbeelding succesvol geüpload naar Firebase Storage');
    return file.publicUrl();  // URL van de geüploade afbeelding
  } catch (error) {
    console.error('Fout bij het uploaden van de afbeelding:', error);
  }
}

module.exports = { uploadImage };  // Exporteer de functie
