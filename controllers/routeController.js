const ComicBook = require('../models/comicBook.js');

// i am creating a new comic book here
exports.createComic = async (req, res) => {
  try {
    const comic = new ComicBook(req.body);
    const savedComic = await comic.save();
    res.status(201).json({ success: true, data: savedComic });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// I'm hanfling the get all comics here with pagination, filtering and sorting
exports.getAllComics = async (req,res) => {
  const { author, year, condition, price, page = 1, limit = 10, sort } = req.query;

  const query = {};
  if (author) query.author = author;
  if (year) query.year = year;
  if (condition) query.condition = condition;
  if (price) query.price = { $lte: price };

  try {
    const comics = await ComicBook.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort(sort || 'name');
    
    const count = await ComicBook.countDocuments(query);
    res.status(200).json({ success: true, data: comics, total: count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// function written to get comic by id
exports.getComicById = async (req, res) => {
  try {
    const comic = await ComicBook.findById(req.params.id);
    if (!comic) return res.status(404).json({ success: false, message: 'Comic not found' });
    res.status(200).json({ success: true, data: comic });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// function written to updaate comic book.
exports.updateComic = async (req, res) => {
  try {
    const updatedComic = await ComicBook.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComic) return res.status(404).json({ success: false, message: 'Comic not found' });
    res.status(200).json({ success: true, data: updatedComic });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// function written to delete comic by id
exports.deleteComic = async (req, res) => {
  try {
    const deletedComic = await ComicBook.findByIdAndDelete(req.params.id);
    if (!deletedComic) return res.status(404).json({ success: false, message: 'Comic not found' });
    res.status(200).json({ success: true, data: deletedComic });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
