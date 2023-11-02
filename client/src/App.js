import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddTraffic from "./pages/Traffic/AddTraffic";
import AllTraffic from "./pages/Traffic/AllTraffic";
import UpdateTraffic from "./pages/Traffic/UpdateTraffic";



function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Login/>} />
        <Route path="/AddTraffic" element={<AddTraffic/>} />
        <Route path='/Traffic/:id' element={<UpdateTraffic/>}></Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<HomePage />} />
        </Route>
        <Route path="/ForgotPassword" element={<ForgotPasssword/>} />
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="AllTraffic" element={<AllTraffic />} />
        </Route>






    

      </Routes>
    </>
  );
}

export default App;