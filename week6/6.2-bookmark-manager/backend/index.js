const express = require("express");
const cors = require("cors");
const {
  addBookmark,
  deleteBookmark,
  getAllBookmarks,
  searchBookmarks,
  favoriteBookmark,
  unfavoriteBookmark,
} = require("./routes/bookmarks"); // importing callback functions for routes
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Get all bookmarks
app.get("/bookmarks", getAllBookmarks);

// Add a new bookmark
app.post("/bookmarks", addBookmark);

// Delete a bookmark
app.delete("/bookmarks/:id", deleteBookmark);

app.post("/bookmarks/searchBookmarks", searchBookmarks);

app.put("/bookmarks/favoriteBookmark", favoriteBookmark);

app.put("/bookmarks/unfavoriteBookmark", unfavoriteBookmark);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
