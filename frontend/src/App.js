import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import { userContext } from "./userContext";
import { AuthService } from "./authService";
import Login from "./pages/Login";
import Goods from "./pages/Goods";
import { useEffect, useState } from "react";
import { Http } from "./httpService";
import GoodForm from "./components/GoodForm";
import Edit from "./pages/Edit";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      await AuthService.refreshTokens();
      setUser(AuthService.getUser());
    }
    fetchUser();
  }, []);

  const http = new Http({ auth: true });

  return (
    <div className="App">
      <userContext.Provider value={user}>
        <BrowserRouter>
          <Header />
          {user ? (
            <Routes>
              <Route path="/" element={<Goods />} />
              <Route
                path="/create"
                element={
                  <GoodForm
                    http={http}
                    url={"/goods"}
                    btnText="Add"
                    method="POST"
                  />
                }
              />
              <Route path="/edit/*" element={<Edit />} />
            </Routes>
          ) : (
            <Login />
          )}
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
