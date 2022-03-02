import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from './components/Layout'
import LoginPage from './features/login/LoginPage'
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

            <Route path={"/items/:id"} exact={true} element={
              isAuth() && credentials.role === "regular" ? <UserItemPage /> : <LoginPage />
            } />

            {/* ---regular user routes--- */}
            <Route path={"/items"} exact={true} element={
              isAuth() && credentials.role === "regular" ? <UserHomePage /> : <LoginPage />
            } />

            <Route path={"/dashboard/:id"} exact={true} element={
              isAuth() && credentials.role === "admin" ? <AdminItemPage /> : <LoginPage />
            } />

            {/* ---admin routes--- */}
            <Route path={"/dashboard"} exact={true} element={
              isAuth() && credentials.role === "admin" ? <AdminDashboard /> : <LoginPage />
            } />
            <Route path={"/dashboard/new"} exact={true} element={
              isAuth() && credentials.role === "admin" ? <AdminItemPage /> : <LoginPage />
            } />

            <Route path={"*"} element={<NotFound />} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
