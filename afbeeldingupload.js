import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration met directe API-sleutels
    cloudinary.config({ 
        cloud_name: 'db48g9zis', 
        api_key: '896781555618925', 
        api_secret: 'Cl3zUh6ToOfJ8AFNCCnDIwqfwVg' // API secret hier toegevoegd
    });
    
    // Upload een afbeelding
    const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimaliseer levering door te verkleinen en automatisch formaat en kwaliteit toe te passen
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transformeer de afbeelding: automatisch bijsnijden naar vierkant
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();
