var World = {
    money : 0,
    gRefreshInterval : null,
    moneyDiv : document.getElementById("money"),
    init: function () {
        this.setMoney(5000);
    },
    setMoney : function(amount){
        this.money += amount;
        this.syncMoneyUI();
    },
    syncMoneyUI : function(){
            this.moneyDiv.innerText = "Money: " + this.money + " $ ";
    },
}