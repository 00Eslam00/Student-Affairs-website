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
	}
});


document.addEventListener("change", (ele) => {
	ele = ele.target;
	if (ele.classList.contains("select-stat")) {
		console.log(ele.value);
	}
});
