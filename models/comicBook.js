const mongoose = require("mongoose");

//the datysastructure of the comic book is defined here adding all the required fields as mentioned in the assignment.
const comicBookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  pages: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    enum: ["new", "used"],
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ComicBook", comicBookSchema);
