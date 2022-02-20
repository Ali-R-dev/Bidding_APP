import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout'
import LoginPage from './features/login/LoginPage'
import AdminDashboard from './features/admin/AdminDashboard'
import AdminItemPage from './features/admin/AdminItemPage'
import UserHomePage from './features/user/UserHomePage'
import UserItemPage from './features/user/UserItemPage'
import NotFound from './components/NotFound'
// import ProtectedRoute from './components/ProtectedRoute'
import { useState } from "react";
function App() {
  const [userId, setUserId] = useState("abc")

  const isAuth = () => {
    if (!userId) return false;
    return true;
  }

  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Routes>

            <Route path={"/"} exact={true} element={<LoginPage />} />

            <Route path={"/items"} exact={true} element={<UserHomePage />} />

            <Route path={"/items/:id"} exact={true} element={<UserItemPage />} />

            <Route path={"/dashboard"} exact={true} element={<AdminDashboard />} />

            <Route path={"/dashboard/:id"} exact={true} element={<AdminItemPage />} />
            {/* ---Not found Routes--- */}

            {/* <Route path={"*"} element={<NotFound />} /> */}

          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
