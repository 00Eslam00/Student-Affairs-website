function prompt() {

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

	paragraph.textContent = `Registeration has been done successfully`;
	color = "green"


	dialog.appendChild(paragraph);
	dialog.appendChild(button);
	document.body.appendChild(dialog);

	dialog.style.cssText = `
	position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    background-color:rgba(255,255,255);
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
	color: ${color};
	font-size: 26px;
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




let ecourses = document.getElementById("ecourses");
if (ecourses) {
	let Students = JSON.parse(localStorage.getItem("Students"));
	let Courses = JSON.parse(localStorage.getItem("Courses"));
	let crsKeys = Object.keys(Courses);

	let logInfo = localStorage.getItem("Student-login");

	let std = Students[logInfo];

	for (let i = 0; i < crsKeys.length; i++) {
		let crsKey = crsKeys[i];

		if (Courses[crsKey]["Level"] == std["Level"] && Courses[crsKey]["Dept"] == std["Dept"]) {

			let preCrs = Courses[crsKey]["Pre-courses"];
			let avl = true;
			for (let j = 0; j < preCrs.length; j++) {
				console.log(crsKey, preCrs[j]);

				let stdCrs = std["Courses"][preCrs[j]];
				if (!stdCrs) {
					avl = false;
					break;
				}

				let totalGrade = Number(stdCrs["Team"]) + Number(stdCrs["Exam"]);
				if (totalGrade < 50 || isNaN(totalGrade)) {
					avl = false;
					break;
				}

			}


			// console.log(std["Courses"][crsKey]);

			if (std["Courses"][crsKey])
				if (std["Courses"][crsKey]["Team"])
					avl = false;

			if (avl) {
				let crsOpt = document.createElement("option");
				crsOpt.value = crsKey;
				crsOpt.appendChild(document.createTextNode(`${crsKey}-${Courses[crsKey]["Name"]}`));
				ecourses.appendChild(crsOpt);
			}


		}


	}
}


let crsForm = document.getElementById("crs-register-form");
if (crsForm)
	crsForm.addEventListener("submit", (event) => {
		event.preventDefault();

		let Students = JSON.parse(localStorage.getItem("Students"));
		let Courses = JSON.parse(localStorage.getItem("Courses"));
		let crsKeys = Object.keys(Courses);

		let logInfo = localStorage.getItem("Student-login");

		let std = Students[logInfo];

		let crss = document.querySelectorAll("#rcourses option");
		for (let i = 0; i < crss.length; i++) {
			console.log(crss[i]);
			std["Courses"][crss[i].value] = {};
		}

		Students[logInfo] = std;
		localStorage.setItem("Students", JSON.stringify(Students));
		prompt();

	})
