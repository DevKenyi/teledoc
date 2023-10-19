// import React, { useEffect } from "react";
// import ApiService from "../service/ApiService";
// import { Rating, Typography } from "@material-tailwind/react";

// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
// } from "@material-tailwind/react";
// import DoctorModal from "../DoctorModal";

// const Tests = () => {
//   const jwtToken = localStorage.getItem("jwtToken");
//   useEffect(() => {
//     fetchData();
//   }, []); // Empty dependency array to run the effect only once when the component mounts

//   const fetchData = async () => {
//     try {
//       const response = await ApiService.docotorsList({
//         Authorization: `Bearer ${jwtToken}`,
//       });

//       if (response.status === 200) {
//         console.log("success");

//         console.log("doctors list here ");
//       }

//       if (response.status === 302) {
//         // navigate("/login");
//         console.log("Token expired!");
//       }
//     } catch (error) {
//       console.log("Error getting response", error);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-16 border">
//       {doctorList.map((doctor, index) => (
//         <div key={index}>
//           <Card className="mt-6 w-96">
//             <CardHeader color="blue-gray" className="relative h-56">
//               {doctor.profilePicture?.imageUrl ? ( // Use optional chaining here
//                 <img
//                   src={`http://${doctor.profilePicture.imageUrl}`}
//                   alt="img-blur-shadow"
//                   layout="fill"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gray-300"></div> // Placeholder image or any other fallback
//               )}
//             </CardHeader>

//             <CardBody>
//               <Typography variant="h5" color="blue-gray" className="mb-2">
//                 Dr. {`${doctor.firstname} ${doctor.lastname}`}
//               </Typography>
//               <Typography>Email: {doctor.email}</Typography>
//               <Typography>{doctor.specialization}</Typography>
//               <Typography
//                 className={
//                   doctor.availability ? "text-green-500" : "text-red-500"
//                 }
//               >
//                 {doctor.availability ? "Available" : "Unavailable"}
//                 <div className="flex items-center gap-2">
//                   <Rating value={4} onChange={(value) => setRated(value)} />
//                   <Typography color="blue-gray" className="font-medium">
//                     {rated}.0 Rated
//                   </Typography>
//                 </div>
//               </Typography>
//             </CardBody>
//             <CardFooter className="pt-0">
//               {showAppointmentModal && (
//                 <DoctorModal
//                   disabled={!doctor.availability}
//                   doctorId={doctor.doctorId}
//                 />
//               )}
//               {popUpMessage && <PopUpModalMessage />}
//             </CardFooter>
//           </Card>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Tests;
