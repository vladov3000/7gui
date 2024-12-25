function main() {
    let names = ["Emil, Hans", "Mustermann, Max", "Tisch, Roman"];

    for (const crud of document.getElementsByClassName("crud")) {
	const prefixInput  = element(crud, "prefixInput");
	const nameSelector = element(crud, "nameSelector");
	const nameInput    = element(crud, "nameInput");
	const surnameInput = element(crud, "surnameInput");
	const createButton = element(crud, "createButton");
	const updateButton = element(crud, "updateButton");
	const deleteButton = element(crud, "deleteButton");

	makeOptions(nameSelector, names, "");
	
	prefixInput.addEventListener("change", event => {
	    const prefix = event.target.value;
	    makeOptions(nameSelector, names, prefix);
	});

	nameSelector.addEventListener("change", event => {
	    const selected        = event.target.value;
	    updateButton.disabled = selected === "";
	    deleteButton.disabled = selected === "";
	});

	createButton.addEventListener("click", event => {
	    names.push(`${surnameInput.value}, ${nameInput.value}`);
	    makeOptions(nameSelector, names, prefixInput.value);
	});

	updateButton.addEventListener("click", event => {
	    names[nameSelector.value] = `${surnameInput.value}, ${nameInput.value}`;
	    makeOptions(nameSelector, names, prefixInput.value);
	});

	deleteButton.addEventListener("click", event => {
	    names.splice(nameSelector.value, 1);
	    makeOptions(nameSelector, names, prefixInput.value);
	});
    }
}

function makeOptions(nameSelector, names, prefix) {
    const options = [];
    
    for (let i = 0; i < names.length; i++) {
	if (names[i].startsWith(prefix)) {
	    const option       = document.createElement("option");
	    option.value       = i;
	    option.textContent = names[i];
	    options.push(option);
	}
    }

    nameSelector.replaceChildren(...options);
}

function element(parent, className) {
    return parent.getElementsByClassName(className)[0];
}

function load(parent, classNames) {
    let output = {};
    for (const className of classNames){
	output[className] = element(parent, className);
    }
    return output;
}

document.addEventListener("DOMContentLoaded", main);
