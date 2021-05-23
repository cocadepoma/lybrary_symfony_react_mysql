import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';

import { startAddCover } from '../../actions/book.actions';
import { uiCloseModal } from '../../actions/ui.actions';

import { ToastError } from '../toasts/ToastError';
import 'react-toastify/dist/ReactToastify.css';

import validator from 'validator';

Modal.setAppElement('#root');


export const BookImageModal = ({ isbn }) => {

    const { modalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({ url: '', book_isbn: isbn });
    const { book_isbn, url } = formValues;


    const handleCloseModal = () => {
        dispatch(uiCloseModal());
        setFormValues({ url: '', book_isbn: '' });
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;

        if (!validator.isURL(url, { allow_protocol_relative_urls: true })) {
            isValid = false;
            document.querySelector(`input[name="url"]`).classList.add('border-red');
        } else {
            document.querySelector(`input[name="url"]`).classList.remove('border-red');
        }

        if (!isValid) {
            return toast.error(
                <ToastError text="Error! You must fill correctly the fields in red" />,
                { position: toast.POSITION.TOP_CENTER }
            );
        }

        dispatch(startAddCover(formValues));
        handleCloseModal();
    }

    return (
        <div id="modal-add-book">
            <Modal
                isOpen={modalOpen}
                onRequestClose={handleCloseModal}

                closeTimeoutMS={300}
                className="modal"
            >
                {modalOpen && <ToastContainer />}

                <h2>Add New Book</h2>

                <form onSubmit={handleSubmit}>

                    <div className="modal__grid-1">
                        <label>ISBN:</label>
                        <input
                            type="text"
                            name="book_isbn"
                            autoComplete="off"
                            value={book_isbn}
                            disabled
                        />
                    </div>

                    <div className="modal__grid-1">
                        <label>Url:</label>
                        <input
                            type="text"
                            name="url"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>

                    <div className="modal__buttons-wrapper">
                        <button className="btn btn-cancel" onClick={handleCloseModal}>close</button>
                        <button className="btn btn-agree">Add</button>
                    </div>

                </form>
            </Modal>
        </div>
    )
}
