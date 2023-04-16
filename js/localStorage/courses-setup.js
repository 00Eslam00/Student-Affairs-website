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

	inputs.forEach((input) => {
		if (input.value.trim() === '') {
			formValid = false;
		}
	});

	return formValid;
}


let deptRelate = document.getElementById("dept_related");
if (deptRelate) {
	let depts = JSON.parse(window.localStorage.getItem("Departments"));

	for (let dept in depts) {
		let opt = document.createElement("option");
		opt.setAttribute("value", dept);
		opt.appendChild(document.createTextNode(depts[dept]["Name"]));
		deptRelate.appendChild(opt);
	}
}
// console.log(deptRelate.childNodes.length);
// console.log(deptRelate);

let avlCoursesAdd = document.querySelector(".add-crs #avl-courses");
if (avlCoursesAdd) {
	let Courses = JSON.parse(window.localStorage.getItem("Courses"));

	for (let course in Courses) {
		let opt = document.createElement("option");
		opt.setAttribute("value", course);
		opt.appendChild(document.createTextNode(Courses[course]["Name"]));
		avlCoursesAdd.appendChild(opt);
	}
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
let addForm = document.querySelector('form.add-crs');
// console.log(addForm);
if (addForm)
	addForm.addEventListener('submit', (event) => {

		event.preventDefault();

		if (!document.querySelectorAll("#dept_related options")) {
			prompt("Course", 2);
			return;
		}


		if (!validateForm()) {
			prompt("Course", 2)
		} else {
			const code = document.getElementById("code").value;
			let Courses = localStorage.getItem('Courses');

			if (!Courses) {
				Courses = {};
			} else {

				Courses = JSON.parse(Courses);

				if (code in Courses) {
					prompt("Course", 3, code)
					return;
				}

			}

			const name = document.getElementById("name").value;
			const dept = document.getElementById("dept_related").value;

			if (!Boolean(dept)) {
				prompt("Course", 2);
				return;
			}
			const credit = document.getElementById("credit").value;
			const level = document.getElementById("level").value;
			const preCoursesOp = document.querySelectorAll("#pre-courses option:not(:is([value='0']");


			let preCourses = Array.from(preCoursesOp).map((item) => {
				return item.value;
			});

			Courses[code] = {
				"Name": name,
				"Dept": dept,
				"Credit": credit,
				"Level": level,
				"Pre-courses": preCourses
			}


			let Departments = JSON.parse(window.localStorage.getItem("Departments"));

			Departments[dept]["courses"].push(code);
			window.localStorage.setItem("Departments", JSON.stringify(Departments));
			window.localStorage.setItem("Courses", JSON.stringify(Courses));
			prompt("Course", 1, code)
		}
	});




// for editing form
let editForm = document.querySelector('form.edit-crs');
if (editForm)
	editForm.addEventListener('submit', (event) => {

		event.preventDefault();

		if (!validateForm()) {
			prompt("Course", 2)
		} else {
			const code = document.getElementById("code").value;
			let Courses = localStorage.getItem('Courses');
			let Departments = JSON.parse(window.localStorage.getItem("Departments"));


			Courses = JSON.parse(Courses);

			if (code in Courses) {


				//old data
				// const oldname = Courses["Name"];
				const olddept = Courses[code]["Dept"];
				// const oldcredit = Courses["Credit"];
				const oldlevel = Courses["Level"];
				const oldpreCourses = Courses["Pre-courses"];

				// new data
				const name = document.getElementById("name").value;
				const dept = document.getElementById("dept_related").value;
				const credit = document.getElementById("credit").value;
				const level = document.getElementById("level").value;
				const preCoursesOp = document.querySelectorAll("#pre-courses option:not(:is([value='0']");
				let preCourses = Array.from(preCoursesOp).map((item) => {
					return item.value;
				});


				// console.log(olddept, dept);
				if (olddept !== dept) {
					const index = Departments[olddept]["courses"].indexOf(code);
					Departments[olddept]["courses"].splice(index, 1);
				}


				Courses[code] = {
					"Name": name,
					"Dept": dept,
					"Credit": credit,
					"Level": level,
					"Pre-courses": preCourses
				}



				Departments[dept]["courses"].push(code);
				window.localStorage.setItem("Departments", JSON.stringify(Departments));
				window.localStorage.setItem("Courses", JSON.stringify(Courses));

				prompt("Course", 4, code)
				return;

			}

			prompt("Course", 5, code)
			return;

		}
	});




//for view table
let viewTable = document.querySelector("table.crs-table");
if (viewTable) {
	let courses = JSON.parse(window.localStorage.getItem("Courses"));
	let tbody = document.querySelector("table.crs-table tbody");

	// <th>Course-ID</th>
	// <th>course-Name</th>
	// <th>Course-Credit</th>
	// <th>Course-Level</th>
	// <th>Department</th>
	// <th>Pre-Courses</th>



	for (let key in courses) {
		console.log(courses[key]);
		let row = document.createElement("tr");

		let crsCode = document.createElement("td");
		crsCode.setAttribute("vlaue", "crsCode");

		let crsName = document.createElement("td");
		crsName.setAttribute("vlaue", "crsName");

		let crsCredit = document.createElement("td");
		crsCredit.setAttribute("vlaue", "crsCredit");

		let crsLevel = document.createElement("td");
		crsLevel.setAttribute("vlaue", "crsLevel");

		let crsDept = document.createElement("td");
		crsDept.setAttribute("vlaue", "crsDept");

		let crsPre = document.createElement("td");
		crsPre.setAttribute("vlaue", "crsPre");


		crsCode.appendChild(document.createTextNode(`${key}`));
		crsName.appendChild(document.createTextNode(`${courses[key]['Name']}`));
		crsCredit.appendChild(document.createTextNode(`${courses[key]['Credit']}`));
		crsLevel.appendChild(document.createTextNode(`${courses[key]['Level']}`));
		crsDept.appendChild(document.createTextNode(`${courses[key]['Dept']}`));
		crsPre.appendChild(document.createTextNode(`${courses[key]['Pre-courses'].join(", ")}`));

		console.log(crsCode, crsName, crsCredit, crsLevel, crsDept)
		row.appendChild(crsCode);
		row.appendChild(crsName);
		row.appendChild(crsCredit);
		row.appendChild(crsLevel);
		row.appendChild(crsDept);
		row.appendChild(crsPre);
		tbody.appendChild(row);
	}
}


let avlCourses = document.querySelector("#avl-courses");
if (avlCourses)
	avlCourses.addEventListener("change", () => {
		if (avlCourses.value != 0) {
			let val = avlCourses.value;
			let opt = document.querySelector(`#avl-courses option[value='${val}']`);
			document.querySelector(`#avl-courses option[value='${val}']`).remove();
			document.querySelector("#pre-courses").appendChild(opt);
			document.querySelector(`#pre-courses option[value='${0}']`).selected = true;

		}
	});


let preCourses = document.querySelector("#pre-courses");
if (preCourses)
	preCourses.addEventListener("change", () => {
		console.log(preCourses.value);
		if (preCourses.value != 0) {
			let val = preCourses.value;
			let opt = document.querySelector(`#pre-courses option[value='${val}']`)
			document.querySelector(`#pre-courses option[value='${val}']`).remove();
			document.querySelector("#avl-courses").appendChild(opt);
			document.querySelector(`#avl-courses option[value='${0}']`).selected = true;
		}
	});


let avLevel = document.getElementById("level")
if (avLevel) {
	avLevel.addEventListener("change", () => {
		if (Number(avLevel.value) < 3) {
			let dept = document.getElementById("dept_related");
			dept.setAttribute("disabled", "");
			document.querySelector('#dept_related option[value="Gen"]').selected = true;
		} else {
			document.getElementById("dept_related").removeAttribute("disabled");
		}
	});
}
