gInitialMoney = 1000;
gMoney = gInitialMoney;
gIsGameOver = false;

_gText = $("#text");

function checkGameOver()
{
	if (gMoney <= 0)
	{
		gIsGameOver = true;
		_gText.append("<p>GAME OVER :(</p>");
	}
}

function syncMoneyUI()
{
	$("#money").text("Money: " + gMoney);
}

function onPayTaxes()
{
	if (gIsGameOver)
	{
		return;
	}
	var t = Math.floor(gInitialMoney + 2000 * Math.random());
	_gText.append("<p>You have paid " + t + " in taxes</p>");
	gMoney -= t;
	syncMoneyUI();
	checkGameOver();
}

