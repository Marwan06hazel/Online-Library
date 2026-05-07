const urlParams = new URLSearchParams(window.location.search);
const CURRENT_BOOK_ID = Number(urlParams.get("id"));

async function init() {
    setupNavbar();

    let books = JSON.parse(localStorage.getItem("books"));

    try {

        if (!books || books.length === 0) {

            const response = await fetch("/static/storage/Books.json");

            if (!response.ok) {
                throw new Error("Failed to fetch books data");
            }

            const data = await response.json();

            books = data.books || [];

            localStorage.setItem("books", JSON.stringify(books));
        }

        displayBookDetails(books);

    } catch (error) {
        console.error("Error loading books:", error);
    }
}

function displayBookDetails(books) {

    const book = books.find(
        (b) => Number(b.id) === CURRENT_BOOK_ID
    );

    if (!book) {
        console.error("Book not found!");
        return;
    }

    // ================= IMAGE =================

    const coverImg = document.querySelector(".book-cover-img");

    if (coverImg) {
        coverImg.src = book.cover;
        coverImg.alt = book.title;
    }

    // ================= MAIN INFO =================

    document.querySelector(".box1").textContent =
        `${book["available-copies"]} Available`;

    document.querySelector(".box2").textContent =
        book.Category;

    document.querySelector("h1").textContent =
        book.title;

    document.querySelector("h3").textContent =
        book.author;

    document.querySelector(".p").textContent =
        book.Description;

    // ================= DETAILS =================

    const details = document.querySelectorAll(".container2 h4");

    if (details.length >= 6) {

        details[0].textContent = book.author;

        details[1].textContent = book.id;

        details[2].textContent = book["Publish-Date"];

        details[3].textContent = book.pages;

        details[4].textContent = book.Publisher;

        details[5].textContent = book["Total-Copies"];
    }

    // ================= ACTION BUTTONS =================

    const userRole = localStorage.getItem("role");

    let actionButton = "";

    if (userRole === "admin") {

        actionButton = `
            <a href="managebooks.html?id=${book.id}" 
               class="borrow-btn">
               Edit This Book
            </a>

            <a href="#"
               class="borrow-btn remove-btn"
               onclick="removeBook(${book.id})">
               Remove This Book
            </a>
        `;

    } else {

        actionButton = `
            <a href="borrowpage.html?id=${book.id}" 
               class="borrow-btn">
               Borrow This Book
            </a>
        `;
    }

    const actionContainer =
        document.querySelector(".action-container");

    if (actionContainer) {
        actionContainer.innerHTML = actionButton;
    }
}

function removeBook(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    let books =
        JSON.parse(localStorage.getItem("books")) || [];

    const updatedBooks = books.filter(
        (b) => Number(b.id) !== Number(id)
    );

    localStorage.setItem(
        "books",
        JSON.stringify(updatedBooks)
    );

    alert("Book removed successfully!");

    window.location.href = "viewbooks.html";
}

function setupNavbar() {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    const userRole = localStorage.getItem("role");

    if (userRole === "admin") {

        navbar.innerHTML = `
            <a href="userpage.html">Home</a>

            <a href="viewbooks.html">Books</a>

            <a href="addbook.html">Add Book</a>

            <a href="../index.html"
               class="button"
               onclick="logout()">
               Log out
            </a>
        `;

    } else {

        navbar.innerHTML = `
            <a href="userpage.html">Home</a>

            <a href="viewbooks.html">Books</a>

            <a href="listofborrowedbooks.html">
                My Borrowed Books
            </a>

            <a href="../index.html"
               class="button"
               onclick="logout()">
               Log out
            </a>
        `;
    }
}

// ================= START =================

init();