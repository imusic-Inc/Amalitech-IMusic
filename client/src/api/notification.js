export function notificationShow(message, title) {

    if (!("Notification" in window)) {

        alert("This browser does not support desktop notification");

    } else if (Notification.permission === "granted") {

        const notification = new Notification(title, {
            body: message,
            icon: 'client/public/images/favicon.png'
        });

        notification.onclick = (event) => {
            event.preventDefault();
            window.open('./home?n=vs-1dts', '_self');
        };

    } else if (Notification.permission !== "denied") {

        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {

                const notification = new Notification(title, {
                    body: message,
                    icon: 'client/public/images/favicon.png'
                });

                notification.onclick = (event) => {
                    event.preventDefault();
                    window.open('./home?n=vs-1dts', '_self');
                };

            }
        });

    }
}