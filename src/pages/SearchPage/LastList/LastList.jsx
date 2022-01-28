import BodyComponent from "../../../components/Layout/Body/BodyComponent";
import LastItem from "./LastItem/LastItem";

function LastList({ users }) {
  return (
    <BodyComponent>
      {users.length !== 0 ? (
        users.map((user) => <LastItem key={user.uid} user={user} />)
      ) : (
        <div className="not-dialogs">Пользователей не найдено</div>
      )}
    </BodyComponent>
  );
}
export default LastList;
