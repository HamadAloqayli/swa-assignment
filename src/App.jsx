import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import Dashboard from "./pages/Dashboard";
import ITPage from "./pages/ITPage";
import HRPage from "./pages/HRPage";
import FinancePage from "./pages/FinancePage";
import LawPage from "./pages/LawPage";
import PMOPage from "./pages/PMOPage";
import CyberPage from "./pages/CyberPage";
import AuditPage from "./pages/AuditPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="it" element={<ITPage />} />
          <Route path="hr" element={<HRPage />} />
          <Route path="finance" element={<FinancePage />} />
          <Route path="law" element={<LawPage />} />
          <Route path="pmo" element={<PMOPage />} />
          <Route path="cyber" element={<CyberPage />} />
          <Route path="audit" element={<AuditPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
