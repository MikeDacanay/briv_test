import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PostsProvider } from './context/PostsContext';
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(
  <AuthProvider>
    <PostsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostsProvider>
  </AuthProvider>,
  document.getElementById('root')
);
