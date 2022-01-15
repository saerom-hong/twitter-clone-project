import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../fBase";
import AuthForm from "../components/AuthForm";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Authentication = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      //pop up google login
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      //pop up github login
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(auth, provider);
  };

  return (
    <AuthStyled>
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <SocialButtonStyled>
        <button name="google" onClick={onSocialClick}>
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </SocialButtonStyled>
    </AuthStyled>
  );
};

const AuthStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const SocialButtonStyled = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 320px;

  button {
    cursor: pointer;
    border-radius: 20px;
    border: none;
    padding: 10px 0px;
    margin: 0 5px;
    font-size: 12px;
    text-align: center;
    width: 150px;
    background: white;
  }
`;

export default Authentication;
