import { useState, useEffect } from 'react';
import Header from './Header/Header';
import LastList from './LastList/LastList';
import { collection, getDocs } from "firebase/firestore";
import { db } from './../../firebase';

function SearchPage({ user, setDialog }) {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const getUsers = async (user) => {
    let localUser = user;

    if (!user) {
      localUser = JSON.parse(localStorage.getItem('user'));
    } 
    
    (async () => {
        const querySnapshop = await getDocs(collection(db, 'users'));
        const filteredUsers = querySnapshop.docs
            .map(doc => doc.data())
            .filter(doc => (doc.uid !== localUser.uid))

        setUsers(filteredUsers);
        setIsLoading(false);
    })()
  }

  useEffect(() => {

    getUsers(user)
    
  }, [user]); 

  // searchUsers
  
  const searchUsers = async (searchRef) => {

    const searchInput = searchRef.current.value;

    if (searchInput.trim()) {
      let filteredUsers = users.filter(user => user.name.includes(searchInput));
      // if (!filteredUsers.length) {
        // const firstUsersArray = await getUsers(user);
        // console.log(firstUsersArray);
        // filteredUsers = await firstUsersArray.filter(user => user.name.includes(searchInput));
      // }
      setUsers(filteredUsers)
    }
  }

  return (
      <>
        <Header searchUsers={searchUsers} />
        <LastList users={users} isLoading={isLoading} setDialog={setDialog} />
      </>
    );
  }
  
  export default SearchPage;