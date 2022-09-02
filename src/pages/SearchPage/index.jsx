import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { chatStore } from "../../store/chat";
import Header from "./Header/Header";
import LastList from "./LastList/LastList";
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
        <LastList users={chatStore.searchedUsers} />
      </BodyComponent>
    </>
  );
});

export default SearchPage;
