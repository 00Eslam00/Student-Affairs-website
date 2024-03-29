function prompt(code) {

	const overlay = document.createElement('div');
	overlay.classList.add('overlay');
	overlay.style.cssText = `
	position:fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 9998;
	`
	// Append overlay to body
	document.body.appendChild(overlay);

	let dialog = document.createElement('div');
	dialog.classList.add('dialog');
	let paragraph = document.createElement('p');
	let button = document.createElement('button');
	button.classList.add('d-btn');
	if (code == 1) {
		paragraph.textContent = `password has been updated succesfully`;
		color = "green"
	}
	else {
		paragraph.textContent = `password doesn't match`;
		color = "red"
	}


	dialog.appendChild(paragraph);
	dialog.appendChild(button);
	document.body.appendChild(dialog);

	dialog.style.cssText = `
	position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    background-color:rgba(255,255,255);
    color:${color};
    width:50%;
    height:25%;
    padding:10px;
    border-radius:5px;
	display:flex;
	flex-direction:column;
    justify-content:space-around;
    align-items:center;
    font-size:1.5rem;
	z-index: 9999;
    `;

	paragraph.style.cssText = `
	width: fit-content;
    padding: 10px;
    text-align: center;
	font-family: Arial, Helvetica, sans-serif;
	`

	button.textContent = 'OK';

	button.style.cssText = `
	padding: 12px;
    width: 12%;
	margin-top: 0px !important;
	margin-right: 0px  !important;
	margin-top: 20px;
	display: inline-block;
	background-color: #3aa8ef;
	border-radius: 8px;
	color: white;
	padding: 10px;
	border: none;
	font-size: 26px;
	cursor: pointer;
	font-family: Arial, Helvetica, sans-serif;
	`
}

document.addEventListener('click', function (e) {
	if (e.target.tagName != 'BUTTON' || e.target.classList.contains('d-btn')) {

		//console.log(document.querySelector('.dialog'));
		if (document.querySelector('.dialog')) {
			document.querySelector('.overlay').remove();
			document.querySelector('.dialog').remove();
		}


	}
});




function validateForm() {
	let formValid = true;
	const inputs = document.querySelectorAll('input');

	inputs.forEach((input) => {
		if (input.value.trim() === '') {
			formValid = false;
		}
	});

	return formValid;
}




let changePass = document.getElementById("change-pass");
if (changePass)
	changePass.addEventListener("submit", (event) => {

		event.preventDefault();
		const oldPass = document.getElementById("old-pass").value;
		const newPass = document.getElementById("new-pass").value;
		const confirmPass = document.getElementById("confirm-pass").value;

		let Students = JSON.parse(localStorage.getItem("Students"));
		let logInfo = localStorage.getItem("Student-login");
		let std = Students[logInfo];

		if (!validateForm()) {
			prompt(2);
			return
		}

		else if (newPass != confirmPass || std["Pass"] != oldPass) {
			prompt(2);
			return
		}

		else if (std["Pass"] == oldPass && newPass == confirmPass) {
			Students[logInfo]["Pass"] = newPass;
			localStorage.setItem("Students", JSON.stringify(Students));
			prompt(1);
		}


	});
