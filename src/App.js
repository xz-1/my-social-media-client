import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
//https://youtu.be/K8YELRmUb5o?t=6752 : the reason to use jsconfig.json
//normally import HomePage from "./scenes/homePage";
//to just: note the './' is omitted because in the 'jsconfig.json' is set at 'src' folder
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
//conguration for our theme: continue from Fourth commit: import
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";


function App() {

  //conguration for our theme: continue from Fourth commit: start
  //grasping the value in the initial state in state/index.js' initialState line
  //Note: whenver that I want to grasp the information for the store (Redux)
  //I can just use 'useSelector' that is imported from:
  //import { useSelector } from "react-redux";
  //https://youtu.be/K8YELRmUb5o?t=8250
  const mode = useSelector((state) => state.mode);

  //Setting up the theme:
  //https://youtu.be/K8YELRmUb5o?t=8283  ::?
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  /*
  Note: this is a comment for the resutt <div> below
  I wrote it because the systax does not allow me to use <!-- -->
  as the HTML comment line in the "return" statement
  <!--
        This is where I actually passing the theme into MUI
        using <ThemeProvider> tag, I should have my theme configured
        and the <CssBaseline> is not really revelent to the theme
        but it gonna reset my css to the basic CSS
        https://youtu.be/K8YELRmUb5o?t=8314
  -->
  */

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/profile/:userId" element={<ProfilePage />}></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
