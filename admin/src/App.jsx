import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import AdminLogin from './pages/Admin/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        {/* Public Route */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <hr />
                <div className="app-content">
                  <Sidebar />
                  <div className="app-pages">
                    <Outlet />
                  </div>
                </div>
              </>
            </ProtectedRoute>
          }
        >
          <Route path="add" element={<Add />} />
          <Route path="list" element={<List />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<Navigate to="add" />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
