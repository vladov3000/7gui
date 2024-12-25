"use strict";

const timerClasses = ["progressBar", "timeLabel", "duration", "resetButton"];

function main() {
    const timers = document.getElementsByClassName("timer");
    for (const timer of timers) {
	const { progressBar, timeLabel, duration, resetButton } = load(timer, timerClasses);

	resetButton.addEventListener("click", event => {
	    progressBar.value     = 0;
	    timeLabel.textContent = "0s";
	});

	duration.addEventListener("change", event => {
	    const newDuration     = event.target.value;
	    progressBar.max       = newDuration;
	    timeLabel.textContent = `${progressBar.value.toFixed(1)}s`;
	});

	let previousTimestamp = null;
	
	function onTick(timestamp) {
	    if (previousTimestamp === null) {
		previousTimestamp = timestamp;
	    }
	    const elapsed = (timestamp - previousTimestamp) / 1000;

	    if (elapsed <= duration.value) {
		progressBar.value    += elapsed;
		timeLabel.textContent = `${progressBar.value.toFixed(1)}s`;
	    }

	    previousTimestamp = timestamp;
	    window.requestAnimationFrame(onTick);
	}

	window.requestAnimationFrame(onTick);
    }
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
