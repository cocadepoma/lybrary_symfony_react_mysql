
import React from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from './routes/AppRouter'
import { store } from './store/store'
import './styles/styles.scss';

export const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}
