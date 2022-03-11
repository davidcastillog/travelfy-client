import { GoogleLogout } from "react-google-login";

const GoogleLOut = () => {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <GoogleLogout
      clientId="567704572636-rhu0gql7b0mjernmjvr0v3b7ce1oppj4.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
      onFailure={logout}
    ></GoogleLogout>
  );
};

export default GoogleLOut;
