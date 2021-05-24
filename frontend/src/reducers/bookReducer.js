import { types } from "../types/types";


const initialState = {
    books: [],
}

export const bookReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.loadBooks:
            return {
                ...state,
                books: [...action.payload]
            }

        case types.addBook:
            return {
                ...state,
                books: [action.payload, ...state.books]
            }

        case types.removeBook:
            return {
                books: state.books.filter(book => book.isbn !== action.payload),
            }

        case types.updateBook:
            return {
                books: state.books.map(book => book.id === action.payload.id ? action.payload : book),
            }

        default:
            return state;
    }
}