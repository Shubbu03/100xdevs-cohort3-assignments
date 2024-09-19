let bookmarks = []; // in memory space
let id = 1; // Global id counter

function addBookmark(req, res) {
  const { url, category } = req.body;

  if (!url) {
    return res.status(400).json({
      message: "No url found!",
    });
  }

  const newBookmark = {
    id: id++,
    url: url,
    category: category,
  };

  bookmarks.push(newBookmark);

  res.status(201).json({
    message: "Bookmark added!",
    data: newBookmark,
  });
}

function deleteBookmark(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "No id found to delete!",
    });
  }

  const initialLength = bookmarks.length;
  bookmarks = bookmarks.filter((bookmark) => bookmark.id !== parseInt(id));

  if (bookmarks.length === initialLength) {
    return res.status(404).json({
      message: "Bookmark not found!",
    });
  }

  res.json({
    message: "Bookmark deleted!",
  });
}

function getAllBookmarks(req, res) {
  res.json({ message: "Bookmarks fetched successfully", data: bookmarks });
}


function searchBookmarks(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      message: "No search query provided!",
    });
  }

  const searchResults = bookmarks.filter(
    (bookmark) =>
      bookmark.url.toLowerCase().includes(query.toLowerCase()) ||
      (bookmark.category &&
        bookmark.category.toLowerCase().includes(query.toLowerCase()))
  );

  res.json({
    message: "Search results",
    data: searchResults,
  });
}

function favoriteBookmark(req, res) {
  const { id } = req.params;

  const bookmark = bookmarks.find((b) => b.id === parseInt(id));

  if (!bookmark) {
    return res.status(404).json({
      message: "Bookmark not found!",
    });
  }

  bookmark.isFavorite = true;

  res.json({
    message: "Bookmark marked as favorite",
    data: bookmark,
  });
}

function unfavoriteBookmark(req, res) {
  const { id } = req.params;

  const bookmark = bookmarks.find((b) => b.id === parseInt(id));

  if (!bookmark) {
    return res.status(404).json({
      message: "Bookmark not found!",
    });
  }

  bookmark.isFavorite = false;

  res.json({
    message: "Bookmark removed from favorites",
    data: bookmark,
  });
}

module.exports = {
  addBookmark,
  getAllBookmarks,
  deleteBookmark,
  searchBookmarks,
  favoriteBookmark,
  unfavoriteBookmark,
};
