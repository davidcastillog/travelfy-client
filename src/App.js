import "./App.css";
import { useState, useEffect } from "react";
import RootNavigation from "./RootNavigation";
import { NavBar } from "./components";
import { getUserWS } from "./services/authWs";

function App() {
  const [user, setUser] = useState(null);

  const verifyUser = async () => {
    const response = await getUserWS();
    if (response) {
      setUser(response.data.user);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const authenticate = async (user) => {
    setUser(user);
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <div className="App">
      <NavBar {...{ user, authenticate, handleLogout }} />
      <RootNavigation {...{ user, authenticate, handleLogout }} />
    </div>
  );
}

export default App;
