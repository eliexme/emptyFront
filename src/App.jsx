import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditProjectPage from "./pages/EditProjectPage";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import Profile from "./pages/Profile";
import AddExercise from "./pages/AddExercise";
import ExerciseVenue from "./pages/ExerciseVenue";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/profile" element={<IsPrivate><Profile/></IsPrivate>} />
        <Route path="/addexer" element={<AddExercise />} />
        <Route path="/exervenue" element={<ExerciseVenue />} />
      </Routes>
    </div>
  );
}

export default App;
