
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
	window.localStorage.setItem("Vars", '{"Std-id" : "20230000" , "post-id" : "1"}');
}

if (!window.localStorage.getItem("Posts")) {
	window.localStorage.setItem("Posts", '{}');
}

if (!window.localStorage.getItem("Student-login")) {
	window.localStorage.setItem("Student-login", '');
}

if (!window.localStorage.getItem("Admin-info")) {
	window.localStorage.setItem("Admin-info", '{"User" : "admin" , "Pass" : "admin"}');
}
if (!window.localStorage.getItem("Admin-login")) {
	window.localStorage.setItem("Admin-login", '');
}

