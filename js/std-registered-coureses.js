// Get the table
var table = document.getElementById("myTable");

// Get the th elements
var thList = table.getElementsByTagName("th");

// Loop through the th elements
for (var i = 0; i < thList.length; i++) {
    // Check if the th element has the text "Term"
    if (thList[i].textContent === "Term") {
        // Get the index of the th element
        var index = thList[i].cellIndex;

        // Get the td elements with the same index
        var tdList = table.getElementsByTagName("td");

        // Loop through the td elements and add the class "term"
        for (var j = index; j < tdList.length; j += thList.length) {
            tdList[j].classList.add("term");
        }
    }
}
// Get the table
var table = document.getElementById("myTable");

// Get the th elements
var thList = table.getElementsByTagName("th");

// Loop through the th elements
for (var i = 0; i < thList.length; i++) {
    // Check if the th element has the text "Term"
    if (thList[i].textContent === "Code") {
        // Get the index of the th element
        var index = thList[i].cellIndex;

        // Get the td elements with the same index
        var tdList = table.getElementsByTagName("td");

        // Loop through the td elements and add the class "term"
        for (var j = index; j < tdList.length; j += thList.length) {
            tdList[j].classList.add("code");
        }
    }
}
// Get the table
var table = document.getElementById("myTable");

// Get the th elements
var thList = table.getElementsByTagName("th");

// Loop through the th elements
for (var i = 0; i < thList.length; i++) {
    // Check if the th element has the text "Term"
    if (thList[i].textContent === "Year") {
        // Get the index of the th element
        var index = thList[i].cellIndex;

        // Get the td elements with the same index
        var tdList = table.getElementsByTagName("td");

        // Loop through the td elements and add the class "term"
        for (var j = index; j < tdList.length; j += thList.length) {
            tdList[j].classList.add("year");
        }
    }
}
// Get the table
var table = document.getElementById("myTable");

// Get the th elements
var thList = table.getElementsByTagName("th");

// Loop through the th elements
for (var i = 0; i < thList.length; i++) {
    // Check if the th element has the text "Term"
    if (thList[i].textContent === "Level") {
        // Get the index of the th element
        var index = thList[i].cellIndex;

        // Get the td elements with the same index
        var tdList = table.getElementsByTagName("td");

        // Loop through the td elements and add the class "term"
        for (var j = index; j < tdList.length; j += thList.length) {
            tdList[j].classList.add("level");
        }
    }
}

// Get the select elements
const yearSelect = document.getElementById("y");
const levelSelect = document.getElementById("l");
const termSelect = document.getElementById("t");

// Get the table rows
const rows = document.querySelectorAll("#myTable tbody tr");
console.log(rows);
// Add event listeners to the select elements
yearSelect.addEventListener("change", filterRows);
levelSelect.addEventListener("change", filterRows);
termSelect.addEventListener("change", filterRows);

function filterRows() {
    // Get the selected values
    const yearValue = yearSelect.options[yearSelect.selectedIndex].text;
    const levelValue = levelSelect.options[levelSelect.selectedIndex].text;
    const termValue = termSelect.options[termSelect.selectedIndex].text;
    // const levelValue = levelSelect.value;
    // const termValue = termSelect.value;
    // const selectedOption = selectElement.options[selectElement.selectedIndex];
    // const selectedText = selectedOption.text;
    console.log(yearValue);
    console.log(levelValue);
    console.log(termValue);
    // Filter the table rows
    rows.forEach(row => {
        const year = row.querySelector(".year").textContent;
        console.log(year);
        const level = row.querySelector(".level").textContent;
        console.log(level);
        const term = row.querySelector(".term").textContent;
        console.log(term);

        const yearMatch =  yearValue === year;
        console.log(yearMatch);
        const levelMatch = levelValue === level;
        console.log(levelMatch);
        const termMatch = termValue === term;
        console.log(termMatch);
        if ((yearMatch || yearValue === "All") && (levelMatch || levelValue === "All") && (termMatch || termValue === "All")) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
