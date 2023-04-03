// Functions used in html
function addFilter() {

	let search_value = document.querySelector(".search-bar").value;
	search_value.trim
	if (search_value.length === 0) {
		return;
	}

	let filter_value = document.querySelector(".filters").value;

	let filter_element = document.createElement("div");
	let filter_icon = document.createElement("i");
	filter_icon.classList.add("delete");
	filter_icon.classList.add("fa-solid");
	filter_icon.classList.add("fa-xmark");
	filter_element.classList.add("filter-item");
	filter_element.appendChild(document.createTextNode(`${filter_value} = "${search_value}"`))
	filter_element.appendChild(filter_icon);

	document.querySelector(".filter-values").appendChild(filter_element);

}




// Events listeners

document.addEventListener("click", (ele) => {
	ele = ele.target;
	//console.log(ele)
	if (ele.classList.contains("delete")) {
		ele.parentElement.remove();
	} else if (ele.tagName.toLowerCase() === "tr" && ele.parentElement.tagName.toLowerCase() === "tbody") {
		let x = document.querySelectorAll("table tbody tr")
		for (let i = 0; i < x.length; i++) {
			x[i].ondblclick = () => window.open("edit-student.html");
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




// Add event listener for right-click on the table

// const table = document.querySelector("table");

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

	// Append the li elements to the ul element
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

	// Add context menu to the page
	document.body.appendChild(contextMenuDiv);
});

// Add event listener to remove context menu when clicking outside of it
document.addEventListener('click', function (e) {
	const contextMenu = document.querySelector('#contextMenu');
	if (contextMenu && !contextMenu.contains(e.target)) {
		contextMenu.remove();
	}
});


