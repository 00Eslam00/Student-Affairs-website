



const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// console.log(urlParams);
// console.log(id);

const editPage = document.querySelector("form");



if (editPage.classList.contains("edit-dept")) {
	const Depts = JSON.parse(localStorage.getItem("Departments"));

	if (Depts[id]) {
		document.getElementById("code").value = id;
		document.getElementById("name").value = `${Depts[id]["Name"]}`;
	}

}

else if (editPage.classList.contains("edit-crs")) {
	const Courses = JSON.parse(localStorage.getItem("Courses"));
	if (Courses[id]) {
		document.getElementById("code").value = id;
		document.getElementById("name").value = `${Courses[id]["Name"]}`;
		document.getElementById("credit").value = `${Courses[id]["Credit"]}`;
		document.querySelector(`#dept_related option[value=${Courses[id]['Dept']}]`).selected = true;
		document.getElementById("level").value = `${Courses[id]["Level"]}`;

		if (Number(Courses[id]["Level"]) < 3)
			document.querySelector(`#dept_related`).setAttribute("disabled", "");

		document.getElementById("credit").value = `${Courses[id]["Credit"]}`;

		let avCoursesSelect = document.getElementById("avl-courses");
		let preCoursesSelect = document.getElementById("pre-courses");

		let preCrsData = Courses[id]["Pre-courses"];
		// console.log(preCrsData);
		for (let i = 0; i < preCrsData.length; i++) {
			let opt = document.createElement("option");
			opt.value = preCrsData[i];
			opt.appendChild(document.createTextNode(`${Courses[preCrsData[i]]["Name"]}`));
			preCoursesSelect.appendChild(opt);
		}

		for (let key in Courses) {
			console.log(key);
			if (key == id || preCrsData.includes(key) || Courses[key]["Pre-courses"].includes(id))
				continue;
			let opt = document.createElement("option");
			opt.value = key;
			opt.appendChild(document.createTextNode(`${Courses[key]["Name"]}`));
			avCoursesSelect.appendChild(opt);

		}
	}

}


else if (editPage.classList.contains("edit-std")) {
	const Students = JSON.parse(localStorage.getItem("Students"));
	const Departments = JSON.parse(localStorage.getItem("Departments"));
	const Courses = JSON.parse(localStorage.getItem("Courses"));


	if (Students[id]) {
		document.getElementById("code").value = id;
		document.getElementById("pass").value = Students[id]["Pass"];
		document.getElementById("name").value = Students[id]["Name"];
		document.getElementById("level").value = Students[id]["Level"];

		let deptSelect = document.getElementById("dept");

		for (let dept in Departments) {
			let opt = document.createElement("option");
			opt.value = dept;
			opt.appendChild(document.createTextNode(Departments[dept]["Name"]));
			deptSelect.appendChild(opt);
		}


		if (Number(Students[id]["Level"]) < 3) {
			document.getElementById("dept").setAttribute("disabled", "");

		}



		let stdCrss = document.getElementById("std-courses");

		let crss = Object.keys(Students[id]["Courses"]);
		console.log(crss);
		for (let i = 0; i < crss.length; i++) {
			let crs = crss[i];
			let opt = document.createElement("option");
			opt.value = crs;
			opt.appendChild(document.createTextNode(Courses[crs]["Name"]));
			stdCrss.appendChild(opt);
		}


		let optCourses = document.querySelector(".optional.courses");
		if (optCourses)
			optCourses.addEventListener("change", () => {
				if (optCourses.value == '0') {
					document.querySelector("#team").setAttribute("disabled", "");
					document.querySelector("#exam").setAttribute("disabled", "");
				} else {
					document.querySelector("#team").removeAttribute("disabled");
					document.querySelector("#exam").removeAttribute("disabled");

					let crsOpt = document.querySelector(".optional.courses").value;

					if (Students[id]["Courses"][crsOpt]["Team"])
						document.querySelector("#team").value = Students[id]["Courses"][crsOpt]["Team"];
					else
						document.querySelector("#team").value = '';
					if (Students[id]["Courses"][crsOpt]["Exam"])
						document.querySelector("#exam").value = Students[id]["Courses"][crsOpt]["Exam"];
					else
						document.querySelector("#exam").value = '';
				}
			});



	}






}
