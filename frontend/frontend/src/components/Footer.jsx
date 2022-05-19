import React, { useState } from "react";
import Image from "@assets/logo.png";
import { Link } from "react-router-dom";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";

function Footer() {
  const [colorTheme, setColorTheme] = useState(THEME_LIGHT);

  const onToggleDark = () => {
    document.documentElement.classList.toggle(THEME_DARK);
    document.documentElement.classList.toggle(THEME_LIGHT);
    setColorTheme(colorTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK);
  };

  return (
    <div>
      <div className=" bottom-0 text-mada p-1 bg-gradient-to-r from-[#8ddc93] to-[#ffdb20] w-full" />
      <footer className=" bottom-0 text-mada p-3 bg-gray-800 dark:bg-zinc-800 w-full flex items-center justify-between">
        <span className="flex items-center text-white">
          {" "}
          <img className="w-8 mr-3" src={Image} alt="logo" /> ©2022 Mealme™
        </span>
        <ul className="absolute text-sm text-white text-right right-20">
          <li>
            <Link to="/legal">
              <div className="underline hover:font-bold decoration-[#8ddc93] dark:decoration-[#ffdb20] decoration-2">
                Legal
              </div>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <div className="underline hover:font-bold decoration-[#8ddc93] dark:decoration-[#ffdb20] decoration-2">
                Contact
              </div>
            </Link>
          </li>
        </ul>
        <button
          id="theme-toggle"
          type="button"
          className="transition-all duration-300 border-solid border-2 border-[#ffdb20]  dark:border-[#8ddc93] bottom-3 right-4 text-gray-200 bg-zinc-700 hover:bg-gray-800 dark:hover:bg-gray-900 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full text-sm p-2.5"
          onClick={onToggleDark}
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {colorTheme === THEME_DARK ? (
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            ) : (
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            )}
          </svg>
        </button>
      </footer>
    </div>
  );
}

export default Footer;
