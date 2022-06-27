import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookingsPage from "./pages/BookingsPage";
import ReportCategoriesPage from "./pages/ReportCategoriesPage";
import ReportsPage from "./pages/ReportsPage";
import ServicesPage from "./pages/ServicesPage";
import SpaceTypesPage from "./pages/SpaceTypesPage";
import SpacesPage from "./pages/SpacesPage";
import UsersPage from "./pages/UsersPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <main className="container mx-auto my-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          {/* <Route path="/bookings/:id" element={<BookingsIdPage />} /> */}
          <Route path="/report_categories" element={<ReportCategoriesPage />} />
          {/* <Route
            path="/report_categories/:id"
            element={<ReportCategoriesIdPage />}
          /> */}
          <Route path="/reports" element={<ReportsPage />} />
          {/* <Route path="/reports/:id" element={<ReportsIdPage />} /> */}
          <Route path="/services" element={<ServicesPage />} />
          {/* <Route path="/services/:id" element={<ServicesIdPage />} /> */}
          <Route path="/space_types" element={<SpaceTypesPage />} />
          {/* <Route path="/space_types/:id" element={<SpaceTypesIdPage />} /> */}

          <Route path="/spaces" element={<SpacesPage />} />
          {/* <Route path="/spaces/:id" element={<SpacesIdPage />} /> */}

          <Route path="/users" element={<UsersPage />} />
          {/* <Route path="/users/:id" element={<UsersIdPage />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
