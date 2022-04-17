import "./App.css";
import "./index.css";
import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingCar from "./pages/BookingCar";
import UserBookings from "./pages/UserBookings";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import AdminHome from "./pages/AdminHome";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <ProtectedRoute
            path="/bookingcar/:carid"
            exact
            element={<BookingCar />}
          />
          <ProtectedRoute
            path="/userbookings"
            exact
            element={<UserBookings />}
          />
          <ProtectedRoute path="/addcar" exact element={<AddCar />} />
          <ProtectedRoute path="/editcar/:carid" exact element={<EditCar />} />
          <ProtectedRoute path="/admin" exact element={<AdminHome />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export function ProtectedRoute(props) {
  if (localStorage.getItem("user")) {
    return <Route {...props} />;
  } else {
    return <Route exact to="/login" />; //can implement Redirect as well
  }
}
export default App;
