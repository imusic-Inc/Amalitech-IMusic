import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import getData from "../api/backendcalls";
import { useNavigate } from "react-router-dom";
import APIController from "../api/spotifyApi";
function Auth(props) {
  const [pathed, setPath] = useState("");
  const [userName, setUserName] = useState("");
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const paths = new URL(window.location.href.replace('#', "?")).searchParams;
    const token = paths.get("access_token");
    const refresh = paths.get("refresh_token");

    if (token && token.length > 10) {
      authenticate(token, refresh);
    } else {
      const cookies_tokens = cookies.get("access_token");
      const refresh_token = cookies.get("refresh_token");
      if (
        cookies_tokens &&
        cookies_tokens.length > 10 &&
        refresh_token &&
        refresh_token.length > 10
      ) {
        authenticate(cookies_tokens, refresh_token);
      }
    }

    if (pathed && pathed.length > 10 && userName && userName.length > 3) {
      if (window.location.href.includes("login")) {
        const index = window.location.href.indexOf('Redirect_URL');
        const rediect_url = window.location.href.substring(index + 13);
        navigate(index > 10 ?rediect_url:"../home", { replace: true });
      } else {
        props.show();
      }
    }
  });

  function authenticate(tokens, refresh) {
    APIController.getUser(tokens).then((valueed) => {
      if (!valueed.error) {
         getData.getAuth('auth/logged', {
        'email': valueed.email,
        'display_name': valueed.name,
        'id': valueed.id,
        'url': valueed.photo,
      }).then(value => {
      cookies.set("access_token", tokens,{sameSite:true});
          cookies.set("refresh_token", refresh,{sameSite:true});
          cookies.set("name", value.name,{sameSite:true});
          cookies.set("email", value.email,{sameSite:true});
          cookies.set("uid", value._id,{sameSite:true});
          cookies.set("photo", value.photo,{sameSite:true});
          cookies.set("setDate", Date.now(),{sameSite:true});
          cookies.set("product", value.product,{sameSite:true});
          setUserName(value.name);
          setPath(tokens);
      });
      } else {
        setPath("");
        cookies.set("name", null,{sameSite:true});
        cookies.set("access_token", null,{sameSite:true});
        cookies.set("refresh_token", null,{sameSite:true});
        cookies.set("email", null,{sameSite:true});
        cookies.set("setDate", null,{sameSite:true});
        cookies.set("uid", null,{sameSite:true});
        cookies.set("jwt", null,{sameSite:true});
        cookies.set("photo", null,{sameSite:true});
        cookies.set("product", null,{sameSite:true});
      }
    });
  }

  return (
    <div className="logIn-alert">
      <div className="login-card p-2 pb-3">
        <div>
          <svg
            className="btn"
            onClick={props.show}
            style={{ width: "24px", height: "24px" }}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
            />
          </svg>
        </div>
        <div className=" flex-row flex-center">
          <div className="flex-1 p-2 auth-image">
            <img
              className="login-image"
              src="https://images.unsplash.com/photo-1661664492724-dd5cec84afa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              width="100%"
            />
          </div>

          <div className="flex-1 ">
            <h1 className="p-1 auth-h1">
              With a premium account, you can listen to full songs.
            </h1>
            <div className="login-btn btn p-1 mb-1">
              <a data-testid="signin" href={`https://accounts.spotify.com/en/authorize?response_type=token&client_id=59b2da7def1346a4bb2be861db81dd39&redirect_uri=https://imusicroom.herokuapp.com/login&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`}>
                <span className="btn-login">
                  {pathed && pathed.length > 10 ? "LOADING..." : "SIGN UP FREE"}
                </span>
              </a>
            </div>
            <h6 className="p-01 pt-3">
              Already have and account?{" "}
          <a
                href={`https://accounts.spotify.com/en/authorize?response_type=token&client_id=59b2da7def1346a4bb2be861db81dd39&redirect_uri=https://imusicroom.herokuapp.com/login&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`}
                className="sign-in pl-1 btn"
              >
                Sign me in
              </a>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Auth;
