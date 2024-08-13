import "./App.css";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import ResetPage from "./components/ResetPage";
import Home from "./components/Home";
import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/reset" element={<ResetPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
