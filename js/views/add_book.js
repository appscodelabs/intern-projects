const Backbone = require('backbone');
const $ = require('jquery');
Backbone.$ = $;
// const Book = require('../models/book');
module.exports = Backbone.View.extend({
  el: '.container',
  addBookTemplate: 'form.html',
  bookList: '',
  initialize(options) {
    this.books = options.books;
    console.log('in add book');
  },
  render() {
    this.$el.html(global.nunjucksEnv.render(this.addBookTemplate));
  },
  events: {
    'submit #formId': 'upload'
  },
  getBase64Image(path) {
    const img = new Image();
    img.src = path;
    const canvas = document.createElement('canvas');
    const that = this;
    img.onload = function() {
      console.log('sdfds');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL('image/png');
      // alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ''));
      const title = $('#bName').val();
      const author = $('#AuthorName').val();
      const edition = $('#edition').val();
      const catagory = $('#catagory').val();
      const price = $('#price').val();
      const abstract = $('#abstract').val();
      const bookId = that.books.generateId();
      const bookImage = dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
      that.books.create({
        title: title,
        author: author,
        edition: edition,
        catagory: catagory,
        price: price,
        abstract: abstract,
        bookImage: bookImage,
        bookId: bookId
      });
      Backbone.history.navigate('#/', {trigger: true});
      // return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
    };
  },
  upload(e) {
    e.preventDefault();
    const tmppath = URL.createObjectURL(document.getElementById('fileToUpload').files[0]);
    this.getBase64Image(tmppath);
    // $("img").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
    // book property
    // console.log(document.getElementById('fileToUpload').files[0].mozFullPath);
    /* const title = $('#bName').val();
    const author = $('#AuthorName').val();
    const edition = $('#edition').val();
    const catagory = $('#catagory').val();
    const price = $('#price').val();
    const abstract = $('#abstract').val();
    const bookId = this.books.generateId();
    const bookImage = this.getBase64Image(tmppath);
    this.books.create({
      title: title,
      author: author,
      edition: edition,
      catagory: catagory,
      price: price,
      abstract: abstract,
      bookImage: bookImage,
      bookId: bookId
    }); */
    // Backbone.history.navigate('#/', {trigger: true});
  }
});
