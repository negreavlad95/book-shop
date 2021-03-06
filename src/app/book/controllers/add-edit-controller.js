/**
 * Add or edit controller
 *
 * @param $anchorScroll
 * @param Book
 * @param book
 * @constructor
 * @ngInject
 */
function AddEditCtrl($anchorScroll, Book, book) {
  var vm = this;
  $anchorScroll();
  vm.book = book || {};
  vm.submit = submit;
  
  //////////////////////////////
  
  /**
   * Creating a new book
   */
  function createBook() {
    Book.create(vm.book)
      .then(function () {
        vm.createdMessage = 'Book added successfully!';
      })
      .catch(function () {
        vm.createdMessage = 'Failed to add book!';
      });
  }
  
  /**
   * Updates details of a book
   */
  function updateBook() {
    Book.update(vm.book.id, vm.book)
      .then(function () {
        vm.updateMessage = 'Book updated successfully!';
      })
      .catch(function () {
        vm.updateMessage = 'Failed to update the book!';
      });
  }
  
  /**
   * Check if update or create
   */
  function submit() {
    if (vm.form.$invalid) {
      return;
    }
    if (book) {
      updateBook();
    } else {
      createBook();
    }
  }
}

angular
  .module("bookShop")
  .controller("AddEditCtrl", AddEditCtrl);
