const urlParams = new URLSearchParams(window.location.search);
const CURRENT_BOOK_ID = Number(urlParams.get("id"));

function loadBook() {
    const books = JSON.parse(localStorage.getItem("books")) || [];

    const book = books.find(b => Number(b.id) === CURRENT_BOOK_ID);

    if (!book) return;

    document.getElementById("book-title").textContent = book.title;
    document.getElementById("book-author").textContent = "by " + book.author;
    document.getElementById("book-img").src = book.cover;
    document.getElementById("book-category").textContent = book.Category;
}

loadBook();

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

document.querySelector(".borrow-btn button").addEventListener("click", function () {

    const dueDateText = dueDateSpan.textContent;
    const addressInput = document.getElementById("delivery-address");

    if (!dueDateText) {
        alert("Please select a borrow duration first!");
        duration.focus();
        return;
    }

    if (!addressInput.value.trim()) {
        alert("Please fill out your delivery address!");
        addressInput.focus();
        return;
    }

    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

    if (borrowedBooks.some(b => b.id === CURRENT_BOOK_ID)) {
        alert("This book is already borrowed!");
        return;
    }

    const newEntry = {
        id: CURRENT_BOOK_ID,
        date: dueDateText.replace("Due date: ", ""),
        address: addressInput.value.trim()
    };

    borrowedBooks.push(newEntry);

    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

    alert("Book borrowed successfully!");
});
