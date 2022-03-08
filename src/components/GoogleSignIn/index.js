import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { baseURL } from "../../api/ServerAPI";

const GoogleSignIn = () => {
  const responseSuccessGoogle = (response) => {
    const tokenId = response.tokenId;
    axios({
      method: "POST",
      url: baseURL + "/auth/google",
      data: { tokenId },
    })
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
          buttonText="Login with Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
    </div>
  );
};

export default GoogleSignIn;
