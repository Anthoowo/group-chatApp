import { useState, useRef } from "react";
import { collection, addDoc, Firestore, serverTimestamp } from "firebase/firestore"; 
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query, orderBy, limit } from "firebase/firestore";  
import ChatMessage from './ChatMessage';
import SignOut from "./SignOut";


const ChatRoom = (props) =>{
const auth = props.auth;
const db = props.db;
const dummy = useRef();
const [formValue, setFormValue] = useState("");
const user = auth.currentUser;
const messagesRef = collection(db, 'messages');
const que = query(messagesRef, orderBy("timeStamp"), limit(1000));
const [messages] = useCollection(que, {idField: 'id'});






const sendMessage = async (e) =>{
    e.preventDefault();
    const {uid, photoURL} = user;
    
    // Add a new document with a generated id.
  await  addDoc(messagesRef, {
    text: formValue,
    timeStamp: serverTimestamp(),
    uid,
    photoURL
   }); 
dummy.current.scrollIntoView({behavior: 'smooth'})
   setFormValue('');

}







    return(
               <div style={{background: 'rgb(16, 16, 18)'}}>     
                  <SignOut auth={auth} />
                  <div className="App-section">
                    
            {messages && messages.docs.map((msg)=>(<ChatMessage auth={auth} key= {msg.id } message = {msg}/>))}
            <div ref = {dummy}></div>
            
      <form onSubmit={sendMessage}>
          <input type="text" placeholder="send a message" value = {formValue} onChange={(e)=>{setFormValue(e.target.value)}}/>
          
         <button  type="submit" className="btn btn-lg"><i className="fa-regular fa-paper-plane"></i></button>
 
      </form>
      <footer ></footer>
      </div>

        </div> 
    ) 
}

export default ChatRoom;