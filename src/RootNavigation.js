import { Routes, Route } from "react-router-dom";
import { Home, WhereTo, Auth, MyPlaces, MyTrips, Profile } from "./pages";

function RootNavigation(props) {
  return (
    <Routes>
      <Route path="/" element={<Home {...props} />} />
      <Route path="/login" element={<Auth {...props} />} />
      <Route path="/signup" element={<Auth {...props} />} />
      <Route path="/whereto" element={<WhereTo {...props} />} />
      <Route path="/profile" element={<Profile {...props} />} />
      <Route path="/mytrips" element={<MyTrips {...props} />} />
      <Route path="/myplaces" element={<MyPlaces {...props} />} />
      <Route path="*" element={<Home {...props} />} />
    </Routes>
  );
}

export default RootNavigation;
