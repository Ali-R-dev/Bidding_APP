import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout'
import Login from './features/login/Login'
import AdminDashboard from './features/admin/AdminDashboard'
import AdminItemPage from './features/admin/AdminItemPage'
import UserHomePage from './features/user/UserHomePage'
import UserItemPage from './features/user/UserItemPage'
import NotFound from './components/NotFound'

function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Routes>
            {/* ---login--- */}

            <Route path={"/"} exact={true} element={<Login />} />

            {/* ---Admin Routes--- */}

            <Route path={"/dashboard"} exact={true} element={<AdminDashboard />} />
            <Route path={"/dashboard/item"} exact={true} element={<AdminItemPage />} />

            {/* ---user Routes--- */}

            <Route path={"/items"} exact={true} element={<UserHomePage />} />

            <Route path={"/items/item"} exact={true} element={<UserItemPage />} />
            {/* ---Not found Routes--- */}

            <Route path={"*"} element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
