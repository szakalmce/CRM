import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./pages/Signup";
import Register from "./pages/Register/Register";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
