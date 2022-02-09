function homeInit() {
    if ($('#adminPage').is(':visible')) { //if the container is visible on the page
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let username = urlParams.get('username');
        let userType = urlParams.get('userType');

        let adminDiv = document.getElementById('adminPage');
        if (userType == 'admin') {
            adminDiv.hidden = false;
            console.log(adminDiv);
        } else {
            adminDiv.hidden = true;
        }
        if (username == '' || username == undefined || username == null)
            return;
        let loginDiv = document.getElementById('loginDiv');
        loginDiv.innerHTML = username;
        loginDiv.href = 'user.html';
        let registerDiv = document.getElementById('registerDiv');
        registerDiv.innerHTML = 'Logout';
        registerDiv.href = "./index.html"

    } else {
        setTimeout(homeInit, 50); //wait 50 ms, then try again
    }
}