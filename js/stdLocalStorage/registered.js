function getLetterGrade(grade) {
	if (grade >= 90) {
		return "A+";
	} else if (grade >= 85) {
		return "A";
	} else if (grade >= 80) {
		return "A-";
	} else if (grade >= 75) {
		return "B+";
	} else if (grade >= 70) {
		return "B";
	} else if (grade >= 65) {
		return "B-";
	} else if (grade >= 60) {
		return "C+";
	} else if (grade >= 55) {
		return "C";
	} else if (grade >= 50) {
		return "C-";
	} else if (grade >= 45) {
		return "D";
	} else {
		return "F";
	}
}



let stdTable = document.getElementById("myTable");
if (stdTable) {
	const Students = JSON.parse(localStorage.getItem("Students"));
	const Courses = JSON.parse(localStorage.getItem("Courses"));

	const std = Students[localStorage.getItem("Student-login")];

	const crss = Object.keys(std["Courses"]);

	for (let i = 0; i < crss.length; i++) {
		let crs = crss[i];

		let team = std["Courses"][crs]["Team"];
		let exam = std["Courses"][crs]["Exam"];
		let res = Number(team) + Number(exam);
		let alphaGrade = '';


		if (isNaN(team))
			team = '';

		if (isNaN(exam))
			exam = '';

		if (isNaN(res))
			res = '';
		else
			alphaGrade = getLetterGrade(res);


		let stdLevel = Courses[crs]["Level"];
		let stdLevelNum = Courses[crs]["Level"];

		if (stdLevel == 1)
			stdLevel = "First Level";
		else if (stdLevel == 2)
			stdLevel = "Second Level";
		else if (stdLevel == 3)
			stdLevel = "Third Level";
		else if (stdLevel == 3)
			stdLevel = "Fourth Level";


		let row = document.createElement("tr");

		let code = document.createElement("td");
		code.appendChild(document.createTextNode(crs));
		code.title = crs;
		code.classList.add("code");

		let name = document.createElement("td");
		name.appendChild(document.createTextNode(Courses[crs]["Name"]));
		name.title = Courses[crs]["Name"];

		let hours = document.createElement("td");
		hours.appendChild(document.createTextNode(Courses[crs]["Credit"]));
		hours.title = Courses[crs]["Credit"];

		let grade = document.createElement("td");
		grade.appendChild(document.createTextNode(alphaGrade));
		grade.title = alphaGrade;

		let term = document.createElement("td");
		term.appendChild(document.createTextNode(team));
		term.title = team;

		let exw = document.createElement("td");
		exw.appendChild(document.createTextNode(exam));
		exw.title = exam;

		let result = document.createElement("td");
		result.appendChild(document.createTextNode(res));
		result.title = res;


		let level = document.createElement("td");
		level.appendChild(document.createTextNode(stdLevel));
		level.title = stdLevel;
		level.classList.add("level");
		level.setAttribute("level", stdLevelNum);


		row.appendChild(code);
		row.appendChild(name);
		row.appendChild(hours);
		row.appendChild(grade);
		row.appendChild(term);
		row.appendChild(exw);
		row.appendChild(result);
		row.appendChild(level);


		document.querySelector("#myTable tbody").appendChild(row);

	}

}
