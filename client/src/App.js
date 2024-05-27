import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <header className="App-header">
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
        </header>
      </Switch>
    </div>
  );
}

export default App;
