import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  // Retrieve isLoggedIn from localStorage and parse it
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  // Check if isLoggedIn is truthy and has a token property
  const auth = isLoggedIn

  return auth === true ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
