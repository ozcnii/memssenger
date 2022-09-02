import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { makeAutoObservable } from "mobx";
import { db } from "../firebase";
import { userStore } from "./user";

class DialogStore {
  activeDialog = null;
  messages = [];
  dialogId = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async sendMessage(message) {
    const dialogRef = doc(db, "dialogs", this.dialogId);
    const docSnap = await getDoc(dialogRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      await updateDoc(dialogRef, {
        messages: [...docData.messages, message],
      });
    } else {
      await setDoc(doc(db, "dialogs", this.dialogId), {
        messages: [message],
      });
    }
  }

  createDialogId() {
    const user = userStore.user;
    if (!this.activeDialog || !user) return;

    let myDialogId = null;

    if (this.activeDialog.uid > user.uid) {
      myDialogId = this.activeDialog.uid + user.uid;
    } else {
      myDialogId = user.uid + this.activeDialog.uid;
    }

    this.setDialogId(myDialogId);
    this.setLoading(false);
  }

  setActiveDialog(dialog) {
    this.activeDialog = dialog;
  }

  setMessages(messages) {
    this.messages = messages;
  }

  setDialogId(dialogId) {
    this.dialogId = dialogId;
  }

  setLoading(loading) {
    this.loading = loading;
  }

  setAll() {
    this.dialogId = null;
    this.activeDialog = null;
    this.messages = [];
  }
}

export const dialogStore = new DialogStore();
