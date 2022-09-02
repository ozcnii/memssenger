import Header from "./Header/Header";
import SettingsContainer from "./SettingsContainer/SettingsContainer";
import { motion } from "framer-motion/dist/framer-motion";
import BodyComponent from "../../components/Layout/Body/BodyComponent";

export default function SettingsPage() {
  return (
    <>
      <Header />
      <BodyComponent>
        <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }}>
          <SettingsContainer />
        </motion.div>
      </BodyComponent>
    </>
  );
}
