'use strict';

function onPayTaxes() {
	if (World.gIsGameOver) {
		return;
	}
	let t = -Math.floor((World.money * 0.9 * Math.random() + 50));
	Notifications.create("You have paid " + Math.abs(t) + " in taxes", t);
	World.addMoney(t);

}

function onWork() {
	if (World.gIsGameOver) {
		return;
	}
	let wage = Math.floor(1000 * Math.random());
	Notifications.create("You have gained " + wage, wage);
	World.addMoney(wage);
	World.syncUI();
}

function onRestart() {
	saveScore();
	World.init();
	World.start();
}

function onStart() {
	if (login()) {
		World.init();
		World.start();
	}
}

function login() {
	var username = $('#inputStart').val();
	if (!(username === '')) {
		$('#inputStart').hide();
		$('#bnStart').hide();
		$('#username').text('Logged as: ' + username);
		$('#username').show();
		$('#errorUsername').hide();
		localStorage.username = username;
		return true;
	} else {
		$('#errorUsername').text('Inserire un username corretto!');
		$('#errorUsername').show();
		return false;
	}
}

function saveScore() {
	$.post('https://backend-ttom.herokuapp.com/users', { username: localStorage.username, score: World.score },
		function (returnedData) {
			console.log(returnedData);
		});
}

$(document).ready(function () {
	World.init();
});

//DA SISTEMARE

function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined") {
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		xhr = null;
	}
	return xhr;
}

function makeCorsRequest(url, method, param) {
	var xhr = createCORSRequest(method, url);
	if (!xhr) {
		alert('CORS not supported');
		return;
	}

	xhr.onerror = function () {
		console.log('Error.');
	};

	xhr.send(param);

	return xhr.responseText;
}
