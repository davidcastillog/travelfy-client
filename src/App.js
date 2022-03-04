import { useState } from "react";
import "./App.css";
import { Navbar } from "./components";
import RootNavigation from "./RootNavigation";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleLogout = () => {
    setUser(null);
  };

  const authenticate = (user) => {
    setUser(user);
  };

  return (
    <div className="App">
      <Navbar />
      <RootNavigation {...{ user, authenticate, handleLogout }} />
    </div>
  );
}

export default App;
