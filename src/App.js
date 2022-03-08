import { useState } from "react";
import "./App.css";
import RootNavigation from "./RootNavigation";
import { NavBar } from "./components";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  const authenticate = (user) => {
    setUser(user);
  };

  return (
    <div className="App">
      <NavBar />
      <RootNavigation {...{ user, authenticate, handleLogout }} />
    </div>
  );
}

export default App;
