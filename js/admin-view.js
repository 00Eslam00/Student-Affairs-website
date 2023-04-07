// Functions used in html
function addFilter() {

	let search_value = document.querySelector(".search-bar").value;
	search_value.trim
	if (search_value.length === 0) {
		return;
	}

	let filter_value = document.querySelector(".filters").value;
	let filters = document.querySelectorAll('.filter-values div');

	let filter_icon = document.createElement("i");
	filter_icon.classList.add("delete");
	filter_icon.classList.add("fa-solid");
	filter_icon.classList.add("fa-xmark");

	let flag = false;
	for (let i = 0; i < filters.length; i++) {
		if (filters[i].getAttribute("filter-name") == filter_value) {
			filters[i].textContent = `${filter_value} = "${search_value}"`;
			// console.log(filters[i].childNodes[0], filters[i].childNodes[1], `${filter_value} = "${search_value}"`)
			filters[i].setAttribute("filter-value", search_value);
			filters[i].appendChild(filter_icon);
			flag = true;
		}

	}



	if (!flag) {
		let filter_element = document.createElement("div");
		filter_element.setAttribute("filter-name", filter_value);
		filter_element.setAttribute("filter-value", search_value);
		filter_element.classList.add("filter-item");
		filter_element.appendChild(document.createTextNode(`${filter_value} = "${search_value}"`))
		filter_element.appendChild(filter_icon);

		document.querySelector(".filter-values").appendChild(filter_element);
	}
	applyFilter();
}




function applyFilter() {
	const stdFilterDictionary = {
		'ID': 1,
		'Name': 2,
		'Date': 3,
		'GPA': 4,
		'Gender': 5,
		'Level': 6,
		'Department': 7,
		'Email': 8,
		'Mobile': 9
	}

	const table = document.getElementsByTagName("table")[0];
	let allRows = table.childNodes[3].childNodes;
	const filters = document.querySelectorAll('.filter-values div');
	if (table.classList.contains('std-table')) {
		for (let i = 1; i < allRows.length; i++) {
			let flag = true;
			for (let j = 0; j < filters.length; j++) {
				let filterName = filters[j].getAttribute("filter-name");
				let filterNum = stdFilterDictionary[filterName];
				let filterValue = filters[j].getAttribute("filter-value");
				let tdEle = allRows[i].childNodes[filterNum - 1];
				// console.log(typeof tdEle.textContent, filterValue);
				if (!tdEle.textContent.includes(filterValue)) {
					flag = false
					break;
				}
			}

			if (flag === true) {
				allRows[i].classList.remove("hide-filter");
			} else {
				allRows[i].classList.add("hide-filter");
			}
			// console.log(allRows[i]);

		}
	}
}


// Events listeners

document.addEventListener("click", (ele) => {

	const contextMenu = document.querySelector('#contextMenu');
	if (contextMenu && !contextMenu.contains(ele.target)) {
		contextMenu.remove();
	}

	ele = ele.target;

	if (ele.classList.contains("delete")) {
		ele.parentElement.remove();
		applyFilter();
	} else if (ele.tagName.toLowerCase() === "tr" && ele.parentElement.tagName.toLowerCase() === "tbody") {
		let x = document.querySelectorAll("table tbody tr")
		for (let i = 0; i < x.length; i++) {
			//x[i].ondblclick = () => window.open("edit-student.html");
			x[i].onclick = () => {

				for (let i = 0; i < x.length; i++) {

					x[i].classList.remove("active");
				}

				x[i].classList.add("active");
			}
		}
	}
});


document.addEventListener("change", (ele) => {
	ele = ele.target;
	if (ele.classList.contains("select-stat")) {
		console.log(ele.value);
	}
});


document.addEventListener('contextmenu', function (e) {

	// Remove previous context menu
	const existingContextMenu = document.querySelector('#contextMenu');
	if (existingContextMenu) {
		existingContextMenu.remove();
	}

	if (e.target.tagName.toLowerCase() !== 'td') {
		return;
	}
	e.preventDefault(); // Prevent default right-click behavior

	// Create context menu element
	// Create the div element with id "contextMenu" and class "hidden"
	const contextMenuDiv = document.createElement("div");
	contextMenuDiv.setAttribute("id", "contextMenu");

	// Create the ul element and its child li elements
	const ul = document.createElement("ul");
	const editOptionLi = document.createElement("li");
	editOptionLi.setAttribute("id", "editOption");
	editOptionLi.textContent = "Edit";
	const deleteOptionLi = document.createElement("li");
	deleteOptionLi.setAttribute("id", "deleteOption");
	deleteOptionLi.textContent = "Delete";
	const copyOptionLi = document.createElement("li");
	copyOptionLi.setAttribute("id", "copyOption");
	copyOptionLi.textContent = "Copy";

	// Append the li elements to the ul element
	ul.appendChild(copyOptionLi);
	ul.appendChild(editOptionLi);
	ul.appendChild(deleteOptionLi);


	// Append the ul element to the contextMenuDiv element
	contextMenuDiv.appendChild(ul);

	contextMenuDiv.style.top = e.pageY + 'px';
	contextMenuDiv.style.left = e.pageX + 'px';

	editOptionLi.addEventListener('click', function () {
		// Handle edit action
		window.open("edit-student.html");
		console.log('Edit row:', e.target.parentElement);
		const existingContextMenu = document.querySelector('#contextMenu');
		if (existingContextMenu) {
			existingContextMenu.remove();
		}
	});

	// Create delete option
	deleteOptionLi.addEventListener('click', function () {
		// Handle delete action
		e.target.parentElement.remove();
		console.log('Delete row:', e.target.parentElement);
		const existingContextMenu = document.querySelector('#contextMenu');
		if (existingContextMenu) {
			existingContextMenu.remove();
		}
	});

	// Create copy option
	copyOptionLi.addEventListener('click', function () {
		// Copy text in td element
		const textToCopy = e.target.textContent;
		navigator.clipboard.writeText(textToCopy);
		console.log('Copied text:', textToCopy);
		const existingContextMenu = document.querySelector('#contextMenu');
		if (existingContextMenu) {
			existingContextMenu.remove();
		}
	});

	// Add context menu to the page
	document.body.appendChild(contextMenuDiv);
});

//

document.addEventListener('change', (ele) => {

	ele = ele.target;
	if (ele.classList.contains('select-stat')) {
		let selectStat = document.querySelector('.select-stat');
		let rows = document.querySelectorAll('.std-stat');
		for (let i = 0; i < rows.length; i++) {
			rows[i].parentElement.parentElement.classList.remove("hide-stat");
		}

		if (selectStat.value != 2) {
			for (let i = 0; i < rows.length; i++) {
				if (rows[i].value != selectStat.value)
					rows[i].parentElement.parentElement.classList.add("hide-stat");
			}
		}
	}
});


document.addEventListener("change", (ele) => {

	ele = ele.target;
	if (ele.classList.contains('std-stat')) {
		let selectStat = document.querySelector('.select-stat');
		if (selectStat.value != 2 && selectStat.value != ele.value) {
			ele.parentElement.parentElement.classList.add("hide-stat");
		}
	}
});

