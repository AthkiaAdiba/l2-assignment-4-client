import "./App.css";
import Dashboard from "./components/layout/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute role={undefined}>
      <Dashboard></Dashboard>
    </ProtectedRoute>
  );
}

export default App;
