import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
//https://youtu.be/K8YELRmUb5o?t=6752 : the reason to use jsconfig.json
//normally import HomePage from "./scenes/homePage";
//to just: note the './' is omitted because in the 'jsconfig.json' is set at 'src' folder
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";


function App() {


  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/profile/:userId" element={<ProfilePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
