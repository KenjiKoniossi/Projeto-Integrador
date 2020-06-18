
//Criando mapa com LeafletJS
const mapa = L.map('div-mapa').setView([-23.6417309, -46.532859099999996], 17);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mapa);
