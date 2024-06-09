let listaNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let attempts = 1;

// Função que exibe na tela o conteúdo a que se refere as TAGS
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'UK English Female', { rate: 1.2 });
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Secret number game');
    exibirTextoNaTela('p', 'choose a number between 1 and 100');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'got it right!');
        let palavraTentativa = attempts > 1 ? 'attempts' : 'attempt';
        let mensagemAttempts = `You discovered the secret number with ${attempts} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemAttempts);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'The secret number is smaller!')
        } else {
            exibirTextoNaTela('p', 'The secret number is bigger!')
        }
        attempts++;
        limparCampo();
    }
}

// Gera um número INTEIRO aleatório de 1 a 100
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    attempts = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
