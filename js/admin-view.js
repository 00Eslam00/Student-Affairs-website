
// for (let i = 0 ; i < document.querySelectorAll(".delete").length ; i++){

// 	document.querySelectorAll(".delete")[i].onclick = () => {

// 		document.querySelectorAll(".delete")[i].parentElement.remove();
// 	}

// }


document.addEventListener("click" , (ele) => {
	ele = ele.target;
	//console.log(ele)
	if (ele.classList.contains("delete")){
		console.log(ele);
		ele.parentElement.remove();
	}
});

function addFilter(){

	let search_value = document.querySelector(".search-bar").value;
	search_value.trim
	if(search_value.length === 0){
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
