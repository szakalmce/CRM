import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import Register from './pages/Register/Register';
import SignUp from './pages/Signup/Signup';
import 'react-toastify/dist/ReactToastify.css';
import { ProtectedRoutes } from './components/routes/ProtectedRoutes';

import { useSelector } from 'react-redux';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import AddNewAccount from './pages/AddNewAccount/AddNewAccount';
import Home from './pages/Home/Home';
import SingleAccount from './pages/SingleAccount/SingleAccount';
import EditModal from './components/EditModal/EditModal';
import { useState } from 'react';

const App = () => {
  // current logged user
  const userStatus = useSelector((state) => state.user.userLogged);

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home user={userStatus} />} />
        <Route element={<ProtectedRoutes isLogged={userStatus} />}>
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoutes isLogged={!userStatus} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/accounts/new-account" element={<AddNewAccount />} />
          <Route
            exact
            path="/dashboard"
            element={<Dashboard setOpenModal={setOpenModal} />}
          />
          <Route exact path="/accounts/:id" element={<SingleAccount />} />
        </Route>
      </Routes>
      <ToastContainer />
      {openModal ? <EditModal setOpenModal={setOpenModal} /> : null}
    </div>
  );
};

export default App;
