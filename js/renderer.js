gInitialMoney = 5000;
gMoney = gInitialMoney;
gIsGameOver = false;

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
		gIsGameOver = true;
		_gText.appendChild(append("GAME OVER :("));
	}
}

function syncMoneyUI()
{
    money.innerHTML = "Money: " + gMoney;
}

function gameloop(){
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
	_gText.appendChild(append("You have paid " + t + " in taxes"));
	gMoney -= t;
	gameloop();
}

function onWork(){
	if (gIsGameOver)
	{
		return;
	}
	let wage = Math.floor(1000 * Math.random());
	_gText.appendChild(append("You have gained " + wage + " $."));
	gMoney += wage;
	gameloop();
}

$( document ).ready(function() {
	console.log( "Starting loop" );
	setInterval(function(){ 
		onPayTaxes();
	}, 1000);
});
