function prompt(ele) {
	let dialog = document.createElement('div');
	dialog.classList.add('dialog');
	let paragraph = document.createElement('p');
	let button = document.createElement('button');
	button.classList.add('d-btn');
	paragraph.textContent = `A new ${ele} has been added successfully`;
	dialog.appendChild(paragraph);
	dialog.appendChild(button);
	document.body.appendChild(dialog);
	dialog.style.cssText = `position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    background-color:rgba(0,0,0,0.5);
    color:white;
    width:50%;
    height:20%;
    padding:10px;
    border-radius:5px;
    justify-content:space-around;
    align-items:center;
    font-size:1.5rem;
    display:flex;
    flex-direction:column;
    `;
	button.textContent = 'OK';
}
document.addEventListener('click', function (e) {
	if (e.target.tagName != 'BUTTON' || e.target.classList.contains('d-btn')) {
		this.querySelector('.dialog').remove();
	}
});
