import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import { RegisterForm } from "./components/Auth/RegisterForm.jsx"
import { LandingPage } from './components/LandingPage/LandingPage.jsx';
import { LoginForm } from './components/Auth/LoginForm.jsx';
import { Dashboard } from './components/Dashboard/Dashboard.jsx';
import { ExercisesPage } from './components/ExercisesPage/ExercisesPage.jsx';
import { SidebarProvider } from './context/SideBarContext.jsx';
import { WorkoutsPage } from './components/WorkoutsPage/WorkoutsPage.jsx';
import { ProgressPage } from './components/ProgressPage/ProgressPage.jsx';
import { ThemeProvider } from './context/ThemeContext';
import { ChatPage } from './components/AIchatPage/ChatPage.jsx';

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exercises" element={<ExercisesPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
