import { signInWithPopup } from "firebase/auth";

const SignIn = (props) => {
  function signInWithGoogle() {
  

    signInWithPopup(props.auth, props.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
       // const credential = props.GoogleAuthProvider.credentialFromResult(result);
       // const token = credential.accessToken;
      
        // const user = props.auth.currentUser;
        // console.log(user)
        
        // if (user) {
        //   // User is signed in, see docs for a list of available properties
        //   // https://firebase.google.com/docs/reference/js/auth.user
        //   // ...
        // } else {
        //   // No user is signed in.
        // }

        // The signed-in user info.
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorMessage}  ${errorCode}`)
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

   
  }
  return (
    <div className="App"> 
<button className="btn btn-lg btn-outline-primary" onClick={signInWithGoogle}>Sign in with google</button>
</div>
  )
};

export default SignIn;


