const urlParams = new URLSearchParams(window.location.search); // Get the query string from the URL (Written in viewbooks page)
const CURRENT_BOOK_ID = Number(urlParams.get('id'));

fetch('../Storage/Books.json')
    .then(response => response.json())  // Converting the response (data collected from JSON) from JSON to a JavaScript object
    .then(data => {
        const book = data.books.find(b => b.id === CURRENT_BOOK_ID);

        if (book) {
            updatePageContent(book);
        }
    })
function updatePageContent(book) {
    document.getElementById("book-title").textContent = book.title;
    document.getElementById("book-author").textContent = "by " + book.author;
    document.getElementById("book-img").src = book.cover;
    document.getElementById("book-category").textContent = book.Category;
}

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

durationInput.addEventListener("input", updateDueDate); // Listen for changes in the duration input
unitSelect.addEventListener("change", updateDueDate);  // Listen for changes in the unit select

// "Borrow" button logic
document.querySelector(".borrow-btn button").addEventListener("click", function () {

    const dueDateText = document.getElementById("due-date").textContent; // Get the displayed due date text
    const addressInput = document.getElementById("delivery-address"); // Get the displayed delivery address text

    if (!dueDateText || dueDateText === "") {
        alert("Please select a borrow duration first!");
        durationInput.focus();
        return;
    }
    if (!addressInput.value.trim()) {
        alert("Please fill out your delivery address!");
        addressInput.focus();
        return;
    }

    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || []; // Making an array (empty or alrady had data) to push data and save it in the local storage

    if (borrowedBooks.some(book => book.id === CURRENT_BOOK_ID)) {
        alert("This book is already borrowed!");
        return;
    }

    const newEntry = {
        id: CURRENT_BOOK_ID,
        date: dueDateText.replace("Due date: ", ""),
        address: addressInput.value.trim()
    };

    borrowedBooks.push(newEntry);
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks)); // Save the updated list back to local storage

    alert("Book borrowed successfully!");
});
