import { useImageStore } from "../stores/imageStore";

const Header = () => {
  const score = useImageStore((state) => state.score);
  const highScore = useImageStore((state) => state.highScore);

  return (
    <header>
      <p>High Score: {highScore}</p>
      <p>Score: {score}</p>
    </header>
  );
};

export default Header;
