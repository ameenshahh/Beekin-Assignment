import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import  SignupPage  from "./pages/SignupPage";
import  SigninPage  from "./pages/SigninPage";
import  HomePage  from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
