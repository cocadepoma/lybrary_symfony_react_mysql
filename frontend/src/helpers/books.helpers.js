

export const getBookByIsbn = (isbn, books) => {

    if (!books || books.length <= 0 || !isbn || isbn.length <= 0) {
        return;
    }

    return books.find(book => book.isbn === isbn);
}