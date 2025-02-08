import { BrowserRouter, Routes, Route } from "react-router-dom";

import CaseManagementPage from "./Pages/Police(Admin)/CaseManagement/CaseManagement";
import HomePage from "./Pages/Home/Home";
import Mainlayout from "./layouts/Mainlayout";
import Map from "./Pages/Map/Map";
import Maplayout from "./layouts/Maplayout";
import CaseProfile from "./Pages/Police(Admin)/CaseProfile/CaseProfile";
import UserLogin from "./Pages/Auth/UserLogin";
import UserProfile from "./Pages/Public(User)/UserProfile";
import ReportIncidents from "./Pages/Public(User)/ReportIncidents";
import EmergencyContacts from "./Pages/Public(User)/EmergencyContacts";
import SOS from "./Pages/Public(User)/SOS";
import SafetyTips from "./Pages/Public(User)/SafetyTips";
import UserRegister from "./Pages/Auth/UserRegister";

export const baseUrl = "https://natural-ape-severely.ngrok-free.app";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Mainlayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cases/:caseId" element={<CaseProfile />} />
          <Route path="/cases" element={<CaseManagementPage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/login" element={<UserLogin />} />
          {/* <Route path="/register" element={<UserRegister />} /> */}
          <Route path="/publicuser/profile" element={<UserProfile />} />
          <Route path="/publicuser/report" element={<ReportIncidents />} />
          <Route path="/publicuser/emergencycontacts" element={<EmergencyContacts />} />
          <Route path="/publicuser/sos" element={<SOS/>} />
          <Route path="/publicuser/blogs" element={<SafetyTips />} />

        </Route>
        <Route path="map" element={<Maplayout />}>
          <Route index element={<Map />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
