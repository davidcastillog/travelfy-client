import { Routes, Route } from "react-router-dom";
import { Home, Attractions, Auth, Hotels, Restaurants, Weather } from "./pages";

function RootNavigation(props) {
  return (
    <Routes>
      <Route path="/" element={<Home {...props} />} />
      <Route path="/login" element={<Auth {...props} />} />
      <Route path="/signup" element={<Auth {...props} />} />
      <Route path="/attractions" element={<Attractions {...props} />} />
      <Route path="/hotels" element={<Hotels {...props} />} />
      <Route path="/restaurants" element={<Restaurants {...props} />} />
      <Route path="/weather" element={<Weather {...props} />} />
      <Route path="*" element={<Home {...props} />} />
    </Routes>
  );
}

export default RootNavigation;
