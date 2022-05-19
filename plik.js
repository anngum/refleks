var start = false; //klikanie przycisku
var click = false; // klikanie po polu
var timeColour;
var timeClick;
var avgTime;
var minTime = 999999;
var maxTime = 0;
var sumTime = 0;
var colours = ['green', 'blue', 'yellow', 'red', 'magenta', 'cyan', 'grey', 'pink'];
var prevColour = 100;

var gameStep;
var num = 5;

// ------------- FUNKCJA WYCZYSZCZENIA GRY --------------------
function clearGame() {
	start = false;
	gamestep = 0;
	sumTime = 0;
	avgTime = undefined;
	document.getElementById('przycisk').innerHTML = "Start";
	document.getElementById('pole-gry').style['background-color'] = document.fgColor;
	document.getElementById('pole-gry').style['display'] = 'none';
	document.getElementById('pole-gry').innerHTML = "";

	document.getElementById('ustawienia').style['display'] = 'block';
	//document.getElementById('statystyki').style['display'] = 'none';
	//document.getElementById('sredni').innerHTML = "&nbsp;";
	//document.getElementById('najdluzszy').innerHTML = "&nbsp;";
	//document.getElementById('najkrotszy').innerHTML = "&nbsp;";

}
// ------------- FUNKCJA USTAWIANIA PARAMETROW --------------------
function load() {
	document.getElementById('proby').value = num;
}

// ------------- FUNKCJA ZMIANY PARAMETROW --------------------	
function changeNum() {
	num = parseInt(document.getElementById('proby').value);
}

// ------------- FUNKCJA ZMIANY STATYSTYK --------------------	
function displayStat() {
	document.getElementById('sredni').innerHTML = avgTime;
	document.getElementById('najdluzszy').innerHTML = maxTime;
	document.getElementById('najkrotszy').innerHTML = minTime;
}
// ------------- FUNKCJA ZMIANY KOLORU POLA GRY --------------------	
function changeColour() {
	var randomColour;
	do {
		randomColour = parseInt(Math.random() * 10);
	}
	while (randomColour < 0 || randomColour >= colours.length || randomColour == prevColour);
	prevColour = randomColour;
	console.log('changeColour, new color:' + randomColour);
	document.getElementById('pole-gry').style['background-color'] = colours[randomColour];

}
// ------------- FUNKCJA OBLICZANIA ŚREDNIEJ --------------------
function funAvgTime() {
	var timeMs = timeClick - timeColour;
	console.log("clicked after " + timeMs + " [ms]");
	sumTime += timeMs;
	avgTime = sumTime / (gameStep + 1);
	if (timeMs > maxTime) maxTime = timeMs;
	if (timeMs < minTime) minTime = timeMs;
}

// ------------- FUNKCJA ODCZYTANIA CZASU KLIKNIECIA --------------------
function readTime() {
	if (!click) {
		click = true;
		console.log("clicked");
		timeClick = Date.now();
		funAvgTime();
		displayStat();
		document.getElementById('statystyki').style['display'] = 'block';


	}
}

// ------------- FUNKCJA ZMIANY CZASU PO KTÓRYM NASTĘPUJE ZMIANA KOLORU POLA GRY --------------------
function nextGameStep() {
	console.log('===============   nextGameStep');

	gameStep++;
	console.log('gameStep:' + gameStep);

	if (gameStep <= num) {
		changeColour();
		timeColour = Date.now();
		click = false;
		var randomTime = parseInt(Math.random() * 3000 + 1000);
		//document.getElementById('kontrola').innerHTML=randomTime;
		setTimeout(() => nextGameStep(), randomTime);
		//setTimeout(timeToChangeColour, randomTime);
	} else {
		document.getElementById('pole-gry').innerHTML = "Gra zakończona";
		document.getElementById('pole-gry').style['background-color'] = document.fgColor;
		setTimeout(() => clearGame(), 2000);
	}


}

// ------------- FUNKCJA URUCHOMIENIA GRY --------------------
function playGame() {
	gameStep = 0;
	document.getElementById('pole-gry').innerHTML = "";

	nextGameStep();



}




// ------------- FUNKCJA OBSŁUGI PRZYCISKU --------------------
function startStopGame() {
	if (start == false) {
		start = true;
		click = false;
		avgTime =0;
		minTime = 999999;
		maxTime = 0;
		sumTime = 0;


		document.getElementById('przycisk').innerHTML = "STOP";
		document.getElementById('pole-gry').style['display'] = 'block';
		document.getElementById('pole-gry').innerHTML = "Gra rozpoczęta";
		//document.getElementById('ustawienia').style['display'] = 'none';
		setTimeout(() => playGame(), 2000);
	} else {
		clearGame();
	}
}
