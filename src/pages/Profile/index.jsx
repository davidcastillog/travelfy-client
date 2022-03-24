import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserWS } from "../../services/authWs";
import { ProfileCard } from "../../components";
import Grid from "@mui/material/Grid";

const Profile = ({ props }) => {
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            <ProfileCard user={user} />
          </Grid>
        </>
      )}
    </>
  );
};

export default Profile;
