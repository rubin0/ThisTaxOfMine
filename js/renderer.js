gIsGameOver = false;
gRefreshInterval = null;

let _gText = document.getElementById("text");
let money = document.getElementById("money");

function checkGameOver() {
	if (World.money <= 0) {
		clearInterval(gRefreshInterval);
		gIsGameOver = true;
		Notifications.create("GAME OVER :(");
		$("#bnRestart").show();
	}
}

function gameloop() {
	if (gIsGameOver) {
		return;
	}
	checkGameOver();
}

function onPayTaxes() {
	if (gIsGameOver) {
		return;
	}
	let t = -Math.floor((World.money * 0.9 * Math.random()+50))	;
	Notifications.create("You have paid " + t + " in taxes", t);
	World.setMoney(t);
	gameloop();
}

function onWork() {
	if (gIsGameOver) {
		return;
	}
	let wage = Math.floor(1000 * Math.random());
	Notifications.create("You have gained " + wage, wage);
	World.setMoney(wage);
	gameloop();
}

function onRestart() {
	if (gIsGameOver) {
		_gText.innerHTML = '<p id="start">You have to pay taxes.</p>';
		$("#bnRestart").hide();
		gIsGameOver = false;
		World.init();
		gRefreshInterval = setInterval(function () {
			onPayTaxes();
		}, 1000);
	}
}

$(document).ready(function () {
	World.init();
	//console.log( "Starting loop" );
	gRefreshInterval = setInterval(function () {
		onPayTaxes();
	}, 1000);
});
