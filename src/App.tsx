import { BrowserRouter, Routes, Route } from "react-router-dom";

import CaseManagementPage from "./Pages/CaseManagement/CaseManagement";
import HomePage from "./Pages/Home/Home";
import CaseDetailPage from "./Pages/CaseDetail/CaseDetail";
import Mainlayout from "./layouts/Mainlayout";
import Map from "./Pages/Map/Map";
import Maplayout from "./layouts/Maplayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Mainlayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cases/:caseId" element={<CaseDetailPage />} />
          <Route path="/cases" element={<CaseManagementPage />} />
          <Route path="/map" element={<Map />} />
        </Route>
        <Route path="map" element={<Maplayout />}>
          <Route index element={<Map />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
