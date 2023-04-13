var selectedOptions1 = new Array();
// Move selected elements to right (Selected coureses)
const button1 = document.getElementById("go_right");
button1.addEventListener("click", function (event) {
    event.preventDefault();
    const select2 = document.getElementById("rcourses");
    console.log("before submint: ");
    console.log(selectedOptions1);
    while (selectedOptions1.length !== 0) {
        select2.appendChild(selectedOptions1[0]);
        selectedOptions1[0].classList.remove("selected");
        selectedOptions1.splice(0, 1);
    }
    while (selectedOptions2.length !== 0) {
        selectedOptions2[0].classList.remove("selected");
        selectedOptions2.splice(0, 1);
    }
    console.log("after submint: ");
    console.log(selectedOptions1);
});

// Style and add the selected element to selected_Options
const mySelect1 = document.getElementById("ecourses");

mySelect1.addEventListener("click", (event) => {
    const clickedOption = event.target;
    clickedOption.selected = !clickedOption.selected;
    if (clickedOption.id == 'ecourses') return;
    clickedOption.classList.toggle("selected");
    const indexToRemove = selectedOptions1.indexOf(clickedOption);
    console.log("before click: ");
    console.log(selectedOptions1);
    if (indexToRemove !== -1) {
        selectedOptions1.splice(indexToRemove, 1);
    }
    else {
        selectedOptions1.push(clickedOption);
    }
    console.log("after click: ");
    console.log(selectedOptions1);
});

// Move the selected options to the left (Eligible courses)
var selectedOptions2 = new Array();
const button2 = document.getElementById("go_left");
button2.addEventListener("click", function (event) {
    event.preventDefault();
    const select2 = document.getElementById("ecourses");
    console.log("before submint: ");
    console.log(selectedOptions2);
    while (selectedOptions2.length !== 0) {
        select2.appendChild(selectedOptions2[0]);
        selectedOptions2[0].classList.remove("selected");
        selectedOptions2.splice(0, 1);
    }
    while (selectedOptions1.length !== 0) {
        selectedOptions1[0].classList.remove("selected");
        selectedOptions1.splice(0, 1);
    }
    console.log("after submint: ");
    console.log(selectedOptions2);
});

// Style and add the selected element to selected_Options
const mySelect2 = document.getElementById("rcourses");

mySelect2.addEventListener("click", (event) => {
    const clickedOption = event.target;
    clickedOption.selected = !clickedOption.selected;
    if (clickedOption.id == 'rcourses') return;
    clickedOption.classList.toggle("selected");
    const indexToRemove = selectedOptions2.indexOf(clickedOption);
    console.log("before click: ");
    console.log(selectedOptions2);
    if (indexToRemove !== -1) {
        selectedOptions2.splice(indexToRemove, 1);
    }
    else {
        selectedOptions2.push(clickedOption);
    }
    console.log("after click: ");
    console.log(selectedOptions2);
});

// Move All options to the left (Eligible courses) - Reset
const button3 = document.getElementById("reset");
button3.addEventListener("click", function () {
    const select2 = document.getElementById("ecourses");
    const select1 = document.getElementById("rcourses");
    while (selectedOptions1.length !== 0){
        selectedOptions1[0].classList.remove("selected");
        selectedOptions1.splice(0, 1);
    }
    while (selectedOptions2.length !== 0){
        selectedOptions2[0].classList.remove("selected");
        selectedOptions2.splice(0, 1);
    }
    while (select1.firstChild) {
        select2.appendChild(select1.firstChild);
    }
});