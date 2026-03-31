const DB_KEYS = {
  books: "libraria_books",
  users: "libraria_users",
};

/**
 * @returns {Promise<Array>} Array of book objects
 */
async function loadBooks() {
  const cached = localStorage.getItem(DB_KEYS.books);
  if (cached) return JSON.parse(cached);

  try {
    const res = await fetch("../data/books.json");
    if (!res.ok) throw new Error("Could not load books.json");
    const books = await res.json();
    localStorage.setItem(DB_KEYS.books, JSON.stringify(books));
    return books;
  } catch (err) {
    console.error("[db.js] loadBooks error:", err);
    return [];
  }
}

/**
 * @returns {Promise<Array>} Array of user objects
 */
async function loadUsers() {
  const cached = localStorage.getItem(DB_KEYS.users);
  if (cached) return JSON.parse(cached);

  try {
    const res = await fetch("/data/users.json");
    if (!res.ok) throw new Error("Could not load users.json");
    const users = await res.json();
    localStorage.setItem(DB_KEYS.users, JSON.stringify(users));
    return users;
  } catch (err) {
    console.error("[db.js] loadUsers error:", err);
    return [];
  }
}

/**
 * @param {Array} books
 */
function saveBooks(books) {
  localStorage.setItem(DB_KEYS.books, JSON.stringify(books));
}

/**
 * @param {Array} users
 */
function saveUsers(users) {
  localStorage.setItem(DB_KEYS.users, JSON.stringify(users));
}

/**
 * @param {{ books?: Array, users?: Array }} data
 */
function saveData({ books, users } = {}) {
  if (books) saveBooks(books);
  if (users) saveUsers(users);
}

function resetDatabase() {
  localStorage.removeItem(DB_KEYS.books);
  localStorage.removeItem(DB_KEYS.users);
  console.log("[db.js] Database reset. Data will reload from JSON files.");
}