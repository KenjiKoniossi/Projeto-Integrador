const inputPesquisa = document.getElementById('input-pesquisa');
const submitPesquisa = document.getElementById('submit-pesquisa');
const resultadoPesquisa = document.getElementById('resultado-pesquisa');

//Criando mapa com LeafletJS
const mapa = L.map('div-mapa', {zoomControl: false}).setView([-23.5506507, -46.6333824], 17);

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

inputPesquisa.addEventListener('keypress', function () {

    inputPesquisa.style.borderColor = '';
})

submitPesquisa.addEventListener("click", async function (event) {
    event.preventDefault();

    //Valida se o campo foi preenchido, retorna erro caso contrário
    if (inputPesquisa.value === '') {
        inputPesquisa.style.borderColor = 'red';
        return;
    }

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

        //Caso retorne erro, mostrar frase
        let divConteudo = document.createElement('div');
        divConteudo.classList.add('col-12', 'div-problemas');
        let pConteudo = document.createElement('p');
        pConteudo.innerText = 'Algo deu errado, recarregue a página e tente novamente.'
        divConteudo.appendChild(pConteudo);
        resultadoPesquisa.appendChild(divConteudo);

    } else {

        //Limpa os resultados
        resultadoPesquisa.innerHTML = '';

        //Adiciona as informações no DOM
        if (dadosBusca.buscaRua.length !== 0) {

            for (let i = 0; i < dadosBusca.buscaRua.length; i++) {

                let divConteudo = document.createElement('div');
                divConteudo.classList.add('col-12', 'div-problemas');
                let h5Conteudo = document.createElement('h5');

                h5Conteudo.innerText = dadosBusca.buscaRua[i].tag.tag;

                let pConteudo = document.createElement('p');

                if (dadosBusca.buscaRua[i].descricao.length > 0) {
                    if (dadosBusca.buscaRua[i].descricao.length > 30) {
                        pConteudo.innerText = dadosBusca.buscaRua[i].descricao.split(0, 29) + '...';
                    } else {
                        pConteudo.innerText = dadosBusca.buscaRua[i].descricao;
                    }
                } else {
                    pConteudo.innerText = 'Problema sem descrição.';
                }

                divConteudo.appendChild(h5Conteudo);
                divConteudo.appendChild(pConteudo);
                resultadoPesquisa.appendChild(divConteudo);

            }

        } else {

            //Caso retorne vazio, mostrar frase
            let divConteudo = document.createElement('div');
            divConteudo.classList.add('col-12', 'div-problemas');
            let pConteudo = document.createElement('p');
            pConteudo.innerText = 'Não foram encontrados resultados.'
            divConteudo.appendChild(pConteudo);
            resultadoPesquisa.appendChild(divConteudo);
        }
    }
})