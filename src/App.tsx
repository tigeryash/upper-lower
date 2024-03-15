import { useEffect } from "react";
import Header from "./components/Header";
import Images from "./components/Images";
import { useImageStore } from "./stores/imageStore";

function App() {
  const score = useImageStore((state) => state.score);
  const highScore = useImageStore((state) => state.highScore);
  const resetGame = useImageStore((state) => state.resetGame);
  const playing = useImageStore((state) => state.playing);
  const images = useImageStore((state) => state.images);
  const fetchImages = useImageStore((state) => state.fetchImages);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    if (score > highScore) {
      useImageStore.setState({ highScore: score });
    }
  }, [score, highScore]);

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
        <Header />

        {images.length && <Images />}
      </div>
    );
}

export default App;
