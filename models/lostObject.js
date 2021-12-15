const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    name: { type: String },
    contact: { type: Number },
    itemLost: { type: String },
    itemDescription: { type: String },
    reportDate: { type: Date },
    lostOrFound: { type: String },
  },
  { timestamps: true }
);

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
