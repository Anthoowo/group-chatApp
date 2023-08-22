import { useState, useRef } from "react";
import { collection, addDoc, Firestore, serverTimestamp } from "firebase/firestore"; 
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query, orderBy, limit } from "firebase/firestore";  
import ChatMessage from './ChatMessage';
import SignOut from "./SignOut";

const ChatRoom = ({auth, db}) =>{
const dummy = useRef();
const [formValue, setFormValue] = useState("");
const user = auth.currentUser;
const messagesRef = collection(db, 'messages');
const que = query(messagesRef, orderBy("timeStamp"), limit(1000));
const [messages] = useCollection(que, {idField: 'id'});


// if (theUser) {
//   // User is signed in, see docs for a list of available properties
//   // https://firebase.google.com/docs/reference/js/auth.user
//   // ...
// } else {
//   // No user is signed in.
//}



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



// const inputStyle  ={
//     background: `url(${user.photoURL}) no-repeat scroll `,
//     paddingLeft:'30px',
//     backgroundSize: '30px',
//     MozBorderRadius: '50%',
//   WebkitBorderRadius: '50%', 
//   borderRadius: '50%',
  
// }



    return(
        <div>
            <SignOut auth={auth} />
            {messages && messages.docs.map((msg)=>(<ChatMessage auth={auth} key= {msg.id } message = {msg}/>))}
            <div ref = {dummy}></div>
            
      <form onSubmit={sendMessage}>
          <input type="text" placeholder="send a message" value = {formValue} onChange={(e)=>{setFormValue(e.target.value)}}/>
          
         <button  type="submit" className="btn btn-lg"><i className="fa-regular fa-paper-plane"></i></button>
 
      </form>
   
        </div> 
    ) 
}

export default ChatRoom;





// const FirestoreCollection = () => {
//   const [value, loading, error] = useCollection(
//     collection(getFirestore(), 'hooks'),
//     {
//       snapshotListenOptions: { includeMetadataChanges: true },
//     }
//   );
//   return (
//     <div>
//       <p>
//         {error && <strong>Error: {JSON.stringify(error)}</strong>}
//         {loading && <span>Collection: Loading...</span>}
//         {value && (
//           <span>
//             Collection:{' '}
//             {value.docs.map((doc) => (
//               <React.Fragment key={doc.id}>
//                 {JSON.stringify(doc.data())},{' '}
//               </React.Fragment>
//             ))}
//           </span>
//         )}
//       </p>
//     </div>
//   );
// };