const documentHTML = document.querySelector('html');

const focoBtn = document.querySelector('.app__card-button--foco');
const descansoCurtoBtn = document.querySelector('.app__card-button--curto');
const descansoLongoBtn = document.querySelector('.app__card-button--longo');
const startPauseBtn = document.querySelector('#start-pause');

const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const listaBotoes = document.querySelectorAll('.app__card-button');

let tempoDecorrido = 5;
let intervaloId = null;

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
	if (musica.paused) {
		musica.play();
	} else {
		musica.pause();
	}
});

focoBtn.addEventListener('click', () => {
	alteraContexto('foco');
	focoBtn.classList.add('active');
});

descansoCurtoBtn.addEventListener('click', () => {
	alteraContexto('descanso-curto');
	descansoCurtoBtn.classList.add('active');
});

descansoLongoBtn.addEventListener('click', () => {
	alteraContexto('descanso-longo');
	descansoLongoBtn.classList.add('active');
});

function alteraContexto(contexto) {
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
		zerarTemporizador();
		alert('Tempo finalizado!');
		return;
	}

	iniciarOuPausar();
	tempoDecorrido -= 1;
	console.log('Temporizador: ' + tempoDecorrido);
};

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
	if (intervaloId) {
		zerarTemporizador();
		return;
	}
	intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerarTemporizador() {
	clearInterval(intervaloId);
	intervaloId = null;
}
