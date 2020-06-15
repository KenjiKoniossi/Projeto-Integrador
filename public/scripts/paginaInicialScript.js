let botaoNewsletter = document.querySelector('#form-newsletter button');
let emailNewsletter = document.getElementById('email-newsletter');
let textoErro = document.getElementById('erro-newsletter');

// let textoErro = document.createElement('p');
// textoErro.setAttribute('id', 'erro-newsletter');


emailNewsletter.addEventListener('keypress', function () {

    emailNewsletter.style.borderColor = '';

    //Valida se é um email
    let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(emailNewsletter.value)) {
        textoErro.innerHTML = 'Email inválido';
        emailNewsletter.after(textoErro);
    } else {
        textoErro.innerHTML = '';
    }

})


botaoNewsletter.addEventListener('click', async function (event) {
    event.preventDefault();

    //Valida se o campo foi preenchido, retorna erro caso contrário
    if (emailNewsletter.value === '') {
        emailNewsletter.style.borderColor = 'red';
        return;
    }

    //Solicita o request de envio dos dados
    const resposta = await fetch('/newsletter', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({email: emailNewsletter.value})
    })
    
    //Apaga os elementos e adiciona a frase de sucesso ou erro

})