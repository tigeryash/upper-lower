import CountUp from "react-countup";
import { useImageStore } from "../stores/imageStore";

type DisplayButtonOrCountProps = {
  idx: number;
  value: number;
};

const DisplayButtonOrCount = ({ idx, value }: DisplayButtonOrCountProps) => {
  const onClickHigher = useImageStore((state) => state.handleClickHigher);
  const onClickLower = useImageStore((state) => state.handleClickLower);
  const clicked = useImageStore((state) => state.clicked);
  const isAnimating = useImageStore((state) => state.isAnimating);

  if (idx === 0) {
    return <h3>{value.toLocaleString()}</h3>;
  }
  if (idx == 1) {
    return clicked ? (
      <h3>
        <CountUp
          end={value}
          onEnd={() => useImageStore.setState({ isAnimating: !isAnimating })}
        />
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

export default DisplayButtonOrCount;
