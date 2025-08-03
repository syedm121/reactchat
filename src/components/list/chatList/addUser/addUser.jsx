import "./addUser.css";
import { db } from "../../../../lib/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);

  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
  
    try {
      // Step 1: Get current user's chats
      const currentUserChatsDoc = await getDoc(doc(userChatsRef, currentUser.id));
  
      if (currentUserChatsDoc.exists()) {
        const currentUserChats = currentUserChatsDoc.data().chats || [];
  
        // Step 2: Check if a chat already exists with the target user
        const chatExists = currentUserChats.some(
          (chat) => chat.receiverId === user.id
        );
  
        if (chatExists) {
          alert("Chat already exists with this user!");
          return;
        }
      }
  
      // Step 3: Proceed to create a new chat
      const newChatRef = doc(chatRef);
  
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
  
      const userChatData = {
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: currentUser.id,
        updatedAt: Date.now(),
      };
  
      const currentUserChatData = {
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: user.id,
        updatedAt: Date.now(),
      };
  
      await setDoc(
        doc(userChatsRef, user.id),
        {
          chats: arrayUnion(userChatData),
        },
        { merge: true }
      );
  
      await setDoc(
        doc(userChatsRef, currentUser.id),
        {
          chats: arrayUnion(currentUserChatData),
        },
        { merge: true }
      );
      setUser(null)
      e.target.reset();
    } catch (err) {
      setUser(null)
      e.target.reset();
      console.log("Error adding chat:", err);
      alert("Something went wrong while creating the chat.");
     
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
