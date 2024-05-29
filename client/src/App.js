import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import "./App.css";
import { useEffect } from "react";
import CONSTANTS from "./constants";
import { useDispatch } from "react-redux";
import { refresh } from "./redux/slices/authSlice";
import RegistrationPage from "./pages/Registration";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const refreshTokenFromLS = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if(refreshTokenFromLS) {
      dispatch(refresh(refreshTokenFromLS))
    }
  }, [])


  return (
    <div>
      <Switch>
        <header>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />
        </header>
      </Switch>
    </div>
  );
}

export default App;
