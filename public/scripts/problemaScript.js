let caixaOutro = document.getElementById('defaultCheck8');
let radioOutro = document.getElementById('defaultCheck7');
let radioButton = document.querySelectorAll('input[type=radio]');
let enviarBotao = document.getElementById('enviarBotao');
let formProblema = document.querySelectorAll('#formProblema');
let inputTextarea = document.getElementById('exampleFormControlTextarea1');
let alertTopo = document.querySelector('.alert');
let alertaBaixo = document.getElementById('alertaBaixo');

let camposObrigatorios = [
    document.querySelectorAll('input[type=radio]'),
    document.getElementById('inputEstado'),
    document.getElementById('inputCidade'),
    document.getElementById('inputBairro'),
    document.getElementById('inputAddress'),
    document.getElementById('inputCEP'),
    document.getElementById('inputNumero'),
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
    camposObrigatorios[5].value = '';
    camposObrigatorios[5].style.borderColor = 'red';
    
    camposObrigatorios[4].value = 'Ex: Av. Do Estado';
    camposObrigatorios[3].value = 'Ex: Bairro da Liberdade';
    camposObrigatorios[2].value = 'Ex: São Paulo';
    camposObrigatorios[1].value = 'Ex: SP';

    camposObrigatorios[4].setAttribute('disabled', true);
    camposObrigatorios[3].setAttribute('disabled', true);
    camposObrigatorios[2].setAttribute('disabled', true);
    camposObrigatorios[1].setAttribute('disabled', true);
}

//Valida o CEP e completa endereço por API
camposObrigatorios[5].addEventListener('blur', function () {
    let valorCEP = camposObrigatorios[5].value.replace(/\D/g, '');

    if (valorCEP != '') {
        let validaCEP = /^[0-9]{8}$/;
        if (validaCEP.test(valorCEP)) {
            camposObrigatorios[4].value = 'Carregando...';
            camposObrigatorios[3].value = 'Carregando...';
            camposObrigatorios[2].value = 'Carregando...';
            camposObrigatorios[1].value = 'Carregando...';

            fetch('https://viacep.com.br/ws/' + valorCEP + '/json/')
                .then(function (resultado) {
                    return resultado.json();
                })
                .then (function (resultadoJSON) {
                    if (!resultadoJSON.erro) {

                        //Preenche os dados
                        camposObrigatorios[4].value = resultadoJSON.logradouro;
                        camposObrigatorios[3].value = resultadoJSON.bairro;
                        camposObrigatorios[2].value = resultadoJSON.localidade;
                        camposObrigatorios[1].value = resultadoJSON.uf;
                        
                        //Desbloqueia os campos
                        camposObrigatorios[4].removeAttribute('disabled');
                        camposObrigatorios[3].removeAttribute('disabled');
                        camposObrigatorios[2].removeAttribute('disabled');
                        camposObrigatorios[1].removeAttribute('disabled');
                        
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


//Verifica se todos os campos com required foram preenchidos, caso positivo abre modal
enviarBotao.addEventListener("click", function () {
    let campoPreenchido = true;

    //Verifica se os campos estão vazios
    // for (let i = 0; i < camposObrigatorios[0].length; i++) {
    //     if (camposObrigatorios[0][i].checked === true) {
    //         //Verifica demais campos além do radio
    //         for (let i = 1; i < camposObrigatorios.length; i++) {
    //             if (camposObrigatorios[i].value === '') {
    //                 campoPreenchido = false;
    //             }
    //         }
    //     }
    //     campoPreenchido = false;
    // }
    
    if (campoPreenchido) {
        //Removido data-target="#exampleModal" do botão de enviar
        window.$("#exampleModal").modal('show');
    } else {
        alertaBaixo.innerHTML += '<strong>Erro!</strong> Algumas informações estão faltando!'
        alertaBaixo.classList.remove('d-none');
    };
  });