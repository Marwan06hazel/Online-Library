const urlParams = new URLSearchParams(window.location.search);
const CURRENT_BOOK_ID = Number(urlParams.get("id"));

async function init() {
    setupNavbar();

    let books = JSON.parse(localStorage.getItem("books"));

    if (!books || books.length === 0) {
         const res = await fetch("../Storage/Books.json");
         const data = await res.json();
         localStorage.setItem("books", JSON.stringify(data.books));
         books = data.books;
        
    }

    if (books) {
        displayBookDetails(books);
    }
}

function displayBookDetails(books) {
    const book = books.find(b => Number(b.id) === CURRENT_BOOK_ID);

    if (!book) {
        console.error("Book not found!");
        return;
    }

    document.querySelector(".book-cover-img").src = book.cover;
    document.querySelector(".box1").textContent = `${book["available-copies"]} Available`;
    document.querySelector(".box2").textContent = book.Category;
    document.querySelector("h1").textContent = book.title;
    document.querySelector("h3").textContent = book.author;
    document.querySelector(".p").textContent = book.Description;

    const details = document.querySelectorAll(".container2 h4");

    if (details.length >= 6) {
        details[0].textContent = book.author;
        details[1].textContent = book.id;
        details[2].textContent = book["Publish-Date"];
        details[3].textContent = book.pages;
        details[4].textContent = book.Publisher;
        details[5].textContent = book["Total-Copies"];
    }

    const navbar = document.getElementById("navbar");
    const userRole = localStorage.getItem("role");

    let actionButton = "";
    if (userRole === "admin") {
        actionButton = `
        <a href="managebooks.html?id=${book.id}" class="borrow-btn" style="margin-left: -70px;">Edit This Book</a>
        <a href="#" class="borrow-btn"
       onclick="removeBook(${book.id})" 
       style="background-color: #dc2626; border-color: #dc2626; margin-left: 15px;">
       Remove This Book
    </a>
    `;
    } else {
        actionButton = `
        <a href="borrowpage.html?id=${book.id}" class="borrow-btn">Borrow This Book</a>
    `;
    }

    const actionContainer = document.querySelector(".action-container");
    if (actionContainer) {
        actionContainer.innerHTML = actionButton;
    }
}

function removeBook(id) {
    const confirmDelete = confirm("Are you sure you want to delete this book? This cannot be undone.");

    if (confirmDelete) {
        let books = JSON.parse(localStorage.getItem("books")) || [];

        const updatedBooks = books.filter(b => Number(b.id) !== Number(id));

        localStorage.setItem("books", JSON.stringify(updatedBooks));

        alert("Book removed successfully!");
        window.location.href = "viewbooks.html";
    }
}

function setupNavbar() {
    const navbar = document.getElementById("navbar");
    const userRole = localStorage.getItem("role");

    if (userRole === "admin") {
        navbar.innerHTML = `
            <a href="adminpage.html">Dashboard</a>
            <a href="viewbooks.html">Manage Books</a>
            <a href="addbook.html">Add New Book</a>
            <a href="#" class="button" onclick="logout()">Log out</a>
        `;
    } else {
        navbar.innerHTML = `
            <a href="userpage.html">Home</a>
            <a href="viewbooks.html">Books</a>
            <a href="listofborrowedbooks.html">My Borrowed Books</a>
            <a href="#" class="button" onclick="logout()">Log out</a>
        `;
    }
}


init();
