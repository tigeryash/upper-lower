import CountUp from "react-countup";
import { Image } from "../lib/types";
import { CSSTransition } from "react-transition-group";

type ImagesProps = {
  clicked: boolean;
  onClickLower: () => void;
  onClickHigher: () => void;
  display: Image[];
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
};

const Images = ({
  clicked,
  onClickHigher,
  onClickLower,
  display,
  isAnimating,
  setIsAnimating,
}: ImagesProps) => {
  const displayButtonOrCount = (idx: number, value: number) => {
    if (idx === 0) {
      return <h3>{value.toLocaleString()}</h3>;
    }
    if (idx == 1) {
      return clicked ? (
        <h3>
          <CountUp end={value} onEnd={() => setIsAnimating(!isAnimating)} />
        </h3>
      ) : (
        <>
          <button onClick={onClickHigher}>Upper</button>
          <button onClick={onClickLower}>Lower</button>
        </>
      );
    }
    if (idx == 2) {
      return (
        <>
          <button onClick={onClickHigher}>Upper</button>
          <button onClick={onClickLower}>Lower</button>
        </>
      );
    }

    return (
      <>
        <button onClick={onClickHigher}>Higher</button>
        <button onClick={onClickLower}>Lower</button>
      </>
    );
  };
  return (
    <main>
      <div className="wrapper">
        {display.map((image, idx) => (
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
                  backgroundImage: `url(${image.download_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "50%",
                  filter: "brightness(50%)",
                  zIndex: -1,
                }}
              ></div>
              <div className="top">
                <h2>Search Item {idx + 1}</h2>
                <p>has</p>
              </div>
              <div className="bottom">
                {displayButtonOrCount(idx, image.value)}
                <p>searches than Search Item 1</p>
              </div>
            </div>
          </CSSTransition>
        ))}
      </div>
    </main>
  );
};

export default Images;
