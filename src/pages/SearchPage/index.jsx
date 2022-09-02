import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { chatStore } from "../../store/chat";
import Header from "./Header/Header";
import LastList from "./LastList/LastList";
import BodyComponent from "../../components/Layout/Body/BodyComponent";
import { userStore } from "../../store/user";
import { useCallback } from "react";

const SearchPage = observer(() => {
  const history = useHistory();

  if (!userStore.user || chatStore.users.length === 0) {
    history.push("/");
  }

  const searchUsers = useCallback(async (searchRef) => {
    const searchInput = searchRef.current.value;
    chatStore.searchUsers(searchInput);
  }, []);

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
