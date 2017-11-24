gInitialMoney = 1000;
gMoney = gInitialMoney;
gIsGameOver = false;

let _gText = document.getElementById("text");
let money = document.getElementById("money");

function append(text)
{
    let child = document.createElement('p');
    child.innerHTML = text;

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

function onPayTaxes()
{
	if (gIsGameOver)
	{
		return;
	}
	let t = Math.floor(gInitialMoney + 2000 * Math.random());
	_gText.appendChild(append("You have paid " + t + " in taxes"));
	gMoney -= t;
	syncMoneyUI();
	checkGameOver();
}
