# <!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>FA Taxi Calculator</title>
  <script>
    const apiKey = "5b3ce3597851110001cf6248b59dc263cab24bdabda48748cd9122b3";

    async function adresNaarCoordinaten(adres) {
      const response = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(adres)}`);
      const data = await response.json();
      if (!data.features || data.features.length === 0) {
        throw new Error("Adres niet gevonden");
      }
      return data.features[0].geometry.coordinates; // [lng, lat]
    }

    async function berekenRit() {
      const ophalen = document.getElementById("ophaaladres").value;
      const afzetten = document.getElementById("afzetadres").value;

      if (!ophalen || !afzetten) {
        alert("Vul beide adressen in.");
        return;
      }

      try {
        const coordOphalen = await adresNaarCoordinaten(ophalen);
        const coordAfzetten = await adresNaarCoordinaten(afzetten);

        const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${coordOphalen[0]},${coordOphalen[1]}&end=${coordAfzetten[0]},${coordAfzetten[1]}`);
        const data = await response.json();

        const afstandKm = data.features[0].properties.summary.distance / 1000;
        const duurMin = data.features[0].properties.summary.duration / 60;

        const prijs = (afstandKm * 3.35) + (duurMin * 0.50);
        document.getElementById("resultaat").innerText = `Geschatte prijs: €${prijs.toFixed(2)} (${afstandKm.toFixed(1)} km, ${duurMin.toFixed(0)} min)`;
      } catch (error) {
        alert("Kon route niet ophalen. Controleer de adressen.");
      }
    }
  </script>
</head>
<body>
  <h2>FA Taxi Ritprijs Calculator</h2>
  <label>Ophaaladres:</label><br>
  <input id="ophaaladres" type="text" placeholder="Bijv. Laan op Zuid 2, Rotterdam"><br>
  <label>Afzetadres:</label><br>
  <input id="afzetadres" type="text" placeholder="Bijv. Coolsingel 25, Rotterdam"><br><br>
  <button onclick="berekenRit()">Bereken prijs</button>
  <p id="resultaat"></p>
</body>
</html>
