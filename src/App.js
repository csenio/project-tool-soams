import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import './App.css';
import ListSite from './components/ListSite';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToastContainer
          className="error"
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <ListSite />
      </div>
    );
  }
}

export default App;
