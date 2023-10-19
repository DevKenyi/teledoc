import { AuthProvider } from "./components/AuthProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Appointments from "./components/Appointments";
import DoctorRegistration from "./components/doctor/DoctorRegistration";
import DoctorsList from "./components/doctor/DoctorsList";
import Tests from "./components/Tests";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import DocLayout from "./components/doctor/DocLayout";
import Appointmets_Doctors from "./components/doctor/Appointmets_Doctors";
import DoctorPatients from "./components/doctor/DoctorPatients";
import DoctorShedule from "./components/doctor/DoctorShedule";
import DoctorsSettings from "./components/doctor/DoctorsSettings";
import { TableMeeting } from "./components/TableMeeting";
import MeedingVideoConferencing from "./components/meetin_ui/MeedingVideoConferencing";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/doctor-dashboard"
            element={
              <DocLayout>
                <DoctorDashboard />
              </DocLayout>
            }
          />
          <Route
            path="/doctors-dashboard"
            element={
              <DocLayout>
                <DoctorDashboard />
              </DocLayout>
            }
          />
          <Route
            path="/doctor-patients"
            element={
              <DocLayout>
                <DoctorPatients />
              </DocLayout>
            }
          />
          <Route
            path="/doctor-appointments"
            element={
              <DocLayout>
                <Appointmets_Doctors />
              </DocLayout>
            }
          />
          <Route path="/video" element={<MeedingVideoConferencing />} />
          <Route
            path="/doctors-schedule"
            element={
              <DocLayout>
                <DoctorShedule />
              </DocLayout>
            }
          />
          <Route
            path="/doctor-setting"
            element={
              <DocLayout>
                <DoctorsSettings />
              </DocLayout>
            }
          />
          <Route
            path="//meeting-details"
            element={
              <DocLayout>
                <TableMeeting />
              </DocLayout>
            }
          />
          <Route
            path="/appointments"
            element={
              <Layout>
                <Appointments />
              </Layout>
            }
          />
          <Route path="/registration-doctor" element={<DoctorRegistration />} />
          <Route
            path="/doctors-list"
            element={
              <Layout>
                <DoctorsList />
              </Layout>
            }
          />
          <Route
            path="tests"
            element={
              <Layout>
                <Tests />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
