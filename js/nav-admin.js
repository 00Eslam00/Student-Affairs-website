document.addEventListener("DOMContentLoaded", function () {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("navbar-placeholder").innerHTML = this.responseText;
        }
    };
    xhr.open("GET", "../admin/navbar-admin.html", true);
    xhr.send();
});