import { useState, useContext } from "react";

import { login, signin } from "@services/api";
import LoginContext from "@contexts/LoginContext";

function LoginForm({ isShowLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setCurrentUser } = useContext(LoginContext);

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      setCurrentUser(await login({ username, password }));
    } catch (err) {
      alert(err.message);
    }
  };

  const onSignIn = async (e) => {
    e.preventDefault();

    try {
      setCurrentUser(await signin({ username, password }));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className={`${
        !isShowLogin ? "active" : ""
      } show z-50 border-[#8ddc93] dark:border-[#ffdb20] border-2 rounded-3xl bg-zinc-50 dark:bg-gray-700`}
    >
      <div className="login-form">
        <div className="form-box solid">
          <form>
            <h1 className="login-text text-mada text-gray-800 px-1 dark:text-white font-bold">
              Please sign in:
            </h1>
            <label
              htmlFor="user"
              className="text-mada text-gray-800 p-1 dark:text-white"
            >
              Username
              <br />
              <input
                type="text"
                name="username"
                className="login-box pl-2 text-mada border-1 hover:border-[#8ddc93] dark:hover:border-[#ffdb20] dark:text-gray-800"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                placeholder="Your name"
              />
              <br />
            </label>
            <label
              htmlFor="password"
              className="text-mada text-gray-800 p-1 dark:text-white"
            >
              Password
              <br />
              <input
                type="password"
                name="password"
                className="login-box text-mada pl-2 border-1 hover:border-[#8ddc93] dark:hover:border-[#ffdb20] dark:text-gray-800"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Your password"
              />
              <br />
            </label>
            <input
              type="submit"
              value="LOGIN!"
              className="login-btn bg-[#8ddc93] dark:bg-[#ffdb20] hover:scale-105 duration-200 p-1 px-2 rounded-3xl mt-3 text-atma font-bold"
              onClick={onLogin}
            />
            <input
              type="submit"
              value="SIGN IN!"
              className="login-btn border-1 border-[#8ddc93] ml-8 hover:scale-105 duration-200 dark:border-[#ffdb20] text-[#8ddc93] dark:text-[#ffdb20] p-1 px-2 rounded-3xl ml-2 mt-2 text-atma font-bold"
              onClick={onSignIn}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
