import { Routes, Route } from "react-router-dom";
import {
  Home,
  Explore,
  Auth,
  MyTrips,
  Profile,
  Weather,
  AroundMe,
  MyPlaces,
  ChangePassword,
} from "./pages";

function RootNavigation(props) {
  return (
    <Routes>
      <Route path="*" element={<Home {...props} />} />
      <Route path="/" element={<Home {...props} />} />
      <Route path="/login" element={<Auth {...props} />} />
      <Route path="/signup" element={<Auth {...props} />} />
      <Route path="/weather" element={<Weather {...props} />} />
      <Route path="/mytrips" element={<MyTrips {...props} />} />
      <Route path="/profile" element={<Profile {...props} />} />
      <Route path="/explore" element={<Explore {...props} />} />
      <Route path="/aroundme" element={<AroundMe {...props} />} />
      <Route path="/trips/:id/places" element={<MyPlaces {...props} />} />
      <Route path="/changepassword" element={<ChangePassword {...props} />} />
      <Route path="/trips/share/:id/places" element={<MyPlaces {...props} />} />
    </Routes>
  );
}

export default RootNavigation;
