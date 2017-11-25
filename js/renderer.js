gInitialMoney = 5000;
gMoney = gInitialMoney;
gIsGameOver = false;
gRefreshInterval = null;

let _gText = document.getElementById("text");
let money = document.getElementById("money");

function checkGameOver()
{
	if (gMoney <= 0)
	{
		clearInterval(gRefreshInterval);
		gIsGameOver = true;
		Notifications.create("GAME OVER :(");
		$("#bnRestart").show();
	}
}

function syncMoneyUI()
{
    money.innerHTML = "Money: " + gMoney;
}

function gameloop()
{
	if (gIsGameOver)
	{
		return;
	}
	syncMoneyUI();
	checkGameOver();
}

function onPayTaxes()
{
	if (gIsGameOver)
	{
		return;
	}
	let t = -Math.floor(gInitialMoney*0.9 * Math.random());
	Notifications.create("You have paid " + t + " in taxes", t);
	gMoney += t;
	gameloop();
}

function onWork()
{
	if (gIsGameOver)
	{
		return;
	}
	let wage = Math.floor(1000 * Math.random());
	Notifications.create("You have gained " + wage, wage);
	console.log(_gText);
	gMoney += wage;
	gameloop();
}

function onRestart()
{
	if (gIsGameOver)
	{
		_gText.innerHTML = '<p id="start">You have to pay taxes.</p>';
		gMoney = gInitialMoney;
		$("#bnRestart").hide();
		gIsGameOver = false;
		syncMoneyUI();
		gRefreshInterval = setInterval(function(){
			onPayTaxes();
		}, 1000);
	}
}

$( document ).ready(function() {
	//console.log( "Starting loop" );
	gRefreshInterval = setInterval(function(){ 
		onPayTaxes();
	}, 1000);
});
