import "./about.css";
import ryan from "./Images/Ryan.png";
import mark from "./Images/Mark.png";
import jerry from "./Images/Jerry.png";
import paul from "./Images/Paul.png";
import ryan_snack from "./Images/RyanSnack.png";
import mark_snack from "./Images/MarkSnack.png";
import jerry_snack from "./Images/JerrySnack.png";
import paul_snack from "./Images/PaulSnack.png";
export default function About() {
  return (
    <div className="page-wrap">
      <div style={{ height: "100px" }}></div>
      <div className="grid">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={ryan} alt="Ryan Curry" />
              <p className="title">RYAN CURRY</p>
              <p>
                full-stack engineer
                <br />
                by day
              </p>
            </div>
            <div className="flip-card-back">
              <img
                className="border-circle"
                src={ryan_snack}
                alt="Ryan Curry"
              />
              <p className="title">RYAN CURRY</p>
              <p>
                full-snack engineer <br /> by night
              </p>
              <a className="weblink" href="https://gitlab.com/ryancur">
                gitlab
              </a>
              <a
                className="weblink"
                href="https://www.linkedin.com/in/curry-ryan/"
              >
                linkedin
              </a>
            </div>
          </div>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={mark} alt="Mark Sue-Wah-Sing" />
              <p className="title">MARK SUE-WAH-SING</p>
              <p>
                full-stack engineer
                <br />
                by day
              </p>
            </div>
            <div className="flip-card-back">
              <img
                className="border-circle"
                src={mark_snack}
                alt="Mark Sue-Wah-Sing"
              />
              <p className="title">MARK SUE-WAH-SING</p>
              <p>
                full-snack engineer <br /> by night
              </p>
              <a className="weblink" href="https://gitlab.com/Msuewahsing">
                gitlab
              </a>
              <a
                className="weblink"
                href="https://www.linkedin.com/in/msuewahsing/"
              >
                linkedin
              </a>
            </div>
          </div>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={paul} alt="Paul Pham" />
              <p className="title">PAUL PHAM</p>
              <p>
                full-stack engineer
                <br />
                by day
              </p>
            </div>
            <div className="flip-card-back">
              <img className="border-circle" src={paul_snack} alt="Paul Pham" />
              <p className="title">PAUL PHAM</p>
              <p>
                full-snack engineer <br /> by night
              </p>
              <a className="weblink" href="https://gitlab.com/phamlepaul">
                gitlab
              </a>
              <a
                className="weblink"
                href="https://www.linkedin.com/in/paulphamcs"
              >
                linkedin
              </a>
            </div>
          </div>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={jerry} alt="Jerry Lue" />
              <p className="title">JERRY LUE</p>
              <p>
                full-stack engineer
                <br />
                by day
              </p>
            </div>
            <div className="flip-card-back">
              <img
                className="border-circle"
                src={jerry_snack}
                alt="Jerry Lue"
              />
              <p className="title">JERRY LUE</p>
              <p>
                full-snack engineer <br /> by night
              </p>
              <a className="weblink" href="https://gitlab.com/JerryLue">
                gitlab
              </a>
              <a
                className="weblink"
                href="https://www.linkedin.com/in/jerry-lue/"
              >
                linkedin
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
