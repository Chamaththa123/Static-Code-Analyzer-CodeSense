import { Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import UploadCode from "./pages/UploadCode";
import Start from "./pages/Start";
import Review from "./pages/Review/Review";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Upload" element={<UploadCode/>} />
        <Route path="/RateUs" element={<Review/>} />
        <Route path="/dashboard" element={<PrivateRoute />}>

        </Route>
        <Route path="/ForgotPassword" element={<ForgotPasssword/>} />
        <Route path="/dashboard" element={<AdminRoute />}>

        </Route>






    

      </Routes>
    </>
  );
}

export default App;