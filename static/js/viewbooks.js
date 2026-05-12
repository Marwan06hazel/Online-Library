const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function searchBooks() {
    const cards = document.querySelectorAll(".book-card");

    function performFilter() {
        const textValue = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value.toLowerCase();

        cards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const author = card.dataset.author.toLowerCase();
            const category = card.dataset.category.toLowerCase();
            const matchesText = title.includes(textValue) || author.includes(textValue) || category.includes(textValue);
            const matchesCategory = selectedCategory === "all" || category === selectedCategory;

            if (matchesText && matchesCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", performFilter);
    categoryFilter.addEventListener("change", performFilter);
}

// ================= START =================

searchBooks();