import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { BookThumb } from '../components/book/BookThumb'
import { ModalToastify } from '../components/toasts/ModalToastify';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { startLoadingBooks, startRemoveBook } from '../actions/book.actions';
import { uiOpenModal } from '../actions/ui.actions';
import { BookModal } from '../components/book/BookModal';
import { fetchApi } from '../helpers/fetch';
import { ToastSuccess } from '../components/toasts/ToastSuccess';

export const BooksScreen = () => {

    const { books } = useSelector(state => state.book);
    const { modalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const [activeBooks, setActiveBooks] = useState([]);

    useEffect(() => {
        if (books && books.length > 0) {
            setActiveBooks([...books]);
        }
    }, [books]);

    const handleAddBook = () => {
        dispatch(uiOpenModal());
    }

    const handleStartDeleteBook = (isbn, title) => {

        const message = `Are you sure about deleting book`;

        toast.warn(<ModalToastify
            handleDeleteItem={() => handleDeleteBook(isbn)}
            title={title}
            message={message} />,
            {
                position: toast.POSITION.TOP_CENTER,
                closeOnClick: false,
                autoClose: false,
                toastId: '1'
            });
    }

    const handleDeleteBook = (isbn) => {
        dispatch(startRemoveBook(isbn))
    }

    const handleAddFromJson = async () => {
        const resp = await fetchApi(`library/addfromjson`, undefined, 'POST');
        const data = await resp.json();

        if (data.ok) {
            toast.success(<ToastSuccess text="Books added from JSON successfully!" />);
            dispatch(startLoadingBooks());
        }
    }

    const handle2013Books = async () => {
        const resp = await fetchApi('library/2013');
        const data = await resp.json();

        if (data.ok) {
            setActiveBooks([...data.data]);
        }
    }

    const handleDramaBooks = async () => {
        const resp = await fetchApi('library/drama');
        const data = await resp.json();

        if (data.ok) {
            setActiveBooks([...data.data]);
        }
    }

    const handleResetBooks = () => {
        if (books && books.length > 0) {
            setActiveBooks([...books]);
        }
    }

    return (
        <div className="container">
            <h1 className="bookscreen__h1">My Library</h1>
            <div className="bookscreen__books-main-wrapper">
                {
                    activeBooks && activeBooks.length > 0
                    &&
                    activeBooks.map(book =>
                        <div key={book.isbn} id={book.isbn} className="animate__animated">
                            <BookThumb book={book} handleStartDeleteBook={handleStartDeleteBook} />
                        </div>
                    )
                }

                <div className="bookscreen__tab-wrapper">
                    <div className="bookscreen__tab-new-book" onClick={handleAddBook}>
                        <i className="fas fa-book"></i>
                        <span>Add Book</span>
                    </div>
                </div>

                <div className="bookscreen__tab-wrapper tab-2">
                    <div className="bookscreen__tab-new-book" onClick={handleAddFromJson}>
                        <i className="fas fa-book"></i>
                        <span>Add JSON</span>
                    </div>
                </div>

                <div className="bookscreen__tab-wrapper tab-3">
                    <div className="bookscreen__tab-new-book" onClick={handle2013Books}>
                        <i className="fas fa-book"></i>
                        <span>{'<2013'}</span>
                    </div>
                </div>

                <div className="bookscreen__tab-wrapper tab-4">
                    <div className="bookscreen__tab-new-book" onClick={handleDramaBooks}>
                        <i className="fas fa-book"></i>
                        <span>Drama</span>
                    </div>
                </div>

                <div className="bookscreen__tab-wrapper tab-5">
                    <div className="bookscreen__tab-new-book" onClick={handleResetBooks}>
                        <i className="fas fa-book"></i>
                        <span>Reset</span>
                    </div>
                </div>

            </div>

            {!modalOpen && <ToastContainer />}

            {modalOpen && <BookModal />}
        </div>
    )
}
