import { v2 as cloudinary } from 'cloudinary';

(async function() {
    // Configuratie van Cloudinary
    cloudinary.config({
        cloud_name: 'db48g9zis', // Jouw Cloudinary cloud_name
        api_key: '896781555618925', // Jouw Cloudinary API key
        api_secret: 'Cl3zUh6ToOfJ8AFNCCnDIwqfwVg' // Jouw Cloudinary API secret
    });

    try {
        // Upload een afbeelding
        const uploadResult = await cloudinary.uploader.upload(
            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', 
            {
                public_id: 'shoes' // Kies een unieke naam voor het bestand
            }
        );

        console.log(uploadResult);

        // Optimaliseer levering door formaten en kwaliteit automatisch aan te passen
        const optimizeUrl = cloudinary.url('shoes', {
            fetch_format: 'auto',
            quality: 'auto'
        });

        console.log(optimizeUrl);

        // Transformeer de afbeelding: automatisch bijsnijden naar een vierkant
        const autoCropUrl = cloudinary.url('shoes', {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500
        });

        console.log(autoCropUrl);
    } catch (error) {
        console.error("Fout bij het uploaden van de afbeelding:", error);
    }
})();
