const Notification = ({ notification }) => {
  return (
    <div className={`notification ${notification.type}`}>
      {notification.msg}
    </div>
  );
};

export default Notification;
