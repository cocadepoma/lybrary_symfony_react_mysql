import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import { ToastError } from '../toasts/ToastError';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import { uiCloseModal } from '../../actions/ui.actions';
import { startAddBook } from '../../actions/book.actions';

import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const initialState = {
    isbn: '',
    title: '',
    subtitle: '',
    author: '',
    publisher: '',
    pages: '',
    description: '',
    website: '',
    category: '',
}

export const BookModal = () => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui);

    const [formValues, setFormValues] = useState(initialState);
    const [published, setPublished] = useState(new Date());

    const handleCloseModal = () => {
        dispatch(uiCloseModal());
        setFormValues(initialState);
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

        for (const key in formValues) {

            if (formValues[key].trim().length < 1) {
                isValid = false;
                document.querySelector(`input[name="${key}"]`).classList.add('border-red');
            } else {
                if (key === 'pages') {
                    if (isNaN(formValues[key]) || typeof parseInt(formValues[key]) !== 'number') {
                        isValid = false;
                    }
                }
                document.querySelector(`input[name="${key}"]`).classList.remove('border-red');
            }
        }

        if (!isValid) {
            return toast.error(
                <ToastError text="Error! You must fill correctly the fields in red" />,
                { position: toast.POSITION.TOP_CENTER }
            );
        }

        dispatch(startAddBook({ ...formValues, published: moment(published) }));
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
                            name="isbn"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="modal__grid-1">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="modal__grid-1">
                        <label>Subtitle:</label>
                        <input
                            type="text"
                            name="subtitle"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="modal__grid-1">
                        <label>Author:</label>
                        <input
                            type="text"
                            name="author"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="modal__grid-1">
                        <label>Published:</label>
                        <DatePicker
                            selected={published}
                            onChange={date => setPublished(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            dateFormat="dd/MM/yyyy hh:mm aa"
                            timeIntervals={15}
                        />
                    </div>
                    <div className="modal__grid-1">
                        <label>Publisher:</label>
                        <input
                            type="text"
                            name="publisher"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="modal__grid-1">
                        <label>Pages:</label>
                        <input
                            type="number"
                            name="pages"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="modal__grid-1">
                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="modal__grid-1">
                        <label>Website:</label>
                        <input
                            type="text"
                            name="website"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="modal__grid-1">
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
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
