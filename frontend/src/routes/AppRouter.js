import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom";
import { startLoadingBooks } from "../actions/book.actions";
import { BooksScreen } from "../pages/BooksScreen";
import { BookScreen } from "../pages/BookScreen";

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoadingBooks());
    }, [dispatch]);

    return (
        <Router basename='/' >
            <div className="root-child">
                <Switch>

                    <Route exact path="/" component={BooksScreen} />
                    <Route exact path="/:isbn" component={BookScreen} />
                    <Route path="*" component={BooksScreen} />

                </Switch>
            </div>
            <footer>
                <a
                    href="https://francisco-rodriguez.site/"
                    target="_blank"
                    rel="noreferrer">Francisco Rodríguez 2021 &copy;
                    </a>
            </footer>
        </Router>
    )
}
