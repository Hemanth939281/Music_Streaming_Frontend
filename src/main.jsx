import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import store from './redux/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/login.jsx';
import Signup from './components/Signup.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import UploadSongForm from './components/UploadSongForm.jsx';
import SongList from './components/SongList.jsx';
import Home from './components/home.jsx';

const router = createBrowserRouter([{
  path: '/',
  element: <App/>,
  children: [
    { path: '/',element: <Home />},
    { path: 'login', element: <Login /> },
    { path: 'signup', element: <Signup /> },
    { path: 'songs', element: <ProtectedRoute><SongList /></ProtectedRoute>},
    {path: '/songupload', element: <ProtectedRoute><UploadSongForm/></ProtectedRoute>}
  ]
}])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
    <App />
    </RouterProvider>
    </Provider>
  </StrictMode>,
)
