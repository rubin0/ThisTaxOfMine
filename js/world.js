var World = {
    money: 0,
    gRefreshInterval: null,
    gIsGameOver: false,
    gRefreshInterval: null,
    moneyDiv: document.getElementById("money"),
    init: function () {
        $("#bnRestart").hide();

        Notifications.init();

        this.setMoney(5000);
        this.syncMoneyUI();

        this.gIsGameOver = false;

        this.gRefreshInterval = setInterval(function () {
            World.gameloop();
        }, 1000);
    },
    setMoney: function (amount) {
        this.money += amount;
        this.syncMoneyUI();
    },
    syncMoneyUI: function () {
        this.moneyDiv.innerText = "Money: " + this.money;
    },
    gameloop: function () {
        onPayTaxes();
        this.checkGameOver();
        if (this.gIsGameOver) {
            return;
        }
    },
    checkGameOver: function () {
        if (World.money <= 0) {
            this.gIsGameOver = true;
            clearInterval(this.gRefreshInterval);
            Notifications.create("GAME OVER :(");
            $("#bnRestart").show();
        }
    }
}