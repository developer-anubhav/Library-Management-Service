import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Library from "./pages/Library";

// Auth Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";

// Book Components
import BookDetails from "./components/books/BookDetails";

// User Components
import Profile from "./components/user/Profile";
import BorrowedBooks from "./components/user/BorrowedBooks";
import BookHistory from "./components/user/BookHistory";

// Admin Components
import Dashboard from "./components/admin/Dashboard";
import ManageBooks from "./components/admin/ManageBooks";
import ManageUsers from "./components/admin/ManageUsers";
import Reports from "./components/admin/Reports";

// Common Components
import Header from "./components/common/Header";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  // Mock user state - replace with actual auth logic
  const user = null; // or { name: 'John Doe', role: 'admin' }

  const handleLogout = () => {
    console.log("Logging out...");
    // TODO: Implement logout logic
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header user={user} onLogout={handleLogout} />
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/library" element={<Library />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Book Routes */}
            <Route path="/books/:id" element={<BookDetails />} />

            {/* User Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-books" element={<BorrowedBooks />} />
            <Route path="/history" element={<BookHistory />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/books" element={<ManageBooks />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/reports" element={<Reports />} />

            {/* 404 Route */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
                  <a href="/" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Go Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;