
import { fetchApi } from "../helpers/fetch";
import { types } from "../types/types";
import { toast } from 'react-toastify';
import { ToastSuccess } from "../components/toasts/ToastSuccess";
import { ToastError } from "../components/toasts/ToastError";


export const startLoadingBooks = () => {

    return async (dispatch) => {

        // fetch the books to API

        try {
            const resp = await fetchApi('library');
            const data = await resp.json();

            if (data.ok) {

                const { books } = data;
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

                dispatch(loadBooks(booksWithImage));

            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const loadBooks = (books) => ({
    type: types.loadBooks,
    payload: books
});


export const startAddBook = (book) => {

    return async (dispatch) => {

        try {
            // save book in API
            const formData = new FormData();
            for (const key in book) {
                formData.append(key, book[key]);
            }

            const resp = await fetchApi('library/book', formData, 'POST');
            const data = await resp.json();

            if (data.ok) {
                toast.success(<ToastSuccess text="Book added successfully!" />);
                dispatch(addBook(book));
            } else {
                toast.error(<ToastError text={data.error} />);
            }
        } catch (error) {
            console.log(error);
            toast.error(<ToastError text="An error happened while adding new book" />);
        }
    }

}

const addBook = (book) => ({
    type: types.addBook,
    payload: book
});

export const startRemoveBook = (isbn) => {

    return async (dispatch) => {

        // remove book in API
        try {
            const resp = await fetchApi(`library/remove?isbn=${isbn}`);
            const data = await resp.json();

            if (data.ok) {
                document.getElementById(isbn).classList.add('animate__zoomOut');
                setTimeout(() => {
                    toast.success(<ToastSuccess text="Book removed successfully!" />);
                    dispatch(removeBook(isbn));
                }, 300);
            } else {
                toast.error(<ToastError text={data.error} />);
            }
        } catch (error) {
            console.log(error);
            toast.error(<ToastError text="An error happened while removing a book" />);
        }

    }

}

const removeBook = (isbn) => ({
    type: types.removeBook,
    payload: isbn
});

export const startAddCover = (cover) => {

    return async (dispatch) => {

        try {
            // save book in API
            const formData = new FormData();
            for (const key in cover) {
                formData.append(key, cover[key]);
            }

            const resp = await fetchApi('library/addimage', formData, 'POST');
            const data = await resp.json();

            if (data.ok) {
                toast.success(<ToastSuccess text="Cover added successfully!" />);
                dispatch(startLoadingBooks());
            } else {
                toast.error(<ToastError text={data.error} />);
            }
        } catch (error) {
            console.log(error);
            toast.error(<ToastError text="An error happened while adding new book" />);
        }
    }

}



