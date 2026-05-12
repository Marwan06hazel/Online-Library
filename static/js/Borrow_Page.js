const durationInput = document.getElementById("duration");
const unitSelect = document.getElementById("duration-unit");
const dueDateSpan = document.getElementById("due-date");

function updateDueDate() {
    const duration = parseInt(durationInput.value);
    const unit = unitSelect.value;
    if (!duration || duration <= 0) {
        dueDateSpan.textContent = "";
        return;
    }
    const today = new Date();
    const dueDate = new Date(today);
    if (unit === "days") {
        dueDate.setDate(today.getDate() + duration);
    } else if (unit === "weeks") {
        dueDate.setDate(today.getDate() + duration * 7);
    } else if (unit === "months") {
        dueDate.setMonth(today.getMonth() + duration);
    }
    dueDateSpan.textContent = "Due date: " + dueDate.toDateString();
}

durationInput.addEventListener("input", updateDueDate);
unitSelect.addEventListener("change", updateDueDate);

document.querySelector(".borrow-btn button").addEventListener("click", function() {
    const dueDateText = dueDateSpan.textContent;
    const addressInput = document.getElementById("delivery-address");
    if (!dueDateText) {
        alert("Please select a borrow duration first!");
        durationInput.focus();
        return;
    }
    if (!addressInput.value.trim()) {
        alert("Please fill out your delivery address!");
        addressInput.focus();
        return;
    }
    document.querySelector("form").submit();
});