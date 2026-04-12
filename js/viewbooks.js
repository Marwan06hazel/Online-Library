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
    setupFilters(books);
}

function renderBooks(booksToDisplay) {
    booksGrid.innerHTML = "";

    booksToDisplay.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <img src="${book.cover}" alt="Book Cover" class="book-cover-img">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="author">by ${book.author}</p>
                <p class="category">${book.Category}</p>
                <div class="book-actions">
                    <a href="Details.html?id=${book.id}" class="details-btn">Details</a>
                    <a href="borrowpage.html?id=${book.id}" class="borrow-btn">Borrow</a>
                    <a href="managebooks.html?id=${book.id}" class="borrow-btn">Edit</a>
                </div>
            </div>
        `;
        booksGrid.appendChild(card);
    });
}
function setupFilters(allBooks) {
    const filterAction = () => {
        const query = searchInput.value.toLowerCase();
        const cat = categoryFilter.value.toLowerCase();

        const filtered = allBooks.filter(b => {
            const matchesSearch = b.title.toLowerCase().includes(query) ||
                b.author.toLowerCase().includes(query);
            const matchesCat = cat === "all" || b.Category.toLowerCase() === cat;
            return matchesSearch && matchesCat;
        });
        renderBooks(filtered);
    };

    searchInput.addEventListener("input", filterAction);
    categoryFilter.addEventListener("change", filterAction);
}

loadLibrary();
