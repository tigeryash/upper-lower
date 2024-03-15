import { useImageStore } from "../stores/imageStore";
import ImageComponent from "./ImageComponent";
import { AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

const Images = () => {
  const display = useImageStore((state) => state.display);
  const isAnimating = useImageStore((state) => state.isAnimating);

  return (
    <main>
      <div className="wrapper">
        <AnimatePresence>
          {!isAnimating &&
            display.map((image, idx) => (
              <ImageComponent key={uuidv4()} image={image} idx={idx} />
            ))}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Images;
