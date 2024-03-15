const Header = ({ score, highScore }: { score: number; highScore: number }) => {
  return (
    <header>
      <p>High Score: {highScore}</p>
      <p>Score: {score}</p>
    </header>
  );
};

export default Header;
