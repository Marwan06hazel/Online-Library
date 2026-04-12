//--- Helper Function For Specifying Data/Record for each User

const uid = localStorage.getItem("currentUserId");

function getKey(key) {
    return `${uid}_${key}`;
}
// it will be used in getting & setting each list in localStorage
// it makes lists name user1_borrowedBooks, user1_historyBooks


//--- Handling Return logic + Updating Two Lists (borrowed, history)

function returnBook(idToRemove) {
    let borrowedBooks = JSON.parse(localStorage.getItem(getKey("borrowedBooks")) || "[]");
    let historyBooks = JSON.parse(localStorage.getItem(getKey("historyBooks")) || "[]");

    // find the book before removing it
    const bookToReturn = borrowedBooks.find(book => book.id === idToRemove);

    //  remove it from borrowed list
    const updatedList = borrowedBooks.filter(book => book.id !== idToRemove);
    
    // add it to reading history
    if (bookToReturn) {
        historyBooks.push({
            id: bookToReturn.id,
            borrowDate: bookToReturn.borrowDate, // keep original data (from Borrow_Page)
            dueDate: bookToReturn.dueDate,
            returnDate: new Date().toLocaleDateString()
        });
    }

    // save both lists
    localStorage.setItem(getKey("borrowedBooks"), JSON.stringify(updatedList));
    localStorage.setItem(getKey("historyBooks"), JSON.stringify(historyBooks));

    window.location.reload();
}


//--- Handling Favourite Toggle logic + Updating its List

function favToggle(bookId, iconElement){
    let favoriteBooks = JSON.parse(localStorage.getItem(getKey("favoriteBooks")) || "[]");

    const index = favoriteBooks.findIndex(item => item.id === bookId);

    if (index !== -1) {  // remove if it already exists
        favoriteBooks.splice(index, 1);
        if (iconElement) {
            iconElement.classList.remove("fa-solid");
            iconElement.classList.add("fa-regular");
        }

    } else {            // add new favorite book
        favoriteBooks.push({ id: bookId });
        if (iconElement) {
            iconElement.classList.remove("fa-regular");
            iconElement.classList.add("fa-solid");
        }
    }

    // save favorites list(array)
    localStorage.setItem(getKey("favoriteBooks"), JSON.stringify(favoriteBooks));

    // reload changes in UI
    window.location.reload();
}

// helper function to check if book is in favorites >> for checking history/borrowed books status
function isFavorite(bookId) {
    const favorites = JSON.parse(localStorage.getItem(getKey("favoriteBooks")) || "[]");
    return favorites.some(item => item.id === bookId);
}


//--- Rendering UI Upadtes

// get all books data
const books = JSON.parse(localStorage.getItem("books")) || [];

// generic function for all lists
function renderCards(containerSelector, storageKey, emptyMessage, showExtraInfo){ // 1) gets element by nested className, specifies which list, message displayed when empty list(array), function to display different card info
    const container = document.querySelector(containerSelector);
    const list = JSON.parse(localStorage.getItem(getKey(storageKey)) || "[]");
    
    if (container) {
        container.innerHTML = "";

        if (list.length === 0) {
            container.innerHTML = `<p>${emptyMessage}</p>`;
        } else {

            list.forEach(item => { // book: full data of a book (from books object), item: book data that comes from the list (borrowed, favorites, history)

                const book = books.find(b => b.id === item.id); 
  
                if (book) {
                    const card = document.createElement("div");
                    card.className = "card";

                    card.innerHTML = `
                        <div class="card-content">
                            <img src="${book.cover}" alt="${book.title}">
                            <h3>${book.title}</h3>
                            ${showExtraInfo(book, item)} 
                        </div>
                    `;

                    container.appendChild(card);
                }
            });
        }
    }
}

renderCards(
    ".borrowed .cards", "borrowedBooks", "No borrowed books to show.", 
    (book, item) => `
        <p>Borrow Date: ${item.borrowDate}</p>
        <p>Due Date: ${item.dueDate}</p>
        <button onclick="returnBook(${book.id})">Return</button>
        <i 
            class="fa-heart ${isFavorite(book.id) ? "fa-solid" : "fa-regular"}" 
            style="cursor:pointer; font-size:28px; color: rgb(143, 8, 46);"
            onclick="favToggle(${book.id}, this)">
        </i>
    `
);

renderCards(
    ".history .cards", "historyBooks","No previously read books.",
    (book, item) => `
        <p>Category: ${book.Category}</p>
        <p>Borrow Date: ${item.borrowDate}</p>
        <p>Returned on: ${item.returnDate}</p>
        <p>Rating:</p>
        <i 
            class="fa-heart ${isFavorite(book.id) ? "fa-solid" : "fa-regular"}" 
            style="cursor:pointer; font-size:28px; color: rgb(143, 8, 46);"
            onclick="favToggle(${book.id}, this)">
        </i>
    `
);

renderCards(
    ".favourites .cards", "favoriteBooks", "No books are added to favorite.", 
    (book, item) => `
        <p>Category: ${book.Category}</p>
        <p>Rating:</p>
        <i 
            class="fa-heart fa-solid"
            style="cursor:pointer; font-size:28px; color: rgb(143, 8, 46);"
            onclick="favToggle(${book.id}, this)">
        </i>
    `
);
