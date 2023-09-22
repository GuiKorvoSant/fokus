const documentHTML = document.querySelector('html');

const focoBtn = document.querySelector('.app__card-button--foco');
const descansoCurtoBtn = document.querySelector('.app__card-button--curto');
const descansoLongoBtn = document.querySelector('.app__card-button--longo');
const startPauseBtn = document.querySelector('#start-pause');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const iniciarOuPausarBtnIcone = document.querySelector(
	'.app__card-primary-butto-icon'
);
const temporizador = document.querySelector('#timer');

const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const listaBotoes = document.querySelectorAll('.app__card-button');

let tempoDecorrido = 1500;
let intervaloId = null;

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;

const audioPause = new Audio('./sons/pause.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioTempoAcabou = new Audio('./sons/beep.mp3');

musicaFocoInput.addEventListener('change', () => {
	if (musica.paused) {
		musica.play();
	} else {
		musica.pause();
	}
});

focoBtn.addEventListener('click', () => {
	tempoDecorrido = 1500;
	alteraContexto('foco');
	focoBtn.classList.add('active');
});

descansoCurtoBtn.addEventListener('click', () => {
	tempoDecorrido = 300;
	alteraContexto('descanso-curto');
	descansoCurtoBtn.classList.add('active');
});

descansoLongoBtn.addEventListener('click', () => {
	tempoDecorrido = 900;
	alteraContexto('descanso-longo');
	descansoLongoBtn.classList.add('active');
});

function alteraContexto(contexto) {
	exibeTemporizador();
	listaBotoes.forEach(function (contexto) {
		contexto.classList.remove('active');
	});

	documentHTML.setAttribute('data-contexto', contexto);
	banner.setAttribute('src', `./imagens/${contexto}.png`);

	switch (contexto) {
		case 'foco':
			titulo.innerHTML = `
			Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa.</strong>
			`;
			break;

		case 'descanso-curto':
			titulo.innerHTML = `
			Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
			`;
			break;

		case 'descanso-longo':
			titulo.innerHTML = `
			Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa!</strong>
			`;
			break;

		default:
			break;
	}
}

//ARROW FUNCTION
const contagemRegressiva = () => {
	if (tempoDecorrido <= 0) {
		// audioTempoAcabou.play(); DESCOMENTAR ANTES DE COMMITAR
		alert('Tempo finalizado!');
		zerarTemporizador();
		return;
	}

	tempoDecorrido -= 1;
	exibeTemporizador();
};

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
	if (intervaloId) {
		audioPause.play();
		zerarTemporizador();
		return;
	}
	audioPlay.play();
	intervaloId = setInterval(contagemRegressiva, 1000);
	iniciarOuPausarBtn.textContent = 'Pausar';
	iniciarOuPausarBtnIcone.setAttribute('src', `./imagens/pause.png`);
}

function zerarTemporizador() {
	clearInterval(intervaloId);
	iniciarOuPausarBtn.textContent = 'Começar';
	iniciarOuPausarBtnIcone.setAttribute('src', `./imagens/play_arrow.png`);
	intervaloId = null;
}

function exibeTemporizador() {
	const tempo = new Date(tempoDecorrido * 1000);
	const tempoFormatado = tempo.toLocaleTimeString('pt-br', {
		minute: '2-digit',
		second: '2-digit',
	});
	temporizador.innerHTML = `${tempoFormatado}`;
}

exibeTemporizador();
