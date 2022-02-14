import NavBar from "./components/navbar/navbar";
import Home from "./pages/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Settings from "./pages/settings/settings";
import Single from "./pages/single/single";
import Write from "./pages/write/write";
import "./index.css";
//react router dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <NavBar />
      {/* react router dom is updated so we have to use Routes i place of switch and element in place of component*/}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route
          exact
          path="/register"
          element={user ? <Home /> : <Register />}
        />

        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/posts/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
