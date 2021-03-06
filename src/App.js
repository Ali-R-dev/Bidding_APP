import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from './components/Layout'
import LoginPage from './features/login/LoginPage'
import Profile from "./features/commonPages/Profile";

import AdminDashboard from './features/admin/AdminDashboard'
import AdminItemPage from './features/admin/AdminItemPage'
import UserHomePage from './features/user/UserHomePage'
import UserItemPage from './features/user/UserItemPage'
import NotFound from './components/NotFound'
import { useAuth } from './Contexts/AuthContext'

function App() {
  const { isAuth, credentials } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>

            {/* ---Login route--- */}
            <Route path={"/"} exact={true} element={<LoginPage />} />

            <Route path={"/profile"} exact={true} element={
              isAuth() ? <Profile /> : <LoginPage />
            } />

            {/* ---regular user routes--- */}

            <Route path={"/items/:id"} exact={true} element={
              isAuth() && credentials.role === "REG" ? <UserItemPage /> : <LoginPage />
            } />


            <Route path={"/items"} exact={true} element={
              isAuth() && credentials.role === "REG" ? <UserHomePage /> : <LoginPage />
            } />

            {/* ---admin routes--- */}

            <Route path={"/dashboard/:id"} exact={true} element={
              isAuth() && credentials.role === "ADM" ? <AdminItemPage /> : <LoginPage />
            } />

            <Route path={"/dashboard"} exact={true} element={
              isAuth() && credentials.role === "ADM" ? <AdminDashboard /> : <LoginPage />
            } />


            <Route path={"/dashboard/new"} exact={true} element={
              isAuth() && credentials.role === "ADM" ? <AdminItemPage /> : <LoginPage />
            } />

            <Route path={"*"} element={<NotFound />} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
