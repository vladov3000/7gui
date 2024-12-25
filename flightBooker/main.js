"use strict";

const bookingClasses = ["typeSelector", "startDate", "endDate", "bookButton", "message"];

function main() {
    const bookings = document.getElementsByClassName("booking");
    for (const booking of bookings) {
	const bookButton = element(booking, "bookButton");

	booking   .addEventListener("change", event => onBookingChange(booking));
	bookButton.addEventListener("click" , event => submitBooking  (booking));
    }
}

function onBookingChange(booking) {
    const { typeSelector, startDate, endDate, bookButton } = load(booking, bookingClasses);

    const type       = typeSelector.value;
    endDate.disabled = type === "oneWay";

    const start = validateDate(startDate);
    const end   = validateDate(endDate);

    const allowBooking  = validateDuration(type, start, end);
    bookButton.disabled = !allowBooking;
}

function validateDate(date) {
    let value = null;
    if (!date.disabled) {
	value = date.valueAsDate;
	if (value === null) {
	    date.classList.add("malformedInput");
	} else {
	    date.classList.remove("malformedInput");
	}
    }
    return value;
}

function validateDuration(type, start, end) {
    if (type === "oneWay") {
	return start !== null;
    } else if (type === "return") {
	return start !== null && end !== null && start < end;
    }
}

function submitBooking(booking) {
    const { typeSelector, startDate, endDate, message } = load(booking, bookingClasses);

    const type  = typeSelector.value;
    const start = startDate.value;
    const end   = endDate.value;
    
    if (type === "oneWay") {
	message.textContent = `You have booked a flight on ${start}.`;
    } else if (type === "return") {
	message.textContent = `You have booked flights on ${start} and ${end}.`;;
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
