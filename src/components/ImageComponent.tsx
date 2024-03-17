import { useImageStore } from "../stores/imageStore";
import Background from "./Background";
import ImageTitle from "./ImageTitle";
import DisplayButtonOrCount from "./DisplayButtonOrCount";
import { Image } from "../lib/types";
import { motion } from "framer-motion";
import Paragraph from "./Paragraph";

type ImageComponentProps = {
  image: Image;
  idx: number;
};

const ImageComponent = ({ image, idx }: ImageComponentProps) => {
  const isAnimating = useImageStore((state) => state.isAnimating);
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: 0 }}
      exit={
        isAnimating ? (isMobile ? { y: "-100%" } : { x: "-100%" }) : { x: 0 }
      }
      transition={{ duration: 0.75 }}
      onAnimationComplete={() => {
        useImageStore.setState({ isAnimating: false });
      }}
      className={`container `}
    >
      <Background src={image.download_url} />
      <div className="top">
        <ImageTitle title={idx + 1} />
        <p>has</p>
      </div>
      <div className="bottom">
        <DisplayButtonOrCount idx={idx} value={image.value} />
        <Paragraph idx={idx} />
      </div>
    </motion.div>
  );
};

export default ImageComponent;
