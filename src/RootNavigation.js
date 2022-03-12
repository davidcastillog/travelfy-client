import { Routes, Route } from "react-router-dom";
import {
  Home,
  Explore,
  Auth,
  MyTrips,
  Profile,
  Weather,
  AroundMe,
} from "./pages";

function RootNavigation(props) {
  return (
    <Routes>
      <Route path="/" element={<Home {...props} />} />
      <Route path="/login" element={<Auth {...props} />} />
      <Route path="/signup" element={<Auth {...props} />} />
      <Route path="/explore" element={<Explore {...props} />} />
      <Route path="/aroundme" element={<AroundMe {...props} />} />
      <Route path="/weather" element={<Weather {...props} />} />
      <Route path="/mytrips" element={<MyTrips {...props} />} />
      <Route path="/profile" element={<Profile {...props} />} />
      <Route path="*" element={<Home {...props} />} />
    </Routes>
  );
}

export default RootNavigation;
