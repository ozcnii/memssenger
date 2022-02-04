import LastItem from "./LastItem/LastItem";

function LastList({ users }) {
  return (
    <>
      {users.length !== 0 ? (
        users.map((user) => <LastItem key={user.uid} user={user} />)
      ) : (
        <div className="not-dialogs">Пользователей не найдено</div>
      )}
    </>
  );
}
export default LastList;
