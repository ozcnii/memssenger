import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { chatStore } from "../../store/chat.store";
import Header from "./Header/Header";
import LastList from "./LastList/LastList";
import { motion } from "framer-motion/dist/framer-motion";
import BodyComponent from "../../components/Layout/Body/BodyComponent";

const SearchPage = observer(() => {
  const history = useHistory();

  if (!localStorage.getItem("user") || chatStore.users.length === 0) {
    history.push("/");
  }

  const searchUsers = async (searchRef) => {
    const searchInput = searchRef.current.value;
    chatStore.searchUsers(searchInput);
  };

  return (
    <>
      <Header searchUsers={searchUsers} />
      <BodyComponent>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          // transition={{ easeInOut: 1 }}
        >
          <LastList users={chatStore.searchedUsers} />
        </motion.div>
      </BodyComponent>
    </>
  );
});

export default SearchPage;
