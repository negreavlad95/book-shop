/**
 *
 * @param $http
 * @param Book
 * @returns {{getListGoogle: getListGoogle, addBook: addBook, addAllBooks: addAllBooks}}
 * @constructor
 */
function BooksGoogle($http, Book) {
    return {
        getListGoogle: getListGoogle,
        addBook: addBook,
        addAllBooks: addAllBooks

    }
    var checkDate = checkDate;

    /**
     *
     * @param toFind
     * @returns {Array}
     */
    function getListGoogle(toFind) {
        var googleList = [];
        $http.get("https://www.googleapis.com/books/v1/volumes?q=" + toFind)
            .then(function(response) {
                _.forEach(response.data.items, function(element) {
                    var price = Math.floor((Math.random() * 50) + 9);

                    if (isBook(element.volumeInfo.authors, element.volumeInfo.categories, element.volumeInfo.description, element.volumeInfo.publishedDate)) {
                        googleList.push({
                            name: element.volumeInfo.title,
                            author: element.volumeInfo.authors[0],
                            description: element.volumeInfo.description,
                            category: element.volumeInfo.categories[0],
                            picture: element.volumeInfo.imageLinks.smallThumbnail,
                            releaseDate: element.volumeInfo.publishedDate,
                            price: price
                        });
                    }
                });
            });
        return googleList;
    }

    /**
     *
     * @param bookData
     */
    function addBook(bookData) {
        Book.create(bookData);
    }

    /**
     *
     * @param googleList
     */
    function addAllBooks(googleList) {
        _.forEach(googleList, function(element) {
            Book.create(element);
        });
    }

    /**
     *
     * @param authors
     * @param categories
     * @param description
     * @param date
     * @returns {boolean}
     */
    function isBook(authors, categories, description, date) {
        if (authors && categories && description && checkDate(date)) {
            return true;
        }
        return false;
    }

    /**
     *
     * @param dateToCheck
     * @returns {boolean}
     */
    function checkDate(dateToCheck) {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        return dateToCheck.match(regEx) !== null;
    }
}
angular
    .module("bookShop")
    .factory("BooksGoogle", BooksGoogle);
