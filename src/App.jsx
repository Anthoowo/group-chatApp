import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
//import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatRooom from "./ChatRoom";
import SignIn from "./SignIn";

function App() {
  const provider = new GoogleAuthProvider();
  const firebaseConfig = {
    apiKey: "AIzaSyAlCNQxW1QH-Ej0hRDDurvjKcpk3orkDek",
    authDomain: "chatapp-bc273.firebaseapp.com",
    projectId: "chatapp-bc273",
    storageBucket: "chatapp-bc273.appspot.com",
    messagingSenderId: "1008296007791",
    appId: "1:1008296007791:web:64cb8cc601036e55da559a",
    measurementId: "G-D3XGQ8REN5",
  };

  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  // const analytics = getAnalytics(app);
  const [user] = useAuthState(auth);


  const divStyle ={
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.49)',
    backgroundColor: 'rgb(17, 16, 18)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    width: "80%",
    borderRadius: '1rem'
  }
  return (
    <>

      {user ? (
        <ChatRooom auth={auth} db={db} />
      ) : (
        <div className="contain d-flex align-items-center justify-content-center m-auto">
          <div className="d-flex align-items-center justify-content center">
            <div className="card hello" style={divStyle}>
              <div className="card-body">
                <h1 className="card-title text-center">
                  Welcome to the Group Chat
                </h1>
                <SignIn auth={auth} provider={provider} GoogleAuthProvider= {GoogleAuthProvider} />
              </div>
            </div>
          </div>
        </div>
      )}
     
    </>
  );
}

export default App;
