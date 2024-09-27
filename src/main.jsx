import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { StrictMode } from 'react';
import ErrorPage from './error-page';
import Contact, { loader as contactLoader, action as contactAction } from './routes/contact';
import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import EditContact, { action as editAction } from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import Index from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    loader: rootLoader,
    errorElement: <ErrorPage />,
    element: <Root />,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,

        children: [
          { index: true, element: <Index /> },

          {
            path: 'contacts/:contactId',
            loader: contactLoader,
            element: <Contact />,
            action: contactAction,
          },
          {
            path: 'contacts/:contactId/edit',
            loader: contactLoader,
            element: <EditContact />,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
