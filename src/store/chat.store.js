import { collection, getDocs } from "firebase/firestore";
import { makeAutoObservable } from "mobx";
import { db } from "../firebase";
import { userStore } from "./user.store";

class ChatStore {
  users = [];
  loading = true;
  error = false;
  dialogs = [];
  activeDialog = null;
  searchedUsers = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getChats() {
    const querySnapshop = await getDocs(collection(db, "users"));
    const filteredUsers = querySnapshop.docs
      .map((doc) => doc.data())
      .filter((doc) => doc.uid !== userStore.user.uid);

    this.serUsers(filteredUsers);
    if (filteredUsers) {
      this.getDialogs();
    }
  }

  async getDialogs() {
    const querySnapshop = await getDocs(collection(db, "dialogs"));
    const allMessages = querySnapshop.docs.map((doc) => doc.data());
    const authUserDialogs = [];

    allMessages.forEach((message) => {
      if (
        message.messages[0] &&
        message.messages[0]?.dialog_id.includes(userStore.user?.uid)
      ) {
        authUserDialogs.push(message.messages);
      }
    });

    this.setDialogs(authUserDialogs);
    if (allMessages) {
      this.setLoading(false);
    }
  }

  searchUsers(name) {
    this.searchedUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  setLoading(loading) {
    this.loading = loading;
  }

  setError(error) {
    this.error = error;
  }

  serUsers(users) {
    this.searchedUsers = users;
    this.users = users;
  }
  setDialogs(dialogs) {
    this.dialogs = dialogs;
  }
}

export const chatStore = new ChatStore();
