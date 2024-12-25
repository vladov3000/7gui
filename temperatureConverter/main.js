"use strict";

function main() {
    const converters = document.getElementsByClassName("converter");
    for (const converter of converters) {
	const celsiusDisplays    = converter.getElementsByClassName("celsiusDisplay");
	const fahrenheitDisplays = converter.getElementsByClassName("fahrenheitDisplay");
	updateDisplays(celsiusDisplays   , fahrenheitDisplays, celsiusToFahrenheit);
	updateDisplays(fahrenheitDisplays, celsiusDisplays   , fahrenheitToCelsius);
    }
}

function updateDisplays(inputs, outputs, formula) {
    for (const input of inputs) {
	input.addEventListener("change", event => onDisplayChange(outputs, formula, event));
    }
}

function onDisplayChange(outputs, formula, event) {
    const value  = event.target.value;
    if (isNumber(value)) {
	for (const output of outputs) {
	    output.value = formula(value);
	}
    }
}

function isNumber(input) {
    return !isNaN(input);
}

function celsiusToFahrenheit(c) {
    return c * 9 / 5 + 32;
}

function fahrenheitToCelsius(f) {
    return (f - 32) * 5 / 9;
}

document.addEventListener("DOMContentLoaded", main);
