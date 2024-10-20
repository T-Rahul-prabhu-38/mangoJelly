const express = require('express');
const {
  createComic,
  getAllComics,
  getComicById,
  updateComic,
  deleteComic,
} = require('../controllers/routeController.js');

const router = express.Router();

//path to create a comic book
router.post('/', createComic);

// Geting all comic books with pagination, filtering, and sorting
router.get('/', getAllComics);

// Geting a comic book by ID
router.get('/:id', getComicById);

// Updating a comic book by ID
router.put('/:id', updateComic);

// Deleting a comic book by ID
router.delete('/:id', deleteComic);


module.exports = router;
