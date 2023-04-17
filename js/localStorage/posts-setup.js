function prompt() {

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
	paragraph.textContent = `A new post published successfully`;
	color = "green"

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
	font-family: Arial, Helvetica, sans-serif;
	`

	button.textContent = 'OK';

	button.style.cssText = `
	padding: 12px;
    width: 12%;
	margin-top: 0px !important;
	margin-right: 0px  !important;
	margin-top: 20px;
	display: inline-block;
	background-color: #3aa8ef;
	border-radius: 8px;
	color: white;
	padding: 10px;
	border: none;
	font-size: 26px;
	cursor: pointer;
	font-family: Arial, Helvetica, sans-serif;
	`
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

let publisher = document.querySelector(".publish-btn")
if (publisher) {
	publisher.addEventListener("click", () => {
		let Posts = JSON.parse(localStorage.getItem("Posts"));
		let Vars = JSON.parse(localStorage.getItem("Vars"));

		let headVal = document.querySelector("input").value;
		let bodyVal = document.querySelector("textarea").value;
		if (headVal.trim().length != 0 && bodyVal.trim().length != 0) {
			prompt();
			Posts[Vars["post-id"]] = {};
			Posts[Vars["post-id"]]["Head"] = headVal;
			Posts[Vars["post-id"]]["Body"] = bodyVal;

			let span;
			let div;
			let ul;
			let li;

			// console.log(headVal, bodyVal);
			span = document.createElement('span');
			span.classList.add('post-icon');

			div = document.createElement('div');
			div.classList.add('menu');

			ul = document.createElement('ul');
			li = document.createElement('li');
			li.textContent = 'Delete';
			li.classList.add("delete-post");

			ul.appendChild(li);
			div.appendChild(ul);

			let post = document.createElement("div");
			post.classList.add("post");

			let head = document.createElement("p");
			head.classList.add("post-title");
			head.appendChild(document.createTextNode(headVal));


			let body = document.createElement("p");
			body.classList.add("post-content");
			body.appendChild(document.createTextNode(bodyVal));

			post.appendChild(head);
			post.appendChild(body);
			post.appendChild(span);
			post.appendChild(div);

			post.setAttribute("post-id", Vars["post-id"]);
			let posts = document.querySelector(".news");
			posts.insertBefore(post, posts.firstChild)


			document.querySelector("input").value = '';
			document.querySelector("textarea").value = '';

			Vars["post-id"] = Number(Vars["post-id"]) + 1;
			localStorage.setItem("Vars", JSON.stringify(Vars));
			localStorage.setItem("Posts", JSON.stringify(Posts));
		}


	});
}



let posts = document.querySelector(".news");
if (posts) {

	const Posts = JSON.parse(localStorage.getItem("Posts"));

	const sortedKeys = Object.keys(Posts).sort((a, b) => b.localeCompare(a));

	for (let i = 0; i < sortedKeys.length; i++) {
		id = `${sortedKeys[i]}`;
		let post = document.createElement("div");
		post.classList.add("post");
		post.setAttribute("post-id", id);

		let head = document.createElement("p");
		head.classList.add("post-title");
		head.appendChild(document.createTextNode(Posts[id]["Head"]));

		let body = document.createElement("p");
		body.classList.add("post-content");
		body.appendChild(document.createTextNode(Posts[id]["Body"]));

		let span;
		let div;
		let ul;
		let li;
		if (publisher) {
			span = document.createElement('span');
			span.classList.add('post-icon');

			div = document.createElement('div');
			div.classList.add('menu');

			ul = document.createElement('ul');
			li = document.createElement('li');
			li.textContent = 'Delete';
			li.classList.add("delete-post");

			ul.appendChild(li);
			div.appendChild(ul);
		}



		post.appendChild(head);
		post.appendChild(body);

		if (publisher) {
			post.appendChild(span);
			post.appendChild(div);
		}

		posts.appendChild(post);
	}


}


