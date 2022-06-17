import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "../redux/store"
import axios from 'axios'


// axios.defaults.baseURL =  "https://justposthis.herokuapp.com/"
axios.defaults.baseURL =  "http://localhost:3001/"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
