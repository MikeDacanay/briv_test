import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PostsProvider } from './context/PostsContext';
import { CommentsProvider } from './context/CommentsContext';
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(
  <AuthProvider>
    <PostsProvider>
      <CommentsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CommentsProvider>
    </PostsProvider>
  </AuthProvider>,
  document.getElementById('root')
);
