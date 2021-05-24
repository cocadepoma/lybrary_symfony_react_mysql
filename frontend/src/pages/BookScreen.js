import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { uiOpenModal } from '../actions/ui.actions';

import { BookImageModal } from '../components/book/BookImageModal';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

import { getBookByIsbn } from '../helpers/books.helpers';
import { fetchApi } from '../helpers/fetch';
import { ModalToastify } from '../components/toasts/ModalToastify';
import { updateBook } from '../actions/book.actions';
import { ToastSuccess } from '../components/toasts/ToastSuccess';


const initialState = {
    isbn: '',
    title: '',
    subtitle: '',
    author: '',
    published: '',
    publisher: '',
    pages: '',
    description: '',
    website: '',
    category: '',
    cover: '',
}

export const BookScreen = () => {

    const { isbn } = useParams();
    const { books } = useSelector(state => state.book);
    const { modalOpen } = useSelector(state => state.ui);
    const [bookActive, setBookActive] = useState(initialState);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isbn.length > 0) {
            const book = getBookByIsbn(isbn, books);
            if (book) {
                const { date } = book.published;
                setBookActive({
                    ...book,
                    published: date
                });
            }
        }
    }, [books, isbn]);

    const handleOpenModal = () => {
        dispatch(uiOpenModal());
    }

    const handleImageClick = (id) => {

        const message = `Are you sure about deleting the image`;

        toast.warn(<ModalToastify
            handleDeleteItem={() => handleDeleteImage(id)}
            message={message} />,
            {
                position: toast.POSITION.TOP_CENTER,
                closeOnClick: false,
                autoClose: false,
                toastId: '1'
            });
    }

    const handleDeleteImage = async (id) => {

        if (id) {

            const resp = await fetchApi(`library/removeimage?id=${id}`);
            const data = await resp.json();

            if (data.ok) {
                toast.success(<ToastSuccess text="Image removed successfully!" />);
                let newImages = [];
                newImages = bookActive?.images.filter(image => image.id !== id);

                setBookActive({
                    ...bookActive,
                    images: newImages
                });

                dispatch(updateBook({
                    ...bookActive,
                    images: newImages
                }));
            }
        }
    }


    return (
        <>
            {!modalOpen && <ToastContainer />}
            {modalOpen && <BookImageModal isbn={bookActive.isbn} />}

            {
                bookActive && <div className="container">
                    <h1 className="bookscreen__h1 mb-1">{bookActive.title}</h1>

                    <div className="book__wrapper-go-back">
                        <div className="book__go-back" onClick={() => history.goBack()}>
                            <i className="fas fa-arrow-alt-circle-left"></i>
                            <span>Back</span>
                        </div>
                    </div>

                    <div className="book__books-main-wrapper">

                        <div className="bookscreen__tab-wrapper" onClick={handleOpenModal}>
                            <div className="bookscreen__tab-new-book" >
                                <i className="fas fa-book"></i>
                                <span>Add Image</span>
                            </div>
                        </div>

                        <div className="book__books-wrapper">

                            <div className="book__books-image-wrapper">
                                <img
                                    src={bookActive?.images && bookActive.images.length > 0
                                        ? bookActive.images[0].url
                                        : `${process.env.PUBLIC_URL}/assets/images/default-book.jpg`}
                                    alt="book-img"
                                />
                            </div>

                            <div className="book__books-content-wrapper">
                                <h4>{bookActive.title}</h4>
                                <p>{bookActive.subtitle}</p>
                                <p><span className="bold">ISBN: </span>{bookActive.isbn}</p>
                                <p><span className="bold">Author: </span>{bookActive.author}</p>
                                <p><span className="bold">Published: </span>{moment(bookActive.published).format("Do MMM YYYY")}</p>
                                <p><span className="bold">Publisher: </span>{bookActive.publisher}</p>
                                <p><span className="bold">Pages: </span>{bookActive.pages}</p>
                                <p><span className="bold">Description: </span>{bookActive.description}</p>
                                <p><span className="bold">Website: </span><a href={bookActive.website} target="_blank" rel="noreferrer">Link</a></p>
                                <p><span className="bold">Category: </span>{bookActive.category}</p>
                            </div>
                        </div>

                        <div className="book__books-images-wrapper">
                            <p className="bold">Images: </p>

                            <div className="book__books-grid-images">
                                {
                                    bookActive && bookActive?.images && bookActive.images.length > 0
                                    &&
                                    bookActive.images.map((image, i) => i > 0
                                        &&
                                        <div key={image.id} className="book__thumb-image">
                                            <img
                                                src={image.url}
                                                alt="cover-book"
                                            />
                                            <div className="filter">
                                                <span><i className="fas fa-times" onClick={() => handleImageClick(image.id)}></i></span>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
