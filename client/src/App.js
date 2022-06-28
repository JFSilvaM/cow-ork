import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import BookingsPage from "./pages/BookingsPage";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import ReportCategoriesPage from "./pages/ReportCategoriesPage";
import ReportsPage from "./pages/ReportsPage";
import RequireAuth from "./components/RequireAuth";
import ServicesPage from "./pages/ServicesPage";
import SpaceTypesPage from "./pages/SpaceTypesPage";
import UsersPage from "./pages/UsersPage";

export default function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className="flex h-screen flex-col">
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="/spaces/:id" element={<SpacesPage />} /> */}

            <Route path="/" element={<RequireAuth />}>
              <Route path="/bookings" element={<BookingsPage />} />
              <Route
                path="/report_categories"
                element={<ReportCategoriesPage />}
              />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/space_types" element={<SpaceTypesPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
