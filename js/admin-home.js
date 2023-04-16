const postIcon = document.querySelector('.post-icon');
const menu = document.querySelector('.menu');

document.addEventListener('click', (ele) => {
	ele = ele.target;

	const postIcons = document.querySelectorAll('.post-icon');
	for (let i = 0; i < postIcons.length; i++) {
		postIcons[i].nextElementSibling.style.display = 'none';
	}

	if (ele.classList.contains("post-icon"))
		ele.nextElementSibling.style.display = 'block';
});

if(menu)
menu.addEventListener('click', (event) => {
	if (event.target.tagName === 'LI') {
		console.log(event.target.textContent); // do something with selected option
		menu.style.display = 'none'; // hide menu
	}
});

document.addEventListener('click', (event) => {
	if (!event.target.matches('.post-icon, .menu, .menu *')) {
		menu.style.display = 'none'; // hide menu if clicked outside
	}
});
