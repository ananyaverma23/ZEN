import { useState } from "react";
import { Navigation } from "./components/layout/Navigation";
import { Dashboard } from "./components/views/Dashboard";
import { AIChat } from "./components/views/AIChat";
import { BookingSystem } from "./components/views/BookingSystem";
import { ResourceHub } from "./components/views/ResourceHub";
import { PeerSupport } from "./components/views/PeerSupport";
import { AdminDashboard } from "./components/views/AdminDashboard";
import { AdminInterface } from "./components/views/AdminInterface";
import { CounselorInterface } from "./components/views/CounselorInterface";
import { CounselorProfile } from "./components/views/CounselorProfile";
import { StudentProfile } from "./components/views/StudentProfile";
import { LandingPage } from "./components/views/LandingPage";
import { AuthPage } from "./components/views/AuthPage";

/**
 * The root component of the application. It manages the overall state,
 * such as the current user and which view is being displayed.
 */
export default function App() {
  // --- State Management ---
  const [appState, setAppState] = useState("landing"); // 'landing', 'auth', 'app'
  const [userType, setUserType] = useState(null); // 'student', 'counselor', 'admin'
  const [userData, setUserData] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard");

  /**
   * Handles the login process by setting the user's data and changing the app state.
   * @param {'student'|'counselor'|'admin'} type - The role of the user.
   * @param {object} data - The user's profile data.
   */
  const handleLogin = (type, data) => {
    setUserType(type);
    setUserData(data);
    setAppState("app");

    // Set the appropriate default view for each user type
    switch (type) {
      case "student":
        setCurrentView("dashboard");
        break;
      case "counselor":
        setCurrentView("counselor-dashboard");
        break;
      case "admin":
        setCurrentView("admin-dashboard");
        break;
    }
  };

  /**
   * Resets the application state to log the user out and return to the landing page.
   */
  const handleLogout = () => {
    setUserType(null);
    setUserData(null);
    setCurrentView("dashboard");
    setAppState("landing");
  };

  /**
   * Renders the component corresponding to the current view state.
   * @returns {JSX.Element | null} The component to render.
   */
  const renderCurrentView = () => {
    if (!userType) return null;

    switch (currentView) {
      // --- Student Views ---
      case "dashboard":
        return <Dashboard onViewChange={setCurrentView} />;
      case "chat":
        return <AIChat />;
      case "booking":
        return <BookingSystem />;
      case "resources":
        return <ResourceHub />;
      case "forum":
        return <PeerSupport />;
      case "profile":
         return userType === 'student' ? <StudentProfile /> : <CounselorProfile />;


      // --- Counselor Views ---
      case "counselor-dashboard":
      case "clients":
      case "sessions":
      case "reports":
        return (
          <CounselorInterface
            currentView={currentView}
            onViewChange={setCurrentView}
          />
        );

      // --- Admin Views ---
      case "admin-dashboard":
      case "users":
      case "content":
      case "crisis":
      case "analytics":
      case "system":
        return <AdminInterface />;
      case "admin": // Legacy admin view
        return <AdminDashboard />;

      // --- Default View ---
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  // --- Top-Level Render Logic ---

  if (appState === "landing") {
    return (
      <LandingPage
        onGetStarted={() => setAppState("auth")}
        onLogin={() => setAppState("auth")}
      />
    );
  }

  if (appState === "auth") {
    return <AuthPage onLogin={handleLogin} onBack={() => setAppState("landing")} />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        userType={userType}
        onLogout={handleLogout}
        userData={userData}
      />
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">{renderCurrentView()}</main>
    </div>
  );
}