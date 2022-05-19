import { Route, Routes, BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Header from "@components/Header";
import Carrousel from "@pages/Carrousel";
import Footer from "@components/Footer";
import Home from "@pages/Home";
import Contact from "@pages/Contact";
import Legal from "@pages/Legal";
import Loader from "@components/Loader";
import Recipe from "@pages/Recipe";
import LoginForm from "@components/LoginForm";
import TodayRecipes from "@pages/TodayRecipes";
import Favorites from "@pages/Favorites";
import PageNotFound from "@pages/PageNotFound";

import LoginContext from "@contexts/LoginContext";

import "./App.css";

function App() {
  const [loader, setLoader] = useState(true);
  const [isShowLogin, setIsShowLogin] = useState(false);

  const [currentUser, setCurrentUser] = useState("");

  const handleLoginClick = () => {
    setIsShowLogin(() => !isShowLogin);
  };

  const getLoginContext = () => {
    return { currentUser, setCurrentUser };
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <LoginContext.Provider value={getLoginContext()}>
          <Header
            handleLoginClick={handleLoginClick}
            currentUser={currentUser}
          />

          {!currentUser && <LoginForm isShowLogin={isShowLogin} />}

          <main className="h-full">
            {loader ? (
              <Loader />
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carrousel" element={<Carrousel />} />
                <Route path="/todayrecipes" element={<TodayRecipes />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/recipe" element={<Recipe />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            )}
            <Footer />
          </main>
        </LoginContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
