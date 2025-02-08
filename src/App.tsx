import { BrowserRouter, Routes, Route } from "react-router-dom";

import CaseManagementPage from "./Pages/CaseManagement/CaseManagement";
import HomePage from "./Pages/Home/Home";
import Mainlayout from "./layouts/Mainlayout";
import Map from "./Pages/Map/Map";
import Maplayout from "./layouts/Maplayout";
import CaseProfile from "./Pages/CaseProfile/CaseProfile";
import UserLogin from "./Pages/Auth/UserLogin";

export const baseUrl = "http://localhost:5173/";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Mainlayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cases" element={<CaseManagementPage />} />
          <Route
            path="/cases/new"
            element={<CreateCase onCaseCreated={() => {}} />}
          />
          <Route path="/cases/:caseId" element={<CaseProfile />} />

          <Route path="/map" element={<Map />} />
          <Route path="/login" element={<UserLogin />} />
        </Route>
        <Route path="map" element={<Maplayout />}>
          <Route index element={<Map />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
