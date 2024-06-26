import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Navbar from "../src/Navbar/Navbar.jsx";
import Profile from "../src/Profile/Profile.jsx";
import Wallets from "../src/Wallets/Wallets.jsx";
import Dashboard from "../src/Dashboard/Dashboard.jsx";
import Login from "../src/Auth/Login.jsx";
import Register from "../src/Auth/Register.jsx";
import NoPage from "../src/NoPage/NoPage.jsx"
import PrivateRoutes from "./PrivateRoutes.js"
export default function Nav() {
  return (
    <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/navbar" element={<Navbar />}/>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/slot/:id" element={<Wallets />} />
            </Route>
            <Route index element={<Register/>}   />
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="*" element={<NoPage />}/>
          </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Nav />, document.getElementById('root'));
