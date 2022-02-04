import Dialogs from "./Dialogs/Dialogs";
import Header from "./Header/Header";
import { motion } from "framer-motion/dist/framer-motion";
import BodyComponent from "../../components/Layout/Body/BodyComponent";

export default function DialogsPage() {
  return (
    <>
      <Header />
      <BodyComponent>
        <motion.div
          initial={{ opacity: 0.2, scale: 0.7, y: "-20%" }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          // transition={{ easeInOut: 2 }}
        >
          <Dialogs />
        </motion.div>
      </BodyComponent>
    </>
  );
}
