'use strict';

var Notifications = {
    GAIN_CSS: "award",
    LOSS_CSS: "cost",
    MAX_NOTIFICATIONS_NUMBER: 12,

    init: function () {
        this.parentDiv.innerHTML = '<p id="start">You have to pay taxes.</p>';
    },
    parentDiv: document.getElementById("text"),
    create: function (message, value) {
        let string = document.createElement('p');
        string.innerHTML = message;

        if (value > 0) {
            string.className += "award";
        } else if (value < 0) {
            string.className += "cost";
        }

        this.parentDiv.appendChild(string);
        this.removeOldNotifications();
    },
    removeOldNotifications: function () {
        let notifications = this.parentDiv.children;
        if (notifications.length > this.MAX_NOTIFICATIONS_NUMBER) {
            notifications[0].remove();
        }
    }
};