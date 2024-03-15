import { useEffect, useState } from "react";
import Header from "./components/Header";
import Images from "./components/Images";
import { Image, Tdata } from "./lib/types";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [display, setDisplay] = useState<Image[]>([]);
  const [playing, setPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://picsum.photos/v2/list?page=1&limit=10"
        );
        if (!response.ok) {
          throw new Error("Server Error");
        }
        const data = await response.json();
        const newData: Image[] = data.map((image: Tdata) => {
          return {
            ...image,
            value: Math.floor(Math.random() * 1000) * 10000,
          };
        });
        setImages(newData);

        const randomIndices = getUniqueRandomIndices(3, newData.length);

        const randomImages = randomIndices.map((index) => newData[index]);

        setDisplay(randomImages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  const getUniqueRandomIndices = (count: number, max: number) => {
    const indices = new Set<number>();
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * max));
    }
    return Array.from(indices);
  };

  const handleClickHigher = () => {
    setClicked(true);

    const [first, second] = display;
    if (second.value >= first.value) {
      setTimeout(() => {
        setScore((prev) => prev + 1);
        setClicked(false);
        const randomIndices = getUniqueRandomIndices(1, images.length);
        const randomImages = randomIndices.map((index) => images[index]);
        setDisplay((prev) => [...prev.slice(1), ...randomImages]);
      }, 2800);
    } else {
      setTimeout(() => {
        setClicked(false);
        setPlaying(false);
      }, 2000);
    }
  };

  const handleClickLower = () => {
    setClicked(true);
    const [first, second] = display;
    if (second.value <= first.value) {
      setTimeout(() => {
        setScore((prev) => prev + 1);
        setClicked(false);
        const randomIndices = getUniqueRandomIndices(1, images.length);
        const randomImages = randomIndices.map((index) => images[index]);
        setDisplay((prev) => [...prev.slice(1), ...randomImages]);
      }, 2800);
    } else {
      setTimeout(() => {
        setClicked(false);
        setPlaying(false);
      }, 2000);
    }
  };

  const resetGame = () => {
    setPlaying(true);
    setScore(0);
    const randomIndices = getUniqueRandomIndices(3, images.length);
    const randomImages = randomIndices.map((index) => images[index]);
    setDisplay(randomImages);
  };

  if (!playing)
    return (
      <main className="lost">
        <h1>Game Over Womp Womp</h1>
        <p>Your score: {score}</p>
        <p>Your high score: {highScore}</p>
        <button className="button" onClick={resetGame}>
          Play again
        </button>
      </main>
    );

  if (playing)
    return (
      <div className="app">
        <Header score={score} highScore={highScore} />

        {images.length && (
          <Images
            clicked={clicked}
            display={display}
            onClickLower={handleClickLower}
            onClickHigher={handleClickHigher}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
        )}
      </div>
    );
}

export default App;
