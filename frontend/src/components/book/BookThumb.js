import React from 'react';
import { useHistory } from 'react-router';



export const BookThumb = ({ book, handleStartDeleteBook }) => {

    const history = useHistory();

    const handleBookClick = (isbn) => {
        history.push(`/${isbn}`);
    }

    return (
        <>
            {
                book &&

                <div
                    className="bookthumb__book-main-wrapper animate__animated animate__fadeIn"

                >
                    <div className="bookthumb__book-image-wrapper" onClick={() => handleBookClick(book.isbn)}>

                        <img
                            src={book?.images && book.images.length > 0
                                ? book.images[0].url
                                : `${process.env.PUBLIC_URL}/assets/images/default-book.jpg`}
                            alt="book-img"
                        />

                    </div>

                    <div className="bookthumb__book-content-wrapper" onClick={() => handleBookClick(book.isbn)}>
                        <h4 className="bookthumb__book-title">{book.title}</h4>
                        <p className="bookthumb__book-description">By {book.author}</p>
                    </div>

                    <span className="button__delete-book bookthumb__button" onClick={() => handleStartDeleteBook(book.isbn, book.title)}>
                        <i className="fas fa-minus-circle"></i>
                    </span>
                </div>

            }
        </>
    )
}
