let caixaOutro = document.getElementById('defaultCheck8');
let radioOutro = document.getElementById('defaultCheck7');
let radioButton = document.querySelectorAll('input[type=radio]');
let enviarBotao = document.getElementById('enviarBotao');
let formProblema = document.querySelectorAll('#formProblema');
let inputCEP = document.getElementById('inputCEP');
let inputRua = document.getElementById('inputAddress');
let inputBairro = document.getElementById('inputBairro');
let inputCidade = document.getElementById('inputCidade');
let inputEstado = document.getElementById('inputEstado');
let alertDanger = document.querySelector('.alert-danger');

let urlSearch = new URLSearchParams(window.location.search);

if (urlSearch.has('sucesso')) {

    alertDanger.classList.remove('alert-danger');
    alertDanger.classList.add('alert-success');
    alertDanger.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Problema enviado com sucesso!</strong> Obrigado por contribuir!'

    alertDanger.classList.remove('d-none');

}

if (urlSearch.has('erro')) {
    switch (urlSearch.get('erro')) {
        case 'problema':
            alertDanger.innerHTML += '<strong> Problema selecionado inválido ou não escolhido</strong>';
            break;

        case 'problema-outro':
            alertDanger.innerHTML += '<strong> Opção "Outro" inválida ou não preenchida</strong>';
            break;
            
        case 'descricao':
            alertDanger.innerHTML += '<strong> Descrição inválida ou não preenchida</strong>';
            break;
            
        case 'cep':
            alertDanger.innerHTML += '<strong> CEP inválido ou não preenchido</strong>';
            break;
            
        case 'rua':
            alertDanger.innerHTML += '<strong> Rua inválida ou não preenchida</strong>';
            break;
            
        case 'numero':
            alertDanger.innerHTML += '<strong> Número inválido ou não preenchido</strong>';
            break;
            
        case 'bairro':
            alertDanger.innerHTML += '<strong> Bairro inválido ou não preenchido</strong>';
            break;
            
        case 'cidade':
            alertDanger.innerHTML += '<strong> CIdade inválida ou não preenchida</strong>';
            break;
            
        case 'estado':
            alertDanger.innerHTML += '<strong> Estado inválido ou não preenchido</strong>';
            break;
            
    }

    alertDanger.classList.remove('d-none');
}

//Seleciona a opção Outro ao clicar na caixa de texto
caixaOutro.addEventListener('click', function () {
    radioOutro.click();
});

//Apaga o valor da caixa de texto caso clique em outra opção diferente de Outro
//Uso de for para maior compatibilidade nos navegadores
for (let i = 0; i < 6; i++) {
    radioButton[i].addEventListener('click', function () {
        caixaOutro.value = '';
    });
};

function limpaCEP () {
    inputCEP.value = '';
    inputCEP.style.borderColor = 'red';
    
    inputRua.value = 'Ex: Av. Do Estado';
    inputBairro.value = 'Ex: Bairro da Liberdade';
    inputCidade.value = 'Ex: São Paulo';
    inputEstado.value = 'Ex: SP';

    inputRua.setAttribute('disabled', true);
    inputBairro.setAttribute('disabled', true);
    inputCidade.setAttribute('disabled', true);
    inputEstado.setAttribute('disabled', true);
}

//Valida o CEP e completa endereço por API
inputCEP.addEventListener('blur', function () {
    if (inputCEP.value != '') {
        let validaCEP = /^[0-9]{8}$/;
        if (validaCEP.test(inputCEP.value)) {
            inputRua.value = 'Carregando...';
            inputBairro.value = 'Carregando...';
            inputCidade.value = 'Carregando...';
            inputEstado.value = 'Carregando...';

            fetch('https://viacep.com.br/ws/' + inputCEP.value + '/json/')
                .then(function (resultado) {
                    return resultado.json();
                })
                .then (function (resultadoJSON) {
                    if (!resultadoJSON.erro) {

                        //Preenche os dados
                        inputRua.value = resultadoJSON.logradouro;
                        inputBairro.value = resultadoJSON.bairro;
                        inputCidade.value = resultadoJSON.localidade;
                        inputEstado.value = resultadoJSON.uf;
                        
                        //Desbloqueia os campos
                        inputRua.removeAttribute('disabled');
                        inputBairro.removeAttribute('disabled');
                        inputCidade.removeAttribute('disabled');
                        inputEstado.removeAttribute('disabled');
                        
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
    for (let i=0; i < formProblema[0].length; i++) {
        if (formProblema[0][i].type != 'radio' && formProblema[0][i].type != 'button' && 
            formProblema[0][i].type != 'file' && formProblema[0][i].type != 'submit' &&
            formProblema[0][i].required == true && formProblema[0][i].value == '') {
            
            campoPreenchido = false;
            
            //Destaca os campos vazios
            formProblema[0][i].style.borderColor = 'red';
        };
    }

    if (campoPreenchido) {
        //Removido data-target="#exampleModal" do butão de enviar
        window.$("#exampleModal").modal('show');
    };
  });
