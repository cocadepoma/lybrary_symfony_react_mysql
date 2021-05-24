import { fetchApi } from "./fetch";


export const getBookByIsbn = (isbn, books) => {

    if (!books || books.length <= 0 || !isbn || isbn.length <= 0) {
        return;
    }

    return books.find(book => book.isbn === isbn);
}

export const getBooksWithImages = async (books) => {

    const booksWithImage = await Promise.all(
        books.map(async book => {
            const { id } = book;
            const resp = await fetchApi(`library/getimage?id=${id}`);
            const data = await resp.json();

            if (data.ok) {
                return {
                    ...book,
                    images: [...data.data]
                }
            } else {
                return book;
            }
        })
    );

    return booksWithImage;

}