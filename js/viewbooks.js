const booksGrid = document.getElementById("booksGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function loadLibrary() {
    let books = JSON.parse(localStorage.getItem("books"));

    if (!books || books.length === 0) {
        const res = fetch("../Storage/Books.json");
        const data = res.json();
        books = data.books;
        localStorage.setItem("books", JSON.stringify(books));
    }

    renderBooks(books);
}

function renderBooks(booksToDisplay) {
    booksGrid.innerHTML = "";
    const userRole = localStorage.getItem("role");

    booksToDisplay.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";

        let actionButton = "";
        if (userRole === "admin") {
            actionButton = `<a href="managebooks.html?id=${book.id}" class="borrow-btn">Edit</a>`;
        } else {
            actionButton = `<a href="borrowpage.html?id=${book.id}" class="borrow-btn">Borrow</a>`;
        }

        card.innerHTML = `
            <img src="${book.cover}" alt="Book Cover" class="book-cover-img">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="author">by ${book.author}</p>
                <p class="category">${book.Category}</p>
                <div class="book-actions">
                    <a href="Details.html?id=${book.id}" class="details-btn">Details</a>
                    ${actionButton}
                </div>
            </div>
        `;
        booksGrid.appendChild(card);
    });
}

loadLibrary();

function setupNavbar() {
    const navbar = document.getElementById("navbar");
    const userRole = localStorage.getItem("role");

    if (userRole === "admin") {
        // Admin Navbar
        navbar.innerHTML = `
            <a href="adminpage.html">Dashboard</a>
            <a href="viewbooks.html">Manage Books</a>
            <a href="addbook.html">Add New Book</a>
            <a href="../index.html" class="button" onclick="logout()">Log out</a>
        `;
    } else {
        // User Navbar
        navbar.innerHTML = `
            <a href="userpage.html">Home</a>
            <a href="viewbooks.html">Books</a>
            <a href="listofborrowedbooks.html">My Borrowed Books</a>
            <a href="../index.html" class="button" onclick="logout()">Log out</a>
        `;
    }
}

setupNavbar();
