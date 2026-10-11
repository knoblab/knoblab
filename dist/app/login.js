function Login({ darkMode, palette }) {
  return (
    <div
      className="min-h-[80vh]"
      style={{
        backgroundColor: darkMode ? palette.black : palette.white,
        color: darkMode ? palette.white : palette.black
      }}
    >
    </div>
  );
}

window.Login = Login;
