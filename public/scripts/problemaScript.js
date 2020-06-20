let caixaOutro = document.getElementById('defaultCheck8');
let radioOutro = document.getElementById('defaultCheck7');
let radioButton = document.querySelectorAll('input[type=radio]');
let enviarBotao = document.getElementById('enviarBotao');
let formProblema = document.querySelectorAll('#formProblema');
let inputTextarea = document.getElementById('exampleFormControlTextarea1');
let alertTopo = document.querySelector('.alert');
let alertaBaixo = document.getElementById('alertaBaixo');
let inputLongitude = document.getElementById('inputLongitude');
let inputLatitude = document.getElementById('inputLatitude');

let camposObrigatorios = [
    document.querySelectorAll('input[type=radio]'),
    document.getElementById('inputCEP'),
    document.getElementById('inputAddress'),
    document.getElementById('inputBairro'),
    document.getElementById('inputNumero'),
    document.getElementById('inputCidade'),
    document.getElementById('inputEstado'),
]

let urlSearch = new URLSearchParams(window.location.search);

//Alerta confirmando o envio
if (urlSearch.has('sucesso')) {
    alertTopo.classList.add('alert-success');
    alertTopo.innerHTML += '<strong>Problema enviado com sucesso!</strong> Obrigado por contribuir!'
    alertTopo.classList.remove('d-none');
}

//Alerta informando o erro
if (urlSearch.has('erro')) {
    alertTopo.classList.add('alert-danger');
    switch (urlSearch.get('erro')) {
        case 'problema':
            alertTopo.innerHTML += '<strong>Erro!</strong> Problema selecionado inválido ou não escolhido';
            break;

        case 'problema-outro':
            alertTopo.innerHTML += '<strong>Erro!</strong> Opção "Outro" inválida ou não preenchida';
            break;
            
        case 'descricao':
            alertTopo.innerHTML += '<strong>Erro!</strong> Descrição inválida ou não preenchida';
            break;
            
        case 'cep':
            alertTopo.innerHTML += '<strong>Erro!</strong> CEP inválido ou não preenchido';
            break;
            
        case 'rua':
            alertTopo.innerHTML += '<strong>Erro!</strong> Rua inválida ou não preenchida';
            break;
            
        case 'numero':
            alertTopo.innerHTML += '<strong>Erro!</strong> Número inválido ou não preenchido';
            break;
            
        case 'bairro':
            alertTopo.innerHTML += '<strong>Erro!</strong> Bairro inválido ou não preenchido';
            break;
            
        case 'cidade':
            alertTopo.innerHTML += '<strong>Erro!</strong> CIdade inválida ou não preenchida';
            break;
            
        case 'estado':
            alertTopo.innerHTML += '<strong>Erro!</strong> Estado inválido ou não preenchido';
            break;
    }
    alertTopo.classList.remove('d-none');
}

//Adicionar evento Keypress nos inputs para remover a cor vermelha
function mudaCor (elemento) {
    elemento.addEventListener('keypress', function () {
        elemento.style.borderColor = '';
    })
}

//Se input estiver vázio destaca com vermelho
function verificaVazio (elemento) {
    elemento.addEventListener('focusout', function () {
        if (elemento.value === '') {
            elemento.style.borderColor = 'red';
        }
    })
}

//Uso de for para maior compatibilidade nos navegadores
for (let i = 1; i < camposObrigatorios.length; i++) {
    mudaCor(camposObrigatorios[i]);
    verificaVazio(camposObrigatorios[i]);
}

//Caixa do campo Outro
caixaOutro.addEventListener('focusout', function () {
    if (radioOutro.checked) {
        verificaVazio(caixaOutro);
    }
})

//Seleciona a opção Outro ao clicar na caixa de texto
caixaOutro.addEventListener('click', function () {
    radioOutro.click();
});

//Muda cor da caixa Outro ao clicar em outra opção
for (let i = 0; i < 6; i++) {
    radioButton[i].addEventListener('click', function () {
        caixaOutro.style.borderColor = '';
    });
};

//Apaga o valor da caixa de texto caso clique em outra opção diferente de Outro
// for (let i = 0; i < 6; i++) {
//     radioButton[i].addEventListener('click', function () {
//         caixaOutro.value = '';
//     });
// };

//Função que limpa a caixa do CEP, destaca em vermelho, retorna os exemplos e bloqueia os demais inputs
function limpaCEP () {
    camposObrigatorios[1].value = '';
    camposObrigatorios[1].style.borderColor = 'red';
    
    camposObrigatorios[2].value = 'Ex: Av. Do Estado';
    camposObrigatorios[3].value = 'Ex: Bairro da Liberdade';
    camposObrigatorios[5].value = 'Ex: São Paulo';
    camposObrigatorios[6].value = 'Ex: SP';

    camposObrigatorios[2].setAttribute('disabled', true);
    camposObrigatorios[3].setAttribute('disabled', true);
    camposObrigatorios[5].setAttribute('disabled', true);
    camposObrigatorios[6].setAttribute('disabled', true);
}

//Valida o CEP e completa endereço por API
camposObrigatorios[1].addEventListener('blur', function () {
    let valorCEP = camposObrigatorios[1].value.replace(/\D/g, '');

    if (valorCEP != '') {
        let validaCEP = /^[0-9]{8}$/;
        if (validaCEP.test(valorCEP)) {
            camposObrigatorios[2].value = 'Carregando...';
            camposObrigatorios[3].value = 'Carregando...';
            camposObrigatorios[5].value = 'Carregando...';
            camposObrigatorios[6].value = 'Carregando...';

            fetch('https://viacep.com.br/ws/' + valorCEP + '/json/')
                .then(function (resultado) {
                    return resultado.json();
                })
                .then (function (resultadoJSON) {
                    if (!resultadoJSON.erro) {

                        //Preenche os dados
                        camposObrigatorios[2].value = resultadoJSON.logradouro;
                        camposObrigatorios[3].value = resultadoJSON.bairro;
                        camposObrigatorios[5].value = resultadoJSON.localidade;
                        camposObrigatorios[6].value = resultadoJSON.uf;
                        
                        //Desbloqueia os campos
                        camposObrigatorios[2].removeAttribute('disabled');
                        camposObrigatorios[3].removeAttribute('disabled');
                        camposObrigatorios[5].removeAttribute('disabled');
                        camposObrigatorios[6].removeAttribute('disabled');
                        
                    } else {
                        limpaCEP();
                    }
                })
        } else {
            limpaCEP();
        }
    } else {
        limpaCEP();
    }
});

//Converte endereço em geocode
async function converteParaGeo(endereco, lat, lng) {

    //Endereço completo: NUMERO + RUA + BAIRRO + CIDADE
    const enderecoCompleto = endereco[4].value + '+' + endereco[2].value + '+' + endereco[3].value + '+' + endereco[5].value;

    const API_KEY = '';
    const resposta = await fetch('https://maps.googleapis.com/maps/api/geocode/json?key=' + API_KEY + '&address=' + enderecoCompleto);
    const dados = await resposta.json();

    lng.value = dados.results[0].geometry.location.lng;
    lat.value = dados.results[0].geometry.location.lat;
}

//Verifica se todos os campos com required foram preenchidos, caso positivo abre modal
enviarBotao.addEventListener("click", function () {
    let campoPreenchido = false;
    let textoErro = '';

    // Verifica se os campos estão vazios
    for (let i = 0; i < camposObrigatorios[0].length; i++) {
        if (camposObrigatorios[0][i].checked === true) {

            //Verifica demais campos além do radio
            for (let j = 1; j < camposObrigatorios.length; j++) {
                if (camposObrigatorios[j].value === '') {
                    campoPreenchido = false;
                    // camposObrigatorios[j].style.borderColor= 'red';
                    textoErro = camposObrigatorios[j].name;
                    let primeiraLetra = camposObrigatorios[j].name.charAt(0).toUpperCase();
                    textoErro = primeiraLetra + textoErro.slice(1);
                    break;

                } else {
                    campoPreenchido = true;
                }
            }
        }
    }

    if (textoErro === '') {
        textoErro = 'Seleção do problema';
    } else if (textoErro === 'Cep') {
        textoErro = textoErro.toUpperCase();
    }

    if (campoPreenchido) {

        converteParaGeo(camposObrigatorios, inputLatitude, inputLongitude);

        //Removido data-target="#exampleModal" do botão de enviar
        window.$("#exampleModal").modal('show');
    } else {
        alertaBaixo.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Campo <strong>' + textoErro + '</strong> não preenchido ou selecionado.';
        alertaBaixo.classList.remove('d-none');
    };
  });
