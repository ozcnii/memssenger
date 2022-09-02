import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { makeAutoObservable } from "mobx";
import { auth, db } from "../firebase";

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getMe(uid) {
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      this.setUser(doc.data());
    });
  }

  async editUserName(name) {
    let userId = null;

    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "==", this.user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });

    const nameRef = doc(db, "users", userId);
    await updateDoc(nameRef, {
      name,
    });

    const user = { ...this.user, name };

    this.setUser(user);

    return user;
  }

  async editUserAvatar(avatarUrl) {
    let docID = "";

    const q = query(collection(db, "users"), where("uid", "==", this.user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docID = doc.id;
    });

    const avatarRef = doc(db, "users", docID);

    updateDoc(avatarRef, {
      avatar: avatarUrl,
    });

    const user = { ...this.user, avatar: avatarUrl };
    this.setUser(user);
  }

  async login(myEmail, myPassword) {
    const responseFromAuth = await signInWithEmailAndPassword(
      auth,
      myEmail,
      myPassword
    );

    let myName = null;
    let myAvatar = null;
    const userId = responseFromAuth.user.uid;

    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", myEmail));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      myName = doc.data().name;
      myAvatar = doc.data().avatar;
    });

    const user = {
      email: myEmail,
      uid: userId,
      name: myName,
      avatar: myAvatar,
    };

    return user;
  }

  async register(myEmail, myPassword, myName) {
    const responseFromAuth = await createUserWithEmailAndPassword(
      auth,
      myEmail,
      myPassword
    );

    const userId = responseFromAuth.user.uid;

    await addDoc(collection(db, "users"), {
      email: myEmail,
      uid: userId,
      name: myName,
    });

    const user = {
      email: myEmail,
      uid: userId,
      name: myName,
    };

    return user;
  }

  setUser(user) {
    this.user = user;
  }
}

export const userStore = new UserStore();
