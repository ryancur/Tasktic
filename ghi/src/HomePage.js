import logo from "./logo.png";
import { showModal, LOG_IN_MODAL, SIGN_UP_MODAL } from "./app/accountSlice";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { useGetTokenQuery } from "./app/authApi";

export default function Homepage() {
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

  function LoginButtons() {
    const dispatch = useDispatch();
    return (
      <div>
        <Button
          style={{
            backgroundColor: "#00a9b4",
            color: "white",
            marginRight: "15px",
          }}
          onClick={() => dispatch(showModal(SIGN_UP_MODAL))}
        >
          Sign up
        </Button>
        <Button
          outline
          color="secondary"
          onClick={() => dispatch(showModal(LOG_IN_MODAL))}
        >
          Log in
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="homepagemain">Boss Every Day</h1>
      <div>
        <p className="homepagemain">
          Maximize your productivity by using a task manager <br />
          that doubles as a calendar, <br />
          allowing you to spend more time executing tasks <br />
          and less time on planning
        </p>
      </div>
      <div>
        <div className="homepagemain">
          {tokenLoading ? (
            <LoginButtons show={false} />
          ) : token ? null : (
            <LoginButtons show={true} />
          )}
        </div>
        <div>
          <img
            className="spaceimage"
            src={logo}
            alt="main page img"
            width="1000"
            height="550"
          />
        </div>
      </div>
    </div>
  );
}
