gInitialMoney = 5000;
gMoney = gInitialMoney;
gIsGameOver = false;
gRefreshInterval = null;

let _gText = document.getElementById("text");
let money = document.getElementById("money");

function append(text)
{
	let child = document.createElement('p');
	child.innerHTML = text;

	var searchEles = _gText.children;
	if(searchEles.length > 10){
		searchEles[0].remove();
	}

    return child;
}

function checkGameOver()
{
	if (gMoney <= 0)
	{
		clearInterval(gRefreshInterval);
		gIsGameOver = true;
		_gText.appendChild(append("GAME OVER :("));
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
	let t = Math.floor(gInitialMoney*0.9 * Math.random());
	_gText.appendChild(append("You have paid " + t + " in taxes")).className += "bold";
	gMoney -= t;
	gameloop();
}

function onWork()
{
	if (gIsGameOver)
	{
		return;
	}
	let wage = Math.floor(1000 * Math.random());
	_gText.appendChild(append("You have gained " + wage + " $."));
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
