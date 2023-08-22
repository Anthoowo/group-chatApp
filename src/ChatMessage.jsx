/* eslint-disable react/prop-types */
const ChatMessage = (props) => {

  const user = props.auth.currentUser;

  // doc info - text/uid/photo
  const { text, uid, photoURL } = props.message.data();

  // logged in user
  const userUID = user.uid;

  // message class of  message
  const messageClass = userUID === uid ? "sent" : "recieved";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="photo.jpeg" />
      <p> {text}</p>
    </div>
  );
};

export default ChatMessage;
