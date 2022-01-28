import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { chatStore } from "../../store/chat.store";
import Header from "./Header/Header";
import LastList from "./LastList/LastList";

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
      <LastList users={chatStore.searchedUsers} />
    </>
  );
});

export default SearchPage;
