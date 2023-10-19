import axios from "axios";

const baseUrl = "http://localhost:1992";

class ApiService {
  static patientRegPost(data) {
    return axios.post(baseUrl + "/patient", data);
  }

  static login(data) {
    return axios.post(baseUrl + "/login", data);
  }

  static appointmentList(headers) {
    const encodedUrl = encodeURI(baseUrl + "/appointments");
    return axios.get(encodedUrl, { headers });
  }

  static doctorRegPost(data) {
    return axios.post(baseUrl + "/doctor", data);
  }
  static docotorsList(headers) {
    const encodedUrl = encodeURI(baseUrl + "/doctors-list");
    return axios.get(encodedUrl, { headers });
  }

  static bookAppointmentPost(doctorId, data, headers) {
    const url = `${baseUrl}/appointment-bookings/${doctorId}`;
    return axios.post(url, data, { headers });
  }

  static findPatientByDoctorId(doctorId, headers) {
    const url = `${baseUrl}/api/doctor/${doctorId}/patients`;
    console.log(`Url here ${url}`);
    return axios.get(url, { headers });
  }

  static pendingAppointments(doctorId, headers) {
    const url = `${baseUrl}/api/doctor/${doctorId}/pending-appointments`;
    console.log(`Url here ${url}`);
    return axios.get(url, { headers });
  }

  static upcomigAppointments(doctorId, headers) {
    const url = `${baseUrl}/api/doctor/${doctorId}/upcoming-appointments`;
    console.log(`Url here ${url}`);
    return axios.get(url, { headers });
  }
  static inProgress(doctorId, headers) {
    const url = `${baseUrl}/api/doctor/${doctorId}/in-progress`;
    console.log(`Url here ${url}`);
    return axios.get(url, { headers });
  }

  static findPatientById(patientId, headers) {
    const url = `${baseUrl}/api/patient/${patientId}`;
    console.log(`Url here ${url}`);
    return axios.get(url, { headers });
  }

  static pendingAppointmentForPatient(patientId, headers) {
    const url = `${baseUrl}/api/patient/${patientId}/patient/status-pending`;
    console.log(`Url here ${url}`);
    return axios.get(url, { headers });
  }
  static scheduledAppointmentForPatient(patientId, headers) {
    const url = `${baseUrl}/api/patient/${patientId}/patient/status-scheduled`;
    console.log(`Url here ${url}`);
    return axios.get(url, { headers });
  }

  static completedAppointmentForPatient(patientId, headers) {
    const url = `${baseUrl}/api/patient/${patientId}/patient/status-completed`;
    console.log(`Url here ${url}`);
    return axios.get(url, { headers });
  }
  static bloodgroupForPatient(patientId, headers) {
    const url = `${baseUrl}/api/patient/${patientId}/patient/patient-blood-group/${patientId}`;
    console.log(`Url here ${url}`);
    return axios.get(url, { headers });
  }

  static doctorForPatientFirstElement(patientId, headers) {
    const url = `${baseUrl}/api/patient/${patientId}/doctor-patient`;
    return axios.get(url, { headers });
  }
  static findDoctorById(doctorId, headers) {
    const url = `${baseUrl}/doctor-profile/${doctorId}`;
    console.log(`Url for doctors profile here here ${url}`);
    return axios.get(url, { headers });
  }
  static pendingAppointmentForDoctors(doctorId, headers) {
    const url = `${baseUrl}/api/doctor/${doctorId}/pending-appointments`;
    console.log(`Url here ${url}`);
    return axios.get(url, { headers });
  }

  static fetchAppointmentsByDoctorId(doctorId, headers) {
    const url = `${baseUrl}/api/v2/doctors/${doctorId}/appointments`;
    console.log(
      `Url for fetching appointments for patients based on doctors id here ${url}`
    );
    return axios.get(url, { headers });
  }
  //api for creating meeting
  static createMeeting(doctorId, data, headers) {
    const url = `${baseUrl}/api/video/meeting/${doctorId}`;
    console.log(
      `Url creating video conferinging meeting based on doctors id here ${url}`
    );
    return axios.post(url, data, { headers });
  }

  //api for adding adding participants
  static addParticipants(doctorId, meetingId, payload, headers) {
    const url = `${baseUrl}/api/meetings/${meetingId}/participants/${doctorId}`;
    console.log(`Url for adding participant to the meeting here  ${url}`);
    return axios.post(url, payload, { headers });
  }
  static fetchMeetingDetails(headers) {
    const url = `${baseUrl}/api/meeting/dyte-response`;
    console.log(`Url for fetching fetching meeting details ${url}`);
    return axios.get(url, { headers });
  }
}

export default ApiService;

// http://localhost:1992/api/meetings//participants/1
// localhost:1992/api/meetings/bbb70676-08c3-4cf3-b2a5-286b66c849ec/participants/1
