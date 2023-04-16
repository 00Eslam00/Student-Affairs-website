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
		paragraph.textContent = `Your information has been updated succesfully`;
		color = "green"
	}
	else {
		paragraph.textContent = `There are some missing information`;
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



function gradeToGPA(grade) {
	if (grade >= 90) {
		return 4.0;
	} else if (grade >= 80) {
		return 3.0 + (grade - 80) / 10;
	} else if (grade >= 70) {
		return 2.0 + (grade - 70) / 10;
	} else if (grade >= 60) {
		return 1.0 + (grade - 60) / 10;
	} else {
		return 0.0;
	}
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

let profileForm = document.getElementById("std-profile");
if (profileForm) {

	let Students = JSON.parse(localStorage.getItem("Students"));
	let Courses = JSON.parse(localStorage.getItem("Courses"));
	let stdLogin = localStorage.getItem("Student-login");
	let stdInfo = Students[stdLogin];

	profileForm.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!validateForm()) {
			prompt(2);
			return;
		}

		stdInfo["Email"] = document.getElementById("email").value;
		stdInfo["Mobile"] = document.getElementById("mobile").value;
		Students[stdLogin] = stdInfo;
		localStorage.setItem("Students", JSON.stringify(Students));
		prompt(1);

	})




	// console.log(stdInfo);


	document.getElementById("code").value = stdLogin;
	document.getElementById("name").value = stdInfo["Name"];

	const stdCoures = stdInfo["Courses"];
	let gpaSum = 0;
	let totalHours = 0;
	for (let crsCode in stdCoures) {
		let totalGrade = Number(stdCoures[crsCode]["Team"]) + Number(stdCoures[crsCode]["Exam"]);
		gpaSum += Number(Courses[crsCode]["Credit"]) * gradeToGPA(totalGrade);

		if (!isNaN(totalGrade) && totalGrade >= 50)
			totalHours += Number(Courses[crsCode]["Credit"]);
	}

	if (!totalHours)
		gpaSum = 0;
	else
		gpaSum = gpaSum / totalHours;


	document.getElementById("gpa").value = gpaSum;
	document.getElementById("hours").value = totalHours;
	document.getElementById("level").value = stdInfo["Level"];
	document.getElementById("dept").value = stdInfo["Dept"];

	if (stdInfo["Gender"] == '1')
		document.getElementById("gender").value = "Male";
	else
		document.getElementById("gender").value = "Female";

	document.getElementById("mobile").value = stdInfo["Mobile"];
	document.getElementById("email").value = stdInfo["Email"];

}




