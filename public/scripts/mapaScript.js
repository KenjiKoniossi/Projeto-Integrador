
//Criando mapa com LeafletJS
const mapa = L.map('div-mapa').setView([-23.5506507, -46.6333824], 17);

//Usando Tiles do OpenStreetMap
// const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
// const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// const tiles = L.tileLayer(tileUrl, { attribution });
// tiles.addTo(mapa);

//Usando Tiles do Mapbox
const tileUrl = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY3RpcHBldHQiLCJhIjoiS3lpTnN4MCJ9.YG_uH8r7IgwgcSWEPYROMA'
}).addTo(mapa);

//Pegar a Geolocalização do usuário
function pegarGeolocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(posicao){
            mapa.setView([posicao.coords.latitude, posicao.coords.longitude], 17);
        })
    }
}

pegarGeolocation();