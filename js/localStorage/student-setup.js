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
	margin-top: 0px !important;
	margin-right: 0px  !important;
	`
}

function validateForm() {
	let formValid = true;
	const inputs = document.querySelectorAll('input');
	const optSelect = document.querySelector(".courses.optional");

	inputs.forEach((input) => {

		if (input.value.trim() === '') {

			if (optSelect) {
				// console.log(optSelect.value);
				if (optSelect.value == '0') {
					if (input.classList.contains("optional")) {
						// console.log("not checked")
						formValid = formValid;
					} else
						formValid = false;

				}
				else
					formValid = false;
			}
			else
				formValid = false;
		}
	});

	return formValid;
}


function generateRandomPassword() {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let password = '';
	for (let i = 0; i < 10; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length);
		password += chars[randomIndex];
	}
	return password;
}



if (!window.localStorage.getItem("Students")) {
	window.localStorage.setItem("Students", "{}");
}

if (!window.localStorage.getItem("Courses")) {
	window.localStorage.setItem("Courses", "{}");
}


if (!window.localStorage.getItem("Departments")) {
	window.localStorage.setItem("Departments", '{"Gen":{"Name":"General","courses":[]}}');
}

if (!window.localStorage.getItem("Vars")) {
	window.localStorage.setItem("Vars", '{"Std-id" : "20230000"}');
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
let addForm = document.querySelector('form.add-std');
if (addForm)
	addForm.addEventListener('submit', (event) => {

		event.preventDefault();


		if (!validateForm()) {
			prompt("Students", 2)
		} else {

			let vars = JSON.parse(localStorage.getItem("Vars"));
			const code = vars["Std-id"]
			vars["Std-id"] = Number(code) + 1;
			localStorage.setItem("Vars", JSON.stringify(vars));
			let Students = JSON.parse(localStorage.getItem('Students'));


			if (!Students) {
				Students = {};
			}
			const name = document.getElementById("name").value;
			const dept = "Gen"
			const birthdate = document.getElementById("birthdate").value;
			const gender = document.getElementById("gender").value;
			const stat = document.getElementById("stat").value;
			const email = document.getElementById("email").value;
			const add = document.getElementById("add").value;
			const mobile = document.getElementById("phone").value;
			const level = 1;
			const courses = {};



			Students[code] = {
				"Name": name,
				"Pass": generateRandomPassword(),
				"Dept": dept,
				"Birth-date": birthdate,
				"Gender": gender,
				"stat": stat,
				"Email": email,
				"Add": add,
				"Level": level,
				"Courses": courses,
				"Mobile": mobile
			}

			window.localStorage.setItem("Students", JSON.stringify(Students));
			prompt("Students", 1, code)
		}
	});




// for editing form
let editForm = document.querySelector('form.edit-std');
// console.log(editForm);
if (editForm)
	editForm.addEventListener('submit', (event) => {

		event.preventDefault();

		if (!validateForm()) {
			console.log("hi");
			prompt("Students", 2)
		} else {
			const code = document.getElementById("code").value;
			let Students = localStorage.getItem('Students');

			Students = JSON.parse(Students);

			if (code in Students) {

				//old data
				const birthdate = Students[code]["Birth-date"];
				const add = Students[code]["Add"];
				const stat = Students[code]["Stat"];
				const email = Students[code]["Email"];
				const gender = Students[code]["Gender"];
				const mobile = Students[code]["Mobile"];


				// new data
				const pass = document.getElementById("pass").value;
				const name = document.getElementById("name").value;
				const level = document.getElementById("level").value;
				const dept = document.getElementById("dept").value;
				const course = document.getElementById("courses").value;
				const team = document.getElementById("team");
				const exam = document.getElementById("exam");

				let courses = Students[code]["Courses"];

				if (!team.hasAttribute("disabled"))
					courses[course]["Team"] = team.value;
				if (!exam.hasAttribute("disabled"))
					courses[course]["Exam"] = exam.value;

				Students[code] = {
					"Pass": pass,
					"Name": name,
					"Dept": dept,
					"Level": level,
					"Courses": courses,
					"Birth-date": birthdate,
					"Add": add,
					"Stat": stat,
					"Email": email,
					"Gender": gender,
					"Mobile": mobile
				}




				window.localStorage.setItem("Students", JSON.stringify(Students));

				prompt("Students", 4, code)
				return;

			}

			prompt("Students", 5, code)
			return;

		}
	});




//for view table
let viewTable = document.querySelector("table.std-table");
if (viewTable) {
	let Students = JSON.parse(window.localStorage.getItem("Students"));
	let tbody = document.querySelector("table.std-table tbody");

	// <th style="width: 10%;">Std-ID</th>
	// <th style="width: 15%;">Full-name</th>
	// <th style="width: 15%;">Password</th>
	// <th style="width: 10%;">Birth-Date</th>
	// <th style="width: 5%;">GPA</th>
	// <th style="width: 10%;">Gender</th>
	// <th style="width: 5%;">Level</th>
	// <th style="width: 13%;">Department</th>
	// <th style="width: 10%;">E-mail</th>
	// <th style="width: 15%;">Mobile</th>
	// <th style="width: 10%;">


	for (let key in Students) {
		// console.log(Students[key]);
		let row = document.createElement("tr");

		let stdID = document.createElement("td");
		stdID.classList.add("stdID");

		let stdName = document.createElement("td");
		stdName.classList.add("stdName");

		let stdPass = document.createElement("td");
		stdPass.classList.add("stdPass");

		let stdBD = document.createElement("td");
		stdBD.classList.add("stdBD");

		let stdGPA = document.createElement("td");
		stdGPA.classList.add("stdGPA");

		let stdGender = document.createElement("td");
		stdGender.classList.add("stdGender");

		let stdLevel = document.createElement("td");
		stdLevel.classList.add("stdLevel");

		let stdDept = document.createElement("td");
		stdDept.classList.add("stdDept");

		let stdEmail = document.createElement("td");
		stdEmail.classList.add("stdEmail");

		let stdMobile = document.createElement("td");
		stdMobile.classList.add("stdMobile");

		let stdstat = document.createElement("td");
		let selectStat = document.createElement("select");
		selectStat.classList.add("stdstat");
		selectStat.classList.add("std-stat")

		let active = document.createElement("option");
		active.appendChild(document.createTextNode("active"));
		active.value = 1;

		let inActive = document.createElement("option");
		inActive.appendChild(document.createTextNode("inactive"));

		inActive.value = 0;
		console.log(active.value, inActive.value);

		selectStat.appendChild(active);
		selectStat.appendChild(inActive);
		stdstat.appendChild(selectStat);


		// "Name": name,
		// "Pass": generateRandomPassword(),
		// "Dept": dept,
		// "Birth-date": birthdate,
		// "Gender": gender,
		// "stat": stat,
		// "Email": email,
		// "Add": add,
		// "Level": level,
		// "Courses": courses


		stdID.appendChild(document.createTextNode(`${key}`));
		stdName.appendChild(document.createTextNode(`${Students[key]["Name"]}`));
		stdPass.appendChild(document.createTextNode(`${Students[key]["Pass"]}`))
		stdBD.appendChild(document.createTextNode(`${Students[key]["Birth-date"]}`));
		stdGPA.appendChild(document.createTextNode(`${2}`));
		stdGender.appendChild(document.createTextNode(`${Students[key]["Gender"]}`));
		stdLevel.appendChild(document.createTextNode(`${Students[key]["Level"]}`));
		stdDept.appendChild(document.createTextNode(`${Students[key]["Dept"]}`));
		stdEmail.appendChild(document.createTextNode(`${Students[key]["Email"]}`));
		stdMobile.appendChild(document.createTextNode(`${Students[key]["Mobile"]}`));
		//stdstat.appendChild(document.createTextNode(`${Students["Gender"]}`));
		row.appendChild(stdID);
		row.appendChild(stdName);
		row.appendChild(stdPass);
		row.appendChild(stdBD);
		row.appendChild(stdGPA);
		row.appendChild(stdGender);
		row.appendChild(stdLevel);
		row.appendChild(stdDept);
		row.appendChild(stdEmail);
		row.appendChild(stdMobile);
		row.appendChild(stdstat);

		tbody.appendChild(row);

	}
}
