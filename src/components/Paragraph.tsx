import { useImageStore } from "../stores/imageStore";
import { motion } from "framer-motion";

const Paragraph = ({ idx }: { idx: number }) => {
  const clicked = useImageStore((state) => state.clicked);
  if (idx === 0) {
    return <p>average montly searches</p>;
  }
  if (idx == 1) {
    if (clicked) {
      return (
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          average montly searches{" "}
        </motion.p>
      );
    }
    return <p>searches than Search Item 1</p>;
  }
  if (idx == 2) {
    return <p>searches than Search Item 1</p>;
  }
};

export default Paragraph;
