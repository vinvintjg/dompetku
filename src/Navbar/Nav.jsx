import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Profile from "../Profile/Profile.jsx";
import NoPage from "../NoPage/NoPage.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";

export default function Nav() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navbar/>} />
        <Route path="/navbar" element={<Navbar />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NoPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Nav />, document.getElementById('root'));
