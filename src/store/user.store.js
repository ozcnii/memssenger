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
  loading = false;
  error = false;

  constructor() {
    makeAutoObservable(this);
  }

  checkUser() {
    // На dialogsPage
    // this.setLoading(true);
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

    if (user) {
      this.setLoading(false);
    }

    this.setLoading(false);
  }

  async login(myEmail, myPassword) {
    this.setLoading(true);

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

    if (user) {
      this.setLoading(false);
    }

    this.setUser(user);
    return user;
  }

  async register(myEmail, myPassword, myName) {
    this.setLoading(true);
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

    if (user) {
      this.setLoading(false);
    }

    this.setUser(user);
    return user;
  }

  setLoading(loading) {
    this.loading = loading;
  }

  setError(error) {
    this.error = error;
  }

  setUser(user) {
    this.user = user;
  }
}

export const userStore = new UserStore();
