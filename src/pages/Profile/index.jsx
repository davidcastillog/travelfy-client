import "./Profile.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserWS } from "../../services/authWs";
import TextField from "@mui/material/TextField";

const Profile = ({ props }) => {
  const [user, setUser] = useState(null);
  const [values, setValues] = useState({
    email: "",
    username: "",
    profilePic: "",
  });

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Validate if user is logged in (JWT)
  const verifyUser = async () => {
    setIsLoading(true);
    const response = await getUserWS();
    if (!response.status) {
      navigate("/login");
    } else {
      setUser(response.data.user);
    }
    setIsLoading(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <form>
            <h1>Profile</h1>
            <TextField
              id="outlined-basic"
              label="email"
              defaultValue={user.email}
              variant="outlined"
              onChange={handleChange}
            />
          </form>
        </>
      )}
    </>
  );
};

export default Profile;
