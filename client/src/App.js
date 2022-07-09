import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import BookingsPage from "./pages/BookingsPage";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ReportsPage from "./pages/ReportsPage";
import RequireAuth from "./components/RequireAuth";
import RequireGuest from "./components/RequireGuest";
import SpaceCreatePage from "./pages/SpaceCreatePage";
import SpacesIdPage from "./pages/SpacesIdPage";
import SpaceEditPage from "./pages/SpaceEditPage";
import ReportEditPage from "./pages/ReportEditPage";
import ReportsAllPage from "./pages/ReportsAllPage";

export default function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className="flex h-screen flex-col">
          <Navbar />

          <main className="container relative mx-auto flex flex-grow py-5">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/spaces/:id" element={<SpacesIdPage />} />

              <Route path="/" element={<RequireGuest />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              <Route path="/" element={<RequireAuth />}>
                <Route path="/bookings" element={<BookingsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/reports" element={<ReportsPage />} />
              </Route>

              <Route path="/" element={<RequireAuth admin />}>
                <Route path="/dashboard" element={<AdminDashboardPage />} />
                <Route path="/reports/:id/edit" element={<ReportEditPage />} />
                <Route path="/reports/all" element={<ReportsAllPage />} />
                <Route path="/spaces/new" element={<SpaceCreatePage />} />
                <Route path="/spaces/:id/edit" element={<SpaceEditPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
