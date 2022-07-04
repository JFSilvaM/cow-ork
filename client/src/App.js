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
import ReportCategoriesPage from "./pages/ReportCategoriesPage";
import ReportsPage from "./pages/ReportsPage";
import RequireAuth from "./components/RequireAuth";
import RequireGuest from "./components/RequireGuest";
import ServicesPage from "./pages/ServicesPage";
import SpaceCreatePage from "./pages/SpaceCreatePage";
import SpacesIdPage from "./pages/SpacesIdPage";
import SpaceTypesPage from "./pages/SpaceTypesPage";
import UsersPage from "./pages/UsersPage";
import SpaceEditPage from "./pages/SpaceEditPage";

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
                <Route path="/bookings/all" element={<BookingsPage />} />
                <Route path="/reports/all" element={<ReportsPage />} />
                <Route
                  path="/report_categories"
                  element={<ReportCategoriesPage />}
                />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/spaces/new" element={<SpaceCreatePage />} />
                <Route path="/spaces/:id/edit" element={<SpaceEditPage />} />
                <Route path="/space_types" element={<SpaceTypesPage />} />
                <Route path="/users" element={<UsersPage />} />
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
