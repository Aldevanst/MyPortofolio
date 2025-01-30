import { createBrowserRouter } from 'react-router-dom';
import { Profile, Login, Register } from '../pages';

const router = createBrowserRouter([
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);

export { router };