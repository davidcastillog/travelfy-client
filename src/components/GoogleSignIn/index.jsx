import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { baseURL } from "../../api/ServerAPI";

const GoogleSignIn = ({status}) => {
  const responseSuccessGoogle = (response) => {
    const tokenId = response.tokenId;

    axios
      .post(`${baseURL}/auth/google`, { tokenId })
      .then((res) => {
        localStorage.setItem("token", tokenId);
      })
      .catch((error) => {
        return error;
      });
  };

  const responseErrorGoogle = (response) => {
    return response;
  };

  return (
    <div className="google-wrapper">
      <GoogleLogin
        clientId="567704572636-rhu0gql7b0mjernmjvr0v3b7ce1oppj4.apps.googleusercontent.com"
        buttonText={<span>{status} with Google</span>}
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};

export default GoogleSignIn;
