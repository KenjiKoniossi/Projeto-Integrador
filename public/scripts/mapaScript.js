const inputPesquisa = document.getElementById('input-pesquisa');
const submitPesquisa = document.getElementById('submit-pesquisa');
const resultadoPesquisa = document.getElementById('resultado-pesquisa');
const botaoFechar = document.getElementById('botao-fechar');
const zoomImagem = document.getElementById('zoom-imagem-fundo');
const containerMapa = document.getElementById('container-mapa');
const imagemZoom = document.querySelector('#zoom-imagem-fundo img');

//Array de marcadores
let arrayMarcadores = [];
let arrayDivResultados = [];

//Criando mapa com LeafletJS
const mapa = L.map('div-mapa', {zoomControl: false}).setView([-23.5506507, -46.6333824], 17);

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
        maxZoom: 18,
        id: 'mapbox/light-v10',
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
const tileMapa = tileMaptiler().addTo(mapa);


//Adiciona botões de zoom no canto direito inferior
L.control.zoom({
    position:'bottomright'
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

//Fechar zoom da imagem
botaoFechar.addEventListener('click', function (event) {
    event.preventDefault;

    zoomImagem.style.display = 'none';
})

function abreZoom(event, imagem) {
    event.preventDefault;
    imagemZoom.src = '../images_problemas/' + imagem;
    zoomImagem.style.display = 'block';


}

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

function retornaErro(mensagemErro) {
    //Limpa os resultados
    resultadoPesquisa.innerHTML = '';

    //Caso retorne erro, mostrar frase
    let divConteudo = document.createElement('div');
    divConteudo.classList.add('col-12', 'd-flex', 'flex-wrap', 'div-problemas');
    let pConteudo = document.createElement('p');
    pConteudo.classList.add('col-12');
    pConteudo.innerText = mensagemErro
    divConteudo.appendChild(pConteudo);
    resultadoPesquisa.appendChild(divConteudo);

    //Foca nos resultados da busca
    resultadoPesquisa.setAttribute('tabindex', '-1');
    resultadoPesquisa.focus();
    resultadoPesquisa.removeAttribute('tabindex');
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
function lerMais() {
    let descricaoElemento = document.querySelector('.descricao-problema');
    if (descricaoElemento !== null) {
        descricaoElemento.addEventListener('click', function (event) {
            event.preventDefault;
            let pontos = document.querySelector('.pontos-descricao');
            let restoDescricao = document.querySelector('.resto-descricao');
            let lerMaisLink = document.querySelector('.descricao-problema a');

            pontos.style.display = 'none';
            restoDescricao.style.display = 'inline';
            lerMaisLink.style.display = 'none';
        })
    }
}

submitPesquisa.addEventListener("click", async function (event) {
    event.preventDefault();

    //Valida se o campo foi preenchido, retorna erro caso contrário
    if (inputPesquisa.value === '') {
        inputPesquisa.style.borderColor = 'red';
        return;
    }

    //Limpa marcadores da tela
    for (let i = 0; i < arrayMarcadores.length; i++) {
        mapa.removeLayer(arrayMarcadores[i]);
    }
    arrayMarcadores = [];
    arrayDivResultados = [];

    //Solicita o request de envio dos dados
    const resposta = await fetch('/mapa/pesquisa', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({pesquisa: inputPesquisa.value})
    })

    const dadosBusca = await resposta.json();

    if (resposta.status !== 200) {

        retornaErro('Algo deu errado, recarregue a página e tente novamente.')

    } else {

        //Limpa os resultados
        resultadoPesquisa.innerHTML = '';

        //Adiciona as informações no DOM
        if (dadosBusca.buscaRua.length !== 0) {

            for (let i = 0; i < dadosBusca.buscaRua.length; i++) {

                //Se a descrição for longa, encurta
                let descricaoCurta = '';
                if (dadosBusca.buscaRua[i].descricao.length > 0) {
                    if (dadosBusca.buscaRua[i].descricao.length > 30) {
                        descricaoCurta = dadosBusca.buscaRua[i].descricao.slice(0, 35) + '...';
                    } else {
                        descricaoCurta = dadosBusca.buscaRua[i].descricao;
                    }
                } else {
                    descricaoCurta = 'Problema sem descrição.';
                }

                //Converte a data
                let dataCriacao = new Date(dadosBusca.buscaRua[i].data_criacao);

                //Cria o elemento div do problema e seu conteúdo
                let divConteudo = document.createElement('div');
                divConteudo.classList.add('col-12', 'd-flex', 'flex-wrap', 'div-problemas');

                if (i % 2 !== 0) {
                    divConteudo.classList.add('cor-cinza');
                }

                divConteudo.innerHTML = `<p class="col-4 mb-1 p-pequena"><strong>ID: </strong>${dadosBusca.buscaRua[i].id}</p>
                                        <p class="col-8 mb-1 p-pequena"><strong>Data: </strong>${dataCriacao.getDate()}/${dataCriacao.getMonth()}/${dataCriacao.getFullYear()}</p>
                                        <h6 class="col-12 mb-1">${dadosBusca.buscaRua[i].tag.tag}</h6>
                                        <p class="col-12 mb-0">${descricaoCurta}</p>`;

                resultadoPesquisa.appendChild(divConteudo);
                arrayDivResultados.push(divConteudo);

                //Ajusta tamanho do popup
                let larguraPopup = 300;
                const tamanhoMapa = mapa.getSize();
                if (tamanhoMapa.x < 768) {
                    larguraPopup = tamanhoMapa.x * 0.80;
                } else {
                    larguraPopup = 400;
                }

                //Popup
                let conteudoPopup = document.createElement('div');
                conteudoPopup.classList.add('col-12', 'd-flex', 'flex-wrap', 'p-0');
                conteudoPopup.innerHTML = `<div class="col-12 p-0 container-image">
                                                <a href="#" onclick="abreZoom(event, '${dadosBusca.buscaRua[i].imagem}')">
                                                <img src="../images_problemas/${dadosBusca.buscaRua[i].imagem}" class="col-12 p-0 m-0 mb-2 imagem-problema">
                                                <p class="m-0 baixo-centro p-pequena">Clique para aumentar</p>
                                                </a>
                                            </div>
                                            <p class="col-6 m-0 mb-1 p-pequena"><strong>ID: </strong>${dadosBusca.buscaRua[i].id}</p>
                                            <p class="col-6 m-0 mb-1 p-pequena"><strong>Data: </strong>${dataCriacao.getDate()}/${dataCriacao.getMonth()}/${dataCriacao.getFullYear()}</p>
                                            <p class="col-12 m-0 mb-1 p-pequena"><strong>Status: </strong>${(dadosBusca.buscaRua[i].resolvido != 1 ? 'Não Resolvido' : 'Resolvido')}</p>
                                            <p class="col-8 m-0 p-pequena"><strong>Problema:</strong></p>
                                            <h6 class="col-12 mb-2">${dadosBusca.buscaRua[i].tag.tag}</h6>
                                            <p class="col-12 m-0 mb-2 descricao-problema"><strong>Descrição: </strong>${retornaDescricao(dadosBusca.buscaRua[i].descricao)}</p>`;
                
                //Adiciona marcador no mapa
                let marcador = L.marker([dadosBusca.buscaRua[i].endereco.geolocalizacao.coordinates[0], dadosBusca.buscaRua[i].endereco.geolocalizacao.coordinates[1]])
                .bindPopup(conteudoPopup, {
                    maxWidth: larguraPopup,
                    minWidth: larguraPopup
                }).addTo(mapa);
                arrayMarcadores.push(marcador);

                //Centraliza o mapa no marcador ao clicar no marcador
                arrayMarcadores[i].addEventListener("click", function (){
                    const valorDeslocamentoY = mapa.getSize().y*0.30;
                    let latlngOriginal = mapa.options.crs.latLngToPoint(this.getLatLng(), 17);
                    latlngOriginal.y -= valorDeslocamentoY;
                    const latlngNovo = mapa.options.crs.pointToLatLng(latlngOriginal, 17);
                    lerMais();

                    mapa.panTo(latlngNovo);
                });
                
                //Centraliza o mapa ao clicar em um dos resultados
                arrayDivResultados[i].addEventListener("click", function (){
                    
                    const valorDeslocamentoY = mapa.getSize().y*0.30;
                    let latlngOriginal = mapa.options.crs.latLngToPoint(arrayMarcadores[i].getLatLng(), 17);
                    latlngOriginal.y -= valorDeslocamentoY;
                    const latlngNovo = mapa.options.crs.pointToLatLng(latlngOriginal, 17);
                    
                    // mapa.closePopup();
                    arrayMarcadores[i].openPopup();
                    lerMais();

                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    mapa.panTo(latlngNovo);
                });
             
            }

            //Foca nos resultados da busca
            resultadoPesquisa.setAttribute('tabindex', '-1');
            resultadoPesquisa.focus();
            resultadoPesquisa.removeAttribute('tabindex');

        } else {
            retornaErro('Não foram encontrados resultados.')
        }
    }
})