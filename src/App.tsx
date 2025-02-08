import { BrowserRouter, Routes, Route } from "react-router-dom";

import CaseManagementPage from "./Pages/Police(Admin)/CaseManagement/CaseManagement";
import HomePage from "./Pages/Home/Home";
import Mainlayout from "./layouts/Mainlayout";
import Map from "./Pages/Map/Map";
import Maplayout from "./layouts/Maplayout";
import CaseProfile from "./Pages/Police(Admin)/CaseProfile/CaseProfile";
import UserLogin from "./Pages/Auth/UserLogin";
import CreateCase from "./Pages/Police(Admin)/CreateCase/CreateCase";
import Chatlayout from "./layouts/Chatlayout";
import IncidentReport from "./Pages/Police(Admin)/IncidentReport/IncidentReport";
import UserRegister from "./Pages/Auth/UserRegister";
import UserProfile from "./Pages/Public(User)/UserProfile";
import ReportIncidents from "./Pages/Public(User)/ReportIncidents";
import EmergencyContacts from "./Pages/Public(User)/EmergencyContacts";
import SafetyTips from "./Pages/Public(User)/SafetyTips";
import IncidentDetails from "./Pages/Police(Admin)/IncidentReport/IncidentDetails";
import ReportLayout from "./layouts/ReportLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SOS from "./Pages/Public(User)/SOS/SOS";

export const baseUrl = "https://natural-ape-severely.ngrok-free.app";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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

            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/register" element={<UserRegister />} />

            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/report" element={<ReportIncidents />} />
            <Route
              path="/user/emergencycontacts"
              element={<EmergencyContacts />}
            />
            <Route path="/user/sos" element={<SOS />} />
            <Route path="/user/blogs" element={<SafetyTips />} />
          </Route>
          <Route path="/chats" element={<Chatlayout />} />
          <Route path="map" element={<Maplayout />}>
            <Route index element={<Map />} />
          </Route>
          <Route path="/incident" element={<ReportLayout />}>
            <Route path="report" element={<IncidentReport />} />
            <Route path="details/:incidentId" element={<IncidentDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
