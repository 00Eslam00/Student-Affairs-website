// Return the id of the clicked item
function handleClick(event) {
	return event.target.id;
}

// Show the dropdown list when click the dropdown icon and make it active
document.addEventListener('click', function (event) {
	const clickedElementId = handleClick(event);
	var clicked_items = ["clicked1", "clicked2"];
	var dropdown_items = ["courses", "account"];
	for (var i = 0; i < dropdown_items.length; i++) {
		if (clickedElementId == dropdown_items[i]) {
			document.getElementById(clicked_items[i]).classList.toggle("show");
			document.getElementById(dropdown_items[i]).classList.toggle("active");
			for (var j = 0; j < clicked_items.length; j++) {
				if (dropdown_items[j] != clickedElementId) {
					document.getElementById(clicked_items[j]).classList.remove("show");
					document.getElementById(dropdown_items[j]).classList.remove("active");
				}
			}
		}
	}
});

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
	if (!e.target.matches('.dropbtn')) {
		var clicked_items = ["clicked1", "clicked2"];
		var dropdown_items = ["courses", "account"];
		for (var j = 0; j < clicked_items.length; j++) {
			var myDropdown = document.getElementById(clicked_items[j]);
			if (myDropdown && myDropdown.classList.contains('show')) {
				myDropdown.classList.remove('show');
				document.getElementById(dropdown_items[j]).classList.remove("active");
				return;
			}
		}
	}
}




document.addEventListener("click", (event) => {

	if (event.target.id == "logout") {
		event.preventDefault();
		localStorage.setItem("Student-login", '');
		window.location.href = "login.html";
	}

})


// Load the navbar inside html page
document.addEventListener("DOMContentLoaded", function () {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			document.getElementById("navbar-placeholder").innerHTML = this.responseText;
		}
	};

	if (localStorage.getItem("Student-login") == '' && document.querySelector(".nav-changer"))
		xhr.open("GET", "navbar-login.html", true);
	else
		xhr.open("GET", "navbar-student.html", true);
	xhr.send();
});
