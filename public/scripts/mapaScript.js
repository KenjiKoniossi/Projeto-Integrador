const inputPesquisa = document.getElementById('input-pesquisa');
const submitPesquisa = document.getElementById('submit-pesquisa');
const resultadoPesquisa = document.getElementById('resultado-pesquisa');
const botaoFechar = document.getElementById('botao-fechar');
const zoomImagem = document.getElementById('zoom-imagem-fundo');
const containerMapa = document.getElementById('container-mapa');
const imagemZoom = document.querySelector('#zoom-imagem-fundo img');

//Zera no topo da página o scroll
window.scrollTo({ top: 0, behavior: 'smooth' });

//Array de marcadores
let arrayMarcadores = [];
let latlngBusca = {};

//Criando mapa com LeafletJS
const mapa = L.map('div-mapa', {zoomControl: false});
const latlngInicio = {lat: -23.562034742565295, lng: -46.65653516995086};
mapa.setView(latlngInicio, 17);

//Usando Tiles do OpenStreetMap
function tileOpenStreetMap() {
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    return tiles;
}

//Usando Tiles do Mapbox
function tileMapbox() {
    const tileUrl = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoid2VzbGV5YnMwMDEiLCJhIjoiY2tibmI4NmNnMXBjajJzazBvZXNoOTQ2MyJ9.bVWk-q7qy71I279L4BEv6Q'
    });
    return tileUrl;
}

//Usando Tiles do Maptiler
function tileMaptiler() {
    let gl = L.mapboxGL({
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
        accessToken: 'not-needed',
        style: 'https://api.maptiler.com/maps/e8c1f31f-ffea-44fa-9cdc-e117fbc11ceb/style.json?key=rOWMCvQS4fuQOnVJzQEQ'
    });
    return gl;
}

//Escolha do estilo do mapa, inserir a função para um dos estilos acima
const tileMapa = tileMapbox().addTo(mapa);

//Pegar a Geolocalização do usuário
function pegarGeolocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(posicao){
            mapa.setView([posicao.coords.latitude, posicao.coords.longitude], 17);
            let latlng = {lat: posicao.coords.latitude, lng: posicao.coords.longitude};
            carregaProblemas(latlng, mapa);
        })
    }
}

pegarGeolocation();
let latlngUsuario = mapa.getCenter();

//Atualiza problemas ao mover o mapa
let moveuInicial = false;
mapa.on('moveend', function (event) {
    if (moveuInicial === false) {
        return moveuInicial = true;
    }
    carregaProblemas(mapa.getCenter(), mapa);
})

//Autocomplete de endereço do Maptiler
var geocoder = new maptiler.Geocoder({
    input: inputPesquisa,
    key: 'rOWMCvQS4fuQOnVJzQEQ',
    language: ['br']
});
  
geocoder.on('select', function(item) {
    latlngBusca = {
        lat: item.center[1],
        lng: item.center[0]
    }
    inputPesquisa.value = item.place_name_br
    carregaProblemas(latlngBusca, mapa);
});


//Criação dos marcadores no Leaflet
const MarcadorPadrao = L.Icon.extend({
    options: {
        shadowUrl: '../images/marcador_sombra.png',
        iconSize:     [37, 54],
        shadowSize:   [46, 58],
        iconAnchor:   [18, 55],
        shadowAnchor: [5, 56],
        popupAnchor:  [2, -60]
    }
});
const marcadorAzul = new MarcadorPadrao({iconUrl: '../images/marcador_azul.png'});
const marcadorVerde = new MarcadorPadrao({iconUrl: '../images/marcador_verde.png'});

//Adiciona botões de zoom no canto direito inferior
L.control.zoom({position: 'bottomright'}).addTo(mapa);

//Scroll para resultados ao pesquisar
inputPesquisa.addEventListener('click', function () {
    //Scroll nos resultados da busca
    const tamanhoScroll = (mapa.getSize().x < 768 ? mapa.getSize().y : 0);
    window.scrollTo({ top: tamanhoScroll, behavior: 'smooth' });
})

//Fechar zoom da imagem
botaoFechar.addEventListener('click', function (event) {
    event.preventDefault;

    zoomImagem.style.display = 'none';
})

//Fecha zoom quando clicar fora da imagem
// window.addEventListener('click', function (event) {
//     if (!document.querySelector('.container-imagem').contains(event.target)) {
//         zoomImagem.style.display = 'none';
//     }
// });

function abreZoom(event, imagem) {
    event.preventDefault;
    imagemZoom.src = '../images_problemas/' + imagem;
    zoomImagem.style.display = 'block';
}

//Implementação de autocomplete
inputPesquisa.addEventListener('keydown', async function (e) {

    // const resposta = await fetch('https://nominatim.openstreetmap.org/search/' + inputPesquisa.value + '?format=json&limit=5');
    // const dados = await resposta.json();

    // console.log("Digitado: " + inputPesquisa.value);
    // for (let i = 0; i < dados.length; i++) {
    //     console.log(dados[i].display_name);
    // }

    //Assim que começar a digitar carrega a div com o texto "Carregando"

    //Adiciona o elemento HTML com o retorno da query do API

    //Ao usuário clicar em um das respostas, pega a lat e lng do selecionado

    //Faz a busca no banco de dados pelo raio da lat e lng

    //Lista o resultado dos problemas dentro do raio

    inputPesquisa.style.borderColor = '';
})

function retornaErro(mensagemErro, resultadoPesquisa, mapa) {
    //Limpa os resultados
    resultadoPesquisa.innerHTML = '';

    //Caso retorne erro, mostrar frase
    let divConteudo = document.createElement('div');
    divConteudo.classList.add('col-12', 'd-flex', 'flex-wrap', 'div-problemas');
    let pConteudo = document.createElement('p');
    pConteudo.classList.add('col-12', 'p-0', 'm-0', 'text-center');
    pConteudo.innerText = mensagemErro
    divConteudo.appendChild(pConteudo);
    resultadoPesquisa.appendChild(divConteudo);

    //Scroll nos resultados da busca
    const tamanhoScroll = (mapa.getSize().x < 768 ? mapa.getSize().y : 0);
    window.scrollTo({ top: tamanhoScroll, behavior: 'smooth' });
}

function retornaDescricao(descricao) {
    if (descricao.length > 0) {
        const limite = 100;
        if (descricao.length > limite) {
            const novaDescricao = `${descricao.slice(0, limite)}<span class="pontos-descricao">... </span><span class="resto-descricao">${descricao.slice(limite, descricao.length)} </span><a href="#">Ler Mais</a>`;
            return novaDescricao;
        } else {
            return descricao;
        }
    } else {
        return 'Problema sem descrição.'
    }
}

//Evento para o leia mais
function lerMais(i) {
    let descricaoElemento = document.querySelector('#descricao-problema-' + i + ' a');
    if (descricaoElemento !== null) {
        descricaoElemento.addEventListener('click', function (event) {
            event.preventDefault;
            let pontos = document.querySelector('#descricao-problema-' + i + ' .pontos-descricao');
            let restoDescricao = document.querySelector('#descricao-problema-' + i + ' .resto-descricao');

            pontos.style.display = 'none';
            restoDescricao.style.display = 'inline';
            this.style.display = 'none';
        })
    }
}

function ajustaTamanhoPopup(mapa) {
    //Ajusta tamanho do popup
    const tamanhoMapa = mapa.getSize();
    if (tamanhoMapa.x < 768) {
        return tamanhoMapa.x * 0.80;
    } else {
         return 400;
    }
}

//Limpa o conteúdo dos resultadores e marcadores
function limpaMarcadores(mapa, arrayMarcadores, resultadoPesquisa) {

    // //Limpa os resultados
    resultadoPesquisa.innerHTML = '';

    //Limpa marcadores da tela
    for (let i = 0; i < arrayMarcadores.length; i++) {
        mapa.removeLayer(arrayMarcadores[i]);
    }

    arrayMarcadores = [];
}

//Se a descrição for longa, encurta
function descricaoCurta(descricao) {
    if (descricao.length > 0) {
        if (descricao.length > 30) {
            return descricao.slice(0, 32) + '...';
        } else {
            return descricao;
        }
    } else {
        return 'Problema sem descrição.';
    }
}

//Valida se o campo foi preenchido, retorna erro caso contrário
function validaCampoPreenchido(campo) {
    if (campo.value === '') {
        campo.style.borderColor = 'red';
        return;
    }
}

//Cria o elemento div do problema e seu conteúdo
function criaDivProblema(i, problema) {
    
    //Converte a data
    let dataCriacao = new Date(problema.data_criacao);

    let divConteudo = document.createElement('div');
    divConteudo.classList.add('col-12', 'd-flex', 'flex-wrap', 'div-problemas');

    if (i % 2 !== 0) {
        divConteudo.classList.add('cor-cinza');
    }

    divConteudo.innerHTML = `<p class="col-4 mb-1 p-pequena"><strong>ID: </strong>${problema.id}</p>
                            <p class="col-8 mb-1 p-pequena"><strong>Data: </strong>${dataCriacao.getDate()}/${dataCriacao.getMonth()}/${dataCriacao.getFullYear()}</p>
                            <h6 class="col-12 mb-1">${problema.tag.tag}</h6>
                            <p class="col-12 mb-0">${descricaoCurta(problema.descricao)}</p>`;

    return divConteudo;
}

//Cria popup
function criaPopup(i, problema, mapa) {

    //Converte a data
    let dataCriacao = new Date(problema.data_criacao);

    let conteudoPopup = document.createElement('div');
    conteudoPopup.classList.add('col-12', 'd-flex', 'flex-wrap', 'p-0', 'container-popup');
    conteudoPopup.innerHTML = `<div class="col-12 p-0 container-image">
                                    <a href="#" onclick="abreZoom(event, '${problema.imagem}')">
                                    <img src="../images_problemas/${problema.imagem}" class="col-12 p-0 m-0 mb-2 imagem-problema">
                                    <p class="m-0 baixo-centro p-pequena">Clique para aumentar</p>
                                    </a>
                                </div>
                                <p class="col-6 m-0 mb-1 p-pequena"><strong>ID: </strong>${problema.id}</p>
                                <p class="col-6 m-0 mb-1 p-pequena"><strong>Data: </strong>${dataCriacao.getDate()}/${dataCriacao.getMonth()}/${dataCriacao.getFullYear()}</p>
                                <p class="col-12 m-0 mb-1 p-pequena"><strong>Status: </strong>${(problema.resolvido != 1 ? '<span class="problema-nao-resolvido">Não Resolvido</span>' : '<span class="problema-resolvido">Resolvido</span>')}</p>
                                <p class="col-8 m-0 p-pequena"><strong>Problema:</strong></p>
                                <h6 class="col-12 mb-2">${problema.tag.tag}</h6>
                                <p class="col-12 m-0 mb-2" id="descricao-problema-${i}"><strong>Descrição: </strong>${retornaDescricao(problema.descricao)}</p>`;
    
    let larguraPopup = ajustaTamanhoPopup(mapa);
    let popupNovo = L.popup({maxWidth: larguraPopup, minWidth: larguraPopup}).setContent(conteudoPopup);
    return popupNovo;
}

//Cria marcador
function criaMarcador(problema, popup, mapa, arrayMarcadores) {

    //Se problema resolvido usa marcador verde
    let marcadorIcon = (problema.resolvido != 1 ? marcadorAzul : marcadorVerde);

    //Adiciona marcador no mapa
    let marcador = L.marker([problema.endereco.latitude, problema.endereco.longitude], {icon: marcadorIcon})
    .bindPopup(popup).addTo(mapa);
    arrayMarcadores.push(marcador);
}

//Centraliza o mapa no marcador ao clicar no marcador
function cliqueMarcador(i, mapa, marcador) {
    marcador.addEventListener("click", function (){
        const valorDeslocamentoY = mapa.getSize().y*0.30;
        const zoomAtual = mapa.getZoom();
        let latlngOriginal = mapa.options.crs.latLngToPoint(this.getLatLng(), zoomAtual);
        latlngOriginal.y -= valorDeslocamentoY;
        const latlngNovo = mapa.options.crs.pointToLatLng(latlngOriginal, zoomAtual);
        lerMais(i);
        
        mapa.panTo(latlngNovo);
        moveuInicial = false;
    });
}

//Centraliza o mapa ao clicar em um dos resultados
function cliqueResultado(i, mapa, marcador, divElem) {
    divElem.addEventListener("click", function (){
        const valorDeslocamentoY = mapa.getSize().y*0.30;
        const zoomAtual = mapa.getZoom();
        let latlngOriginal = mapa.options.crs.latLngToPoint(marcador.getLatLng(), zoomAtual);
        latlngOriginal.y -= valorDeslocamentoY;
        const latlngNovo = mapa.options.crs.pointToLatLng(latlngOriginal, zoomAtual);
        
        marcador.openPopup();
        lerMais(i);

        window.scrollTo({ top: 0, behavior: 'smooth' });
        mapa.panTo(latlngNovo);
        moveuInicial = false;
    });
}

//Carrega problemas ao buscar
submitPesquisa.addEventListener("click", async function (event) {
    event.preventDefault();

    validaCampoPreenchido(inputPesquisa);

    carregaProblemas(latlngBusca, mapa);

    //Scroll nos resultados da busca
    const tamanhoScroll = (mapa.getSize().x < 768 ? mapa.getSize().y : 0);
    window.scrollTo({ top: tamanhoScroll, behavior: 'smooth' });

})

//Carrega os problemas nas coordenadas do centro do mapa
async function carregaProblemas(latlng, mapa){
    
    limpaMarcadores(mapa, arrayMarcadores, resultadoPesquisa);

    moveuInicial = false;
    mapa.panTo([latlng.lat, latlng.lng]);

    //Solicita o request de envio dos dados
    const resposta = await fetch('/mapa/problemas', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({latitude: latlng.lat, longitude: latlng.lng, mapaBounds: mapa.getBounds()})
    })

    const dadosBusca = await resposta.json();

    if (resposta.status !== 200) {

        retornaErro('Algo deu errado, recarregue a página e tente novamente.', resultadoPesquisa, mapa);

    } else {

        if (dadosBusca.listaDeProblemas.length !== 0) {

            for (let i = 0; i < dadosBusca.listaDeProblemas.length; i++) {

                let divElem = criaDivProblema(i, dadosBusca.listaDeProblemas[i].problema[0]);
                resultadoPesquisa.appendChild(divElem);

                let popupNovo = criaPopup(i, dadosBusca.listaDeProblemas[i].problema[0], mapa);
                
                //Se problema resolvido usa marcador verde
                let marcadorIcon = (dadosBusca.listaDeProblemas[i].problema[0].resolvido != 1 ? marcadorAzul : marcadorVerde);

                //Adiciona marcador no mapa
                let marcador = L.marker([dadosBusca.listaDeProblemas[i].latitude, dadosBusca.listaDeProblemas[i].longitude], {icon: marcadorIcon})
                .bindPopup(popupNovo).addTo(mapa);
                arrayMarcadores.push(marcador);

                cliqueMarcador(i, mapa, marcador);
                
                cliqueResultado(i, mapa, marcador, divElem);
             
            }

        } else {

            retornaErro('Não foram encontrados resultados.', resultadoPesquisa, mapa);

        }
    }
}
