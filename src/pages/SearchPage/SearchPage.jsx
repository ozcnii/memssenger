import { useState, useEffect } from 'react';
import Header from './Header/Header';
import LastList from './LastList/LastList';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase';

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
        return filteredUsers
    })()
  }

  useEffect(() => {

    getUsers(user)
    
  }, [user]); 
  
  const searchUsers = async (searchRef) => {

    const searchInput = searchRef.current.value;
    const localUser = user;

    if (searchInput.trim()) {
      const filteredUsers = users.filter(user => user.name.includes(searchInput));  

      setUsers(filteredUsers)
    } else {
      getUsers(localUser)
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