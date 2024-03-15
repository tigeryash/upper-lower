import CountUp from "react-countup";
import { Image } from "../lib/types";
import { CSSTransition } from "react-transition-group";

type ImagesProps = {
  clicked: boolean;
  onClickLower: () => void;
  onClickHigher: () => void;
  display: Image[];
  isAnimating: boolean;
  setIsAnimating: (prev: boolean) => void;
};

const Images = ({
  clicked,
  onClickHigher,
  onClickLower,
  display,
  isAnimating,
  setIsAnimating,
}: ImagesProps) => {
  return (
    <main>
      <CSSTransition in={isAnimating} timeout={600} classNames="carousel">
        <div className="container">
          <div
            style={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${display[0].download_url})`,
              backgroundSize: "cover",
              backgroundPosition: "50%",
              filter: "brightness(50%)",
              zIndex: -1,
            }}
          ></div>
          <div className="top">
            <h2>Search Item 1</h2>
            <p>has</p>
          </div>
          <div className="bottom">
            <h3>{display[0].value.toLocaleString()}</h3>
            <p>average monthly searches</p>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition in={isAnimating} timeout={600} classNames="carousel">
        <div className="container">
          <div
            style={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${display[1].download_url})`,
              backgroundSize: "cover",
              backgroundPosition: "50%",
              filter: "brightness(50%)",
              zIndex: -1,
            }}
          ></div>
          <div className="top">
            <h2>Search Item 2</h2>
            <p>has</p>
          </div>
          <div className="bottom">
            {clicked ? (
              <h3>
                <CountUp
                  end={display[1].value}
                  onEnd={() => setIsAnimating(!isAnimating)}
                />
              </h3>
            ) : (
              <>
                <button onClick={onClickHigher}>Upper</button>
                <button onClick={onClickLower}>Lower</button>
              </>
            )}
            <p>searches than Search Item 1</p>
          </div>
        </div>
      </CSSTransition>
      <div className="outside">
        <CSSTransition in={isAnimating} timeout={600} classNames="carousel">
          <div className="container">
            <div
              style={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${display[2].download_url})`,
                backgroundSize: "cover",
                backgroundPosition: "50%",
                filter: "brightness(50%)",
                zIndex: -1,
              }}
            ></div>
            <div className="top">
              <h2>Search Item 3</h2>
              <p>has</p>
            </div>
            <div className="bottom">
              <>
                <button onClick={onClickHigher}>Upper</button>
                <button onClick={onClickLower}>Lower</button>
              </>
              <p>average monthly searches</p>
            </div>
          </div>
        </CSSTransition>
      </div>
    </main>
  );
};

export default Images;
