import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "./service/ApiService";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setFormError("Please fill in all required fields.");
      return;
    }

    setFormError("");
    setIsError(false);
    setIsLoading(true);

    const loginRequestData = { email, password };

    try {
      const response = await ApiService.login(loginRequestData);
      if (response.status === 200) {
        console.log(`response from server ${response.data}`);
        const { jwtToken } = response.data;

        localStorage.setItem("jwtToken", jwtToken);

        // navigate("/dashboard");

        const user_role = response.data.userRole;
        console.log("USER ROLE HERE " + user_role);

        const userData = response.data;

        // Store the entire userData object as a JSON string in local storage
        // localStorage.setItem("userData", JSON.stringify(userData));

        // Check specific properties within userData
        if (userData.patientId) {
          localStorage.setItem("patientId", userData.patientId);
        } else if (userData.id) {
          localStorage.setItem("doctorId", userData.id);
        } else if (userData.adminId) {
          localStorage.setItem("adminId", userData.adminId);
        } else {
          console.log("Error!!! No Id was found ");
        }

        switch (user_role) {
          case "ROLE_PATIENT":
            navigate("/dashboard");
            break;

          case "ROLE_DOCTOR":
            navigate("/doctor-dashboard");
            break;

          case "ROLE_ADMIN":
            navigate("/admin");
            break;

          default:
            navigate("/login");
        }
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      console.log("Authentication failed " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex  justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-center text-2xl font-bold mb-8">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="Enter Email"
              id="email"
              type="text"
              className="mt-1 p-4 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Enter Password"
              id="password"
              type="password"
              className="mt-1 p-4 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {formError && <p className="text-red-500">{formError}</p>}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Sign In
            </button>
          </div>
          <div className="text-red-800">{isError}</div>
        </form>
        <p className="text-center text-sm mt-4">
          Click to Register?{" "}
          <a
            href="/registration"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign Up
          </a>
        </p>
        <p className="text-center text-sm mt-2">
          <a
            href="/forgotpassword"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
