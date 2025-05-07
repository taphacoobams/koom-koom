import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Plan from './pages/Plan';
import Transactions from './pages/Transactions';
import Accounts from './pages/Accounts';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import Profile from './pages/Profile';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      {/* App pages dans le Layout (avec Bottom Nav) */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      </Routes>
    </Router>
  );
}

export default App;
