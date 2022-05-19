var start = false; //klikanie przycisku
var waitingForClick = false; // klikanie po polu
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

var stepTimeoutHandler;

// ------------- FUNKCJA WYCZYSZCZENIA GRY --------------------
function clearGame() {
	start = false;
	waitingForClick = false;
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
function displayStats() {
	let min,max,avg;
	if(typeof minTime !== 'undefined'){
		avg = avgTime.toFixed(1) + ' [ms]';
		max = maxTime + ' [ms]';
		min = minTime + ' [ms]';
		document.getElementById('statystyki').style['display'] = 'block';
	} else {
		min='&nbsp;';
		max='&nbsp;';
		avg='&nbsp;';
		document.getElementById('statystyki').style['display'] = 'none';
	}
	document.getElementById('sredni').innerHTML = avg;
	document.getElementById('najdluzszy').innerHTML = max;
	document.getElementById('najkrotszy').innerHTML = min;
	// jak liczyć średnią, gdy ktoś w ogóle nie klinie?
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
	avgTime = sumTime / (gameStep);
	if (timeMs > maxTime) maxTime = timeMs;
	if (typeof minTime == 'undefined' || timeMs < minTime) minTime = timeMs;
}

// ------------- FUNKCJA ODCZYTANIA CZASU KLIKNIECIA --------------------
function readTime() {
	if (waitingForClick) {
		waitingForClick = false;
		console.log("clicked");
		timeClick = Date.now();
		funAvgTime();
		displayStats();
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
		waitingForClick = true;
		var randomTime = parseInt(Math.random() * 3000 + 1000);
		console.log('time:' + randomTime);
		//document.getElementById('kontrola').innerHTML=randomTime;
		stepTimeoutHandler = setTimeout(() => nextGameStep(), randomTime);
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
	document.getElementById('przycisk').innerHTML = "STOP";
	document.getElementById('przycisk').disabled = false;

	nextGameStep();
}




// ------------- FUNKCJA OBSŁUGI PRZYCISKU --------------------
function startStopGame() {
	if (start == false) {
		start = true;
		avgTime =0;
		minTime = undefined;
		maxTime = 0;
		sumTime = 0;
		displayStats();

		document.getElementById('przycisk').innerHTML = "Uruchamianie...";
		document.getElementById('przycisk').disabled = true;
		document.getElementById('pole-gry').style['display'] = 'block';
		document.getElementById('pole-gry').innerHTML = "Gra rozpoczęta";
		//document.getElementById('ustawienia').style['display'] = 'none';
		setTimeout(() => playGame(), 2000);
	} else {
		clearTimeout(stepTimeoutHandler);
		clearGame();
	}
}
