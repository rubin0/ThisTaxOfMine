
var World = {
    DAYS_TO_PAY: 30,
    gametime: 0,
    score: 0,
    gRefreshInterval: null,
    gIsGameOver: false,
    moneyDiv: document.getElementById('money'),
    timeDiv: document.getElementById('time'),
    scoreDiv: document.getElementById('scoretime'),
    player: {
        productivity: 1,
        baseIncome: 50,
        money: 0,
    },
    tax: {
        incomeTax: () => {
            return Math.floor(World.player.money * 0.7);
        },
        totalTax: () => {
            return World.tax.incomeTax();
        }
    },
    init: function () {
        this.gametime = this.DAYS_TO_PAY;
        this.score = 0;
        Notifications.init();

        this.setMoney(1000);
        this.syncUI();

        this.gIsGameOver = false;
    },
    start: function () {
        this.gRefreshInterval = setInterval(function () {
            World.gameloop();
        }, 1000);
    },
    addMoney: function (amount) {
        this.player.money += amount;
    },
    setMoney: function (amount) {
        this.player.money = amount;
    },
    syncUI: function () {
        this.moneyDiv.innerText = 'Money: ' + this.player.money;
        this.timeDiv.innerText = this.gametime;
        this.scoreDiv.innerText = this.score;
        if (this.timeDiv.innerText >= 0 && this.timeDiv.innerText <= 5) {
            this.timeDiv.className = 'countdown';
        } else {
            this.timeDiv.className = '';
        }
    },
    gameloop: function () {
        this.gametime -= 1;

        if (this.gametime < 0) {
            this.onPayTaxes();
            this.gametime = this.DAYS_TO_PAY;
        }
        this.score++;
        this.syncUI();
        this.checkGameOver();
        if (this.gIsGameOver) {
            return;
        }
    },
    checkGameOver: function () {
        if (this.player.money <= 0) {
            this.gIsGameOver = true;
            clearInterval(this.gRefreshInterval);
            Notifications.create('GAME OVER :(');
            $("#bnRestart").show();
        }
    },
    onPayTaxes: function () {
        if (World.gIsGameOver) {
            return;
        }
        let t = -Math.floor(World.tax.totalTax());
        Notifications.create("You have paid " + Math.abs(t) + " in taxes", t);
        World.addMoney(t);
    },
    onWork: () => {
        if (World.gIsGameOver) {
            return;
        }
        let wage = Math.floor(World.player.baseIncome * World.player.productivity * Math.random());
        Notifications.create("You have gained " + wage, wage);
        World.addMoney(wage);
        World.syncUI();
    },
    onRestart: () => {
        World.saveScore();
        World.init();
        World.start();
    },
    onStart: () => {
        if (World.onLogin()) {
            World.init();
            World.start();
        }
    },
    onLogin: () => {
        var username = $("#inputStart").val();
        if (!(username === "")) {
            $("#inputStart").hide();
            $("#bnStart").hide();
            $("#username").text("Logged as: " + username);
            $("#username").show();
            $("#errorUsername").hide();
            $("#bnWork").show();
            localStorage.username = username;
            return true;
        } else {
            $("#errorUsername").text("Inserire un username corretto!");
            $("#errorUsername").show();
            return false;
        }
    },
    onSaveScore: () => {
        $.post("https://backend-ttom.herokuapp.com/users", { username: localStorage.username, score: World.score },
            function (returnedData) {
                console.log(returnedData);
            });
    }
}