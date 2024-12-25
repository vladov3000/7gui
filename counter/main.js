"use strict";

function main() {
    const counters = document.getElementsByClassName("counter");
    for (const counter of counters) {
	const inputs  = counter.getElementsByClassName("counterInput");
	const buttons = counter.getElementsByClassName("counterButton");

	const incrementInputs = event => {
	    for (const input of inputs) {
		input.value++;
	    }
	};
	
	for (const button of buttons) {
	    button.addEventListener("click", incrementInputs);
	}
    }
}

document.addEventListener("DOMContentLoaded", main);
