const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const historyBtn = document.querySelector('.history');
const stopwatch = document.querySelector('.stopwatch');
const time = document.querySelector('.time');
const timeList = document.querySelector('.time-list');
const infoBtn = document.querySelector('.fa-question');
const modalShadow = document.querySelector('.modal-shadow');
const closeModalBtn = document.querySelector('.close');

const colorBtn = document.querySelector('.fa-paintbrush');
const colorOne = document.querySelector('.one');
const colorTwo = document.querySelector('.two');
const colorThree = document.querySelector('.three');
const colorFour = document.querySelector('.four');
const colorPanel = document.querySelector('.colors');

let root = document.documentElement;

let countTime;
let countSS;
let miliseconds = 0;
let seconds = 0;
let minutes = 0;
let timesArr = [];

const handleStart = () => {
	clearInterval(countTime);
	clearInterval(countSS);

	countSS = setInterval(() => {
		miliseconds++;
		if (miliseconds === 100) {
			miliseconds = 0;
			seconds++;
			if (seconds === 60) {
				seconds = 0;
				minutes++;
				if (minutes === 60) {
					return;
				}
			}
		}

		let ms = miliseconds < 10 ? '0' + miliseconds : miliseconds;
		let s = seconds < 10 ? '0' + seconds : seconds;
		let m = minutes < 10 ? '0' + minutes : minutes;

		stopwatch.innerHTML = `${m}:${s}:${ms}`;
	}, 10);
};
const handlePause = () => {
	clearInterval(countTime);
	clearInterval(countSS);
};

const initialStatus = () => {
	clearInterval(countTime);
	clearInterval(countSS);
	stopwatch.textContent = '00:00:00';
	miliseconds = 0;
	seconds = 0;
	minutes = 0;
	timeList.textContent = '';
};

const handleStop = () => {
	time.innerHTML = `Ostatni czas: ${stopwatch.textContent}`;

	if (stopwatch.textContent != '00:00:00') {
		time.style.visibility = 'visible';
		timesArr.push(stopwatch.textContent);
	}
	initialStatus();
};

const handleReset = () => {
	time.style.visibility = 'hidden';
	timesArr = [];

	initialStatus();
};
const showHistory = () => {
	let num = 1;

	timeList.textContent = '';

	timesArr.forEach(time => {
		const newTime = document.createElement('li');
		newTime.innerHTML = `Pomiar nr ${num}: <span>${time}</span>`;

		timeList.appendChild(newTime);
		num++;
	});
};
const showModal = () => {
	if (!(modalShadow.style.display === 'block')) {
		modalShadow.style.display = 'block';
	} else {
		modalShadow.style.display = 'none';
	}
	modalShadow.classList.toggle('modal-animation');
};

colorOne.addEventListener('click', () => {
	root.style.setProperty('--first-color', ' rgb(250, 20, 6)');
	colorPanel.classList.toggle('show-colors');
});
colorTwo.addEventListener('click', () => {
	root.style.setProperty('--first-color', ' rgb(6, 173, 250)');
	colorPanel.classList.toggle('show-colors');
});
colorThree.addEventListener('click', () => {
	root.style.setProperty('--first-color', ' rgb(0, 255, 42)');
	colorPanel.classList.toggle('show-colors');
});
colorFour.addEventListener('click', () => {
	root.style.setProperty('--first-color', ' rgb(250, 246, 6)');
	colorPanel.classList.toggle('show-colors');
});

startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', handlePause);
stopBtn.addEventListener('click', handleStop);
resetBtn.addEventListener('click', handleReset);
historyBtn.addEventListener('click', showHistory);

infoBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', showModal);
window.addEventListener('click', e => (e.target === modalShadow ? showModal() : false));

colorBtn.addEventListener('click', () => {
	colorPanel.classList.toggle('show-colors');
});
