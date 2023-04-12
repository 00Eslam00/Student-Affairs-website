function prompt(ele, flag, code) {

	const overlay = document.createElement('div');
	overlay.classList.add('overlay');
	overlay.style.cssText = `
	position: fixed;
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
	let color;
	if (flag == 1) {
		paragraph.textContent = `A new ${ele} with code ${code} has been added successfully`;
		color = "green"
	}

	else if (flag == 2) {
		paragraph.textContent = `There are some missing informations`;
		color = "red";
	}

	else if (flag == 3) {
		paragraph.textContent = `The ${ele} with code ${code} is already exist`;
		color = "orange"
	}

	else if (flag == 4) {
		paragraph.textContent = `a ${ele} with code ${code} has been updated succesfully`;
		color = "green"
	}

	else if (flag == 5) {
		paragraph.textContent = `There is no ${ele} with code ${code}`;
		color = "orange"
	}

	dialog.appendChild(paragraph);
	dialog.appendChild(button);
	document.body.appendChild(dialog);
	dialog.style.cssText = `
	position:absolute;
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
	`

	button.textContent = 'OK';

	button.style.cssText = `
	padding: 12px;
    width: 12%;
	`
}

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


document.addEventListener('click', function (e) {
	if (e.target.tagName != 'BUTTON' || e.target.classList.contains('d-btn')) {

		//console.log(document.querySelector('.dialog'));
		if (document.querySelector('.dialog')) {
			document.querySelector('.overlay').remove();
			document.querySelector('.dialog').remove();
		}


	}
});



// for adding form
let addForm = document.querySelector('form.add-dep');
if (addForm)
	addForm.addEventListener('submit', (event) => {

		event.preventDefault();

		if (!validateForm()) {
			prompt("Department", 2)
		} else {
			const code = document.getElementById("code").value;
			let Departments = localStorage.getItem('Departments');

			if (!Departments) {
				Departments = {};
			} else {

				Departments = JSON.parse(Departments);

				if (code in Departments) {
					prompt("Department", 3, code)
					return;
				}

			}

			const name = document.getElementById("name").value;
			Departments[code] = {
				"Name": name,
				"courses": []
			}

			window.localStorage.setItem("Departments", JSON.stringify(Departments));


			prompt("Department", 1, code)
		}
	});




// for editing form
let editForm = document.querySelector('form.edit-dept');
if (editForm)
	editForm.addEventListener('submit', (event) => {

		event.preventDefault();

		if (!validateForm()) {
			prompt("Department", 2)
		} else {
			const code = document.getElementById("code").value;
			let Departments = localStorage.getItem('Departments');



			Departments = JSON.parse(Departments);

			if (code in Departments) {

				const name = document.getElementById("name").value;
				Departments[code]["Name"] = name;

				window.localStorage.setItem("Departments", JSON.stringify(Departments));

				prompt("Department", 4, code)
				return;

			}

			prompt("Department", 5, code)
			return;

		}
	});




//for view table

