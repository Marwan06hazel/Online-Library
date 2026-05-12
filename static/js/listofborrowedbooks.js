//--- Handling Return logic

function returnBook(bookId) {
    fetch(`/return/${bookId}/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1]
        }
    }).then(() => window.location.reload());
}

//--- Handling Favourite Toggle logic

function favToggle(bookId, iconElement) {
    fetch(`/favourite/${bookId}/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1]
        }
    }).then(res => res.json()).then(data => {
        if (data.is_favourite) {
            iconElement.classList.remove("fa-regular");
            iconElement.classList.add("fa-solid");
        } else {
            iconElement.classList.remove("fa-solid");
            iconElement.classList.add("fa-regular");
        }
    });
}