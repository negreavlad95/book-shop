/**
 *
 * @param $timeout
 * @param Book
 * @param getBookList
 * @constructor
 */
function ListCtrl($timeout, Book, getBookList) {
    var vm = this;

    vm.bookList = getBookList;
    vm.removeBook = removeBook;
    vm.removed = removed;
    vm.showMessage = false;
    /**
     *
     * @param id
     */
    function removeBook(id) {
        console.log(vm.bookList);
        Book.destroy(id)
            .then(function(response) {
                console.log('deleted:', response);
                _.remove(vm.bookList, { id: id });

                vm.removed('Book removed');
            })
            .catch(function() {
                vm.removed('Book not removed');
            });
    }

    /**
     *
     * @param message
     */
    function removed(message) {
        vm.removedMessage = message;
        vm.showMessage = true;
        $timeout(function() {
            vm.showMessage = false;
        }, 3000);
    }
}
angular
    .module("bookShop")
    .controller("ListCtrl", ListCtrl);
