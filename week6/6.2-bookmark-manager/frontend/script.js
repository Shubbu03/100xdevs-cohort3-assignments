const API_URL = "http://localhost:3001/bookmarks";

// Fetch bookmarks when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchBookmarks();
});

// Fetch bookmarks from the backend
function fetchBookmarks() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const bookmarkList = document.getElementById("bookmark-list");
      bookmarkList.innerHTML = ""; // Clear existing bookmarks
      data.data.forEach((bookmark) => addBookmarkToDOM(bookmark));
    })
    .catch((error) => console.error("Error fetching bookmarks:", error));
}

// Add a bookmark to the DOM
function addBookmarkToDOM(bookmark) {
  const bookmarkList = document.getElementById("bookmark-list");
  const bookmarkElement = document.createElement("div");
  bookmarkElement.className = "bookmark";
  bookmarkElement.innerHTML = `
    <a href="${bookmark.url}" target="_blank">${bookmark.url}</a>
    <span>${bookmark.category || "Uncategorized"}</span>
    <button onclick="deleteBookmark(${bookmark.id})">Delete</button>
    <button onclick="toggleFavorite(${bookmark.id})">${
    bookmark.isFavorite ? "★" : "☆"
  }</button>
  `;
  bookmarkList.appendChild(bookmarkElement);
}

// Add a new bookmark
document.getElementById("add-bookmark-btn").addEventListener("click", () => {
  const urlInput = document.getElementById("url-input");
  const categoryInput = document.getElementById("category-input");

  const newBookmark = {
    url: urlInput.value,
    category: categoryInput.value,
  };

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBookmark),
  })
    .then((response) => response.json())
    .then((data) => {
      addBookmarkToDOM(data.data);
      urlInput.value = "";
      categoryInput.value = "";
    })
    .catch((error) => console.error("Error adding bookmark:", error));
});

// Delete a bookmark
function deleteBookmark(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then(() => {
      const bookmarkElement = document.querySelector(`[data-id="${id}"]`);
      if (bookmarkElement) {
        bookmarkElement.remove();
      }
    })
    .catch((error) => console.error("Error deleting bookmark:", error));
}

// Toggle favorite status
function toggleFavorite(id) {
  const bookmarkElement = document.querySelector(`[data-id="${id}"]`);
  const isFavorite =
    bookmarkElement.querySelector("button:last-child").textContent === "★";

  fetch(`${API_URL}/${id}/${isFavorite ? "unfavorite" : "favorite"}`, {
    method: "PUT",
  })
    .then((response) => response.json())
    .then((data) => {
      const favoriteButton = bookmarkElement.querySelector("button:last-child");
      favoriteButton.textContent = data.data.isFavorite ? "★" : "☆";
    })
    .catch((error) => console.error("Error toggling favorite:", error));
}

// Search bookmarks
document.getElementById("search-btn").addEventListener("click", () => {
  const searchQuery = document.getElementById("search-input").value;

  fetch(`${API_URL}/search?query=${encodeURIComponent(searchQuery)}`)
    .then((response) => response.json())
    .then((data) => {
      const bookmarkList = document.getElementById("bookmark-list");
      bookmarkList.innerHTML = ""; // Clear existing bookmarks
      data.data.forEach((bookmark) => addBookmarkToDOM(bookmark));
    })
    .catch((error) => console.error("Error searching bookmarks:", error));
});
