let botaoNewsletter = document.querySelector('#form-newsletter button');
let emailNewsletter = document.getElementById('email-newsletter');

botaoNewsletter.addEventListener('click', async function (event) {
    event.preventDefault();

    //Valida se o campo foi preenchido, retorna erro caso contrário

    //Valida se é um email

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