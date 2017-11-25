var Notifications = {
    GAIN_CSS : "award",
    LOSS_CSS : "cost",
    MAX_NOTIFICATIONS_NUMBER : 10,

    init : function(){

    },
    div : document.getElementById("text"),
    create : function(message, value){
        let string = document.createElement('p');
        string.innerHTML = message;

        if(value >0){
            string.className += "award";
        } else if(value < 0){
            string.className += "cost";
        }

        Notifications.div.appendChild(string);

        console.log(string);

        Notifications.removeOldNotifications();
    },
    removeOldNotifications : function(){
        let notifications = Notifications.div.children;
        if(notifications.length > Notifications.MAX_NOTIFICATIONS_NUMBER){
            notifications[0].remove();
        }
    }




}